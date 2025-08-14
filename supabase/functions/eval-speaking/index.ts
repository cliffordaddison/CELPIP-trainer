import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { requireAuth } from '../_shared/auth.ts';
import { checkRateLimit } from '../_shared/rate-limit.ts';

interface SpeakingEvaluationRequest {
  audio_url?: string;
  audio_base64?: string;
  prompt?: string;
  duration_seconds?: number;
}

interface SpeakingEvaluationResponse {
  scores: {
    content: number;
    coherence: number;
    vocabulary: number;
    grammar: number;
    fluency: number;
  };
  band: number;
  feedback: {
    summary: string;
    strengths: string[];
    improvements: string[];
    drills: string[];
  };
  transcript?: string;
  words_per_minute?: number;
  error?: string;
}

async function transcribeAudio(audioData: string): Promise<string> {
  try {
    // For now, we'll use a placeholder transcription
    // In production, this would call the Whisper API or local STT service
    return "This is a placeholder transcript. In production, this would be the actual transcription from the audio.";
  } catch (error) {
    throw new Error(`Transcription failed: ${error.message}`);
  }
}

async function evaluateSpeaking(
  transcript: string, 
  prompt: string, 
  duration: number
): Promise<SpeakingEvaluationResponse> {
  try {
    const groqApiKey = Deno.env.get('GROQ_API_KEY');
    if (!groqApiKey) {
      throw new Error('GROQ_API_KEY not configured');
    }

    const systemPrompt = `You are a CELPIP General Training speaking evaluator. 
    Evaluate the following speaking response based on CELPIP criteria.
    
    Scoring Criteria (0-12 scale):
    - Content: Relevance and completeness of response to the prompt
    - Coherence: Logical organization and flow of ideas
    - Vocabulary: Range, precision, and appropriateness of word choice
    - Grammar: Accuracy of grammatical structures
    - Fluency: Speaking rate, pauses, and natural flow
    
    Return ONLY valid JSON with this exact structure:
    {
      "scores": {
        "content": 0-12,
        "coherence": 0-12,
        "vocabulary": 0-12,
        "grammar": 0-12,
        "fluency": 0-12
      },
      "band": 1-12,
      "feedback": {
        "summary": "Brief overall assessment",
        "strengths": ["strength1", "strength2"],
        "improvements": ["improvement1", "improvement2"],
        "drills": ["drill1", "drill2"]
      }
    }`;

    const userPrompt = `Prompt: ${prompt}
    
    Response: ${transcript}
    
    Duration: ${duration} seconds
    
    Please evaluate this speaking response according to CELPIP standards.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.1,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const evaluation = JSON.parse(data.choices[0].message.content);
    
    // Calculate words per minute
    const words = transcript.split(' ').length;
    const wpm = Math.round((words / duration) * 60);
    
    return {
      ...evaluation,
      transcript,
      words_per_minute: wpm
    };
  } catch (error) {
    throw new Error(`Evaluation failed: ${error.message}`);
  }
}

Deno.serve(async (request: Request) => {
  // Handle CORS
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  try {
    // Check rate limiting
    const { user, error: authError } = await requireAuth(request);
    if (authError) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: corsHeaders }
      );
    }

    const rateLimit = await checkRateLimit(request, `speaking_${user.id}`);
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          remaining: rateLimit.remaining,
          resetTime: rateLimit.resetTime
        }),
        { status: 429, headers: corsHeaders }
      );
    }

    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: corsHeaders }
      );
    }

    const body: SpeakingEvaluationRequest = await request.json();
    
    if (!body.audio_url && !body.audio_base64) {
      return new Response(
        JSON.stringify({ error: 'Audio data required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Transcribe audio
    const audioData = body.audio_base64 || body.audio_url || '';
    const transcript = await transcribeAudio(audioData);
    
    // Evaluate speaking
    const evaluation = await evaluateSpeaking(
      transcript,
      body.prompt || 'General speaking prompt',
      body.duration_seconds || 60
    );

    // Store attempt in database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Note: In a real implementation, you'd store the attempt and scores here
    
    return new Response(
      JSON.stringify(evaluation),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Speaking evaluation error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
