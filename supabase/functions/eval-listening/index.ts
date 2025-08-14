import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { requireAuth } from '../_shared/auth.ts';
import { checkRateLimit } from '../_shared/rate-limit.ts';

interface ListeningEvaluationRequest {
  attempt_id: string;
  answers: Array<{
    question_id: string;
    answer: string | string[];
  }>;
}

interface ListeningEvaluationResponse {
  score: number;
  band: number;
  feedback: {
    summary: string;
    correct_answers: number;
    total_questions: number;
    explanations: Array<{
      question_id: string;
      correct: boolean;
      explanation: string;
      correct_answer: string | string[];
    }>;
  };
  error?: string;
}

async function evaluateListening(
  attemptId: string,
  answers: Array<{ question_id: string; answer: string | string[] }>
): Promise<ListeningEvaluationResponse> {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // In a real implementation, you'd fetch the questions and correct answers from the database
    // For now, we'll use a placeholder evaluation
    
    const totalQuestions = answers.length;
    let correctAnswers = 0;
    const explanations = answers.map((answer, index) => {
      // Placeholder logic - in reality, you'd compare with stored correct answers
      const isCorrect = Math.random() > 0.5; // Random for demo
      if (isCorrect) correctAnswers++;
      
      return {
        question_id: answer.question_id,
        correct: isCorrect,
        explanation: isCorrect 
          ? "Excellent listening comprehension! You caught the key details." 
          : "Listen carefully for specific information and context clues.",
        correct_answer: isCorrect ? answer.answer : "Review the audio for the correct answer."
      };
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 12);
    const band = Math.max(1, Math.min(12, Math.ceil(score)));
    
    let summary = "";
    if (score >= 10) {
      summary = "Outstanding listening skills! You demonstrate excellent auditory comprehension.";
    } else if (score >= 7) {
      summary = "Good listening abilities with room for improvement in detail recognition.";
    } else if (score >= 4) {
      summary = "Basic listening skills shown. Practice active listening techniques.";
    } else {
      summary = "More practice needed. Focus on listening strategies and note-taking.";
    }
    
    return {
      score,
      band,
      feedback: {
        summary,
        correct_answers: correctAnswers,
        total_questions: totalQuestions,
        explanations
      }
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

    const rateLimit = await checkRateLimit(request, `listening_${user.id}`);
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

    const body: ListeningEvaluationRequest = await request.json();
    
    if (!body.attempt_id || !body.answers || body.answers.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Attempt ID and answers required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Evaluate listening
    const evaluation = await evaluateListening(body.attempt_id, body.answers);

    // Store results in database
    // Note: In a real implementation, you'd store the scores and feedback here
    
    return new Response(
      JSON.stringify(evaluation),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Listening evaluation error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
