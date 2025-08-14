import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { requireAuth } from '../_shared/auth.ts';
import { checkRateLimit } from '../_shared/rate-limit.ts';

interface WritingEvaluationRequest {
  text: string;
  task_type: 'email' | 'survey_response';
  prompt: string;
  word_count: number;
  time_taken_seconds?: number;
}

interface WritingEvaluationResponse {
  scores: {
    task_fulfillment: number;
    organization: number;
    vocabulary: number;
    grammar: number;
    mechanics: number;
  };
  band: number;
  feedback: {
    summary: string;
    strengths: string[];
    improvements: string[];
    suggestions: Array<{
      start: number;
      end: number;
      replacement: string;
      reason: string;
    }>;
  };
  word_count: number;
  error?: string;
}

async function evaluateWriting(
  text: string,
  taskType: string,
  prompt: string,
  wordCount: number
): Promise<WritingEvaluationResponse> {
  try {
    const groqApiKey = Deno.env.get('GROQ_API_KEY');
    if (!groqApiKey) {
      throw new Error('GROQ_API_KEY not configured');
    }

    const systemPrompt = `You are a CELPIP General Training writing evaluator.
    Evaluate the following writing response based on CELPIP criteria.
    
    Scoring Criteria (0-12 scale):
    - Task Fulfillment: How well the response addresses the prompt requirements
    - Organization: Logical structure, paragraphing, and coherence
    - Vocabulary: Range, precision, and appropriateness of word choice
    - Grammar: Accuracy of grammatical structures and sentence variety
    - Mechanics: Spelling, punctuation, and formatting
    
    Return ONLY valid JSON with this exact structure:
    {
      "scores": {
        "task_fulfillment": 0-12,
        "organization": 0-12,
        "vocabulary": 0-12,
        "grammar": 0-12,
        "mechanics": 0-12
      },
      "band": 1-12,
      "feedback": {
        "summary": "Brief overall assessment",
        "strengths": ["strength1", "strength2"],
        "improvements": ["improvement1", "improvement2"],
        "suggestions": [
          {
            "start": 0,
            "end": 10,
            "replacement": "suggested text",
            "reason": "explanation"
          }
        ]
      }
    }`;

    const userPrompt = `Task Type: ${taskType}
    Prompt: ${prompt}
    
    Response: ${text}
    
    Word Count: ${wordCount}
    
    Please evaluate this writing response according to CELPIP standards.
    For suggestions, provide specific text replacements with character positions.`;

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
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const evaluation = JSON.parse(data.choices[0].message.content);
    
    return {
      ...evaluation,
      word_count: wordCount
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

    const rateLimit = await checkRateLimit(request, `writing_${user.id}`);
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

    const body: WritingEvaluationRequest = await request.json();
    
    if (!body.text || !body.task_type || !body.prompt) {
      return new Response(
        JSON.stringify({ error: 'Text, task type, and prompt required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Evaluate writing
    const evaluation = await evaluateWriting(
      body.text,
      body.task_type,
      body.prompt,
      body.word_count
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
    console.error('Writing evaluation error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
