-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Users table (mirrors Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT,
    locale TEXT DEFAULT 'en',
    timezone TEXT DEFAULT 'UTC',
    goal_band INTEGER CHECK (goal_band >= 1 AND goal_band <= 12),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Study plans table
CREATE TABLE IF NOT EXISTS public.study_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    plan JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vocabulary items table
CREATE TABLE IF NOT EXISTS public.vocab_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lemma TEXT NOT NULL,
    pos TEXT NOT NULL, -- part of speech
    cefr TEXT CHECK (cefr IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
    topic TEXT,
    definition TEXT NOT NULL,
    examples JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vocabulary reviews table (SM-2 algorithm)
CREATE TABLE IF NOT EXISTS public.vocab_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    vocab_id UUID REFERENCES public.vocab_items(id) ON DELETE CASCADE,
    ease_factor DECIMAL(3,2) DEFAULT 2.5,
    interval INTEGER DEFAULT 0,
    repetitions INTEGER DEFAULT 0,
    due_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_result INTEGER CHECK (last_result >= 0 AND last_result <= 4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Passages table (for reading and listening)
CREATE TABLE IF NOT EXISTS public.passages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill TEXT CHECK (skill IN ('reading', 'listening')) NOT NULL,
    level INTEGER CHECK (level >= 1 AND level <= 12) NOT NULL,
    topic TEXT NOT NULL,
    source TEXT,
    content_text TEXT,
    audio_url TEXT,
    meta JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions table
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    passage_id UUID REFERENCES public.passages(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('mcq', 'short_answer', 'true_false')) NOT NULL,
    prompt TEXT NOT NULL,
    options JSONB DEFAULT '[]',
    answer_key JSONB NOT NULL,
    meta JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attempts table
CREATE TABLE IF NOT EXISTS public.attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    skill TEXT CHECK (skill IN ('speaking', 'listening', 'reading', 'writing')) NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    time_ms INTEGER,
    raw JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scores table
CREATE TABLE IF NOT EXISTS public.scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID REFERENCES public.attempts(id) ON DELETE CASCADE,
    dimension TEXT NOT NULL,
    value DECIMAL(4,2) CHECK (value >= 0 AND value <= 12),
    band INTEGER CHECK (band >= 1 AND band <= 12),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Speaking submissions table
CREATE TABLE IF NOT EXISTS public.speaking_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID REFERENCES public.attempts(id) ON DELETE CASCADE,
    audio_url TEXT,
    transcript TEXT,
    words INTEGER,
    wpm DECIMAL(5,2),
    meta JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Writing submissions table
CREATE TABLE IF NOT EXISTS public.writing_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID REFERENCES public.attempts(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    word_count INTEGER,
    meta JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Simulator runs table
CREATE TABLE IF NOT EXISTS public.sim_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    config JSONB NOT NULL DEFAULT '{}',
    result JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badges table
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User badges table
CREATE TABLE IF NOT EXISTS public.user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- System prompts table
CREATE TABLE IF NOT EXISTS public.system_prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    template TEXT NOT NULL,
    variables JSONB DEFAULT '[]',
    version INTEGER DEFAULT 1,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_study_plans_user_id ON public.study_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_vocab_reviews_user_id ON public.vocab_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_vocab_reviews_due_at ON public.vocab_reviews(due_at);
CREATE INDEX IF NOT EXISTS idx_vocab_reviews_vocab_id ON public.vocab_reviews(vocab_id);
CREATE INDEX IF NOT EXISTS idx_passages_skill_level ON public.passages(skill, level);
CREATE INDEX IF NOT EXISTS idx_questions_passage_id ON public.questions(passage_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_id ON public.attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_skill ON public.attempts(skill);
CREATE INDEX IF NOT EXISTS idx_attempts_created_at ON public.attempts(created_at);
CREATE INDEX IF NOT EXISTS idx_scores_attempt_id ON public.scores(attempt_id);
CREATE INDEX IF NOT EXISTS idx_speaking_submissions_attempt_id ON public.speaking_submissions(attempt_id);
CREATE INDEX IF NOT EXISTS idx_writing_submissions_attempt_id ON public.writing_submissions(attempt_id);
CREATE INDEX IF NOT EXISTS idx_sim_runs_user_id ON public.sim_runs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON public.user_badges(user_id);

-- GIN indexes for JSONB columns
CREATE INDEX IF NOT EXISTS idx_vocab_items_examples ON public.vocab_items USING GIN (examples);
CREATE INDEX IF NOT EXISTS idx_passages_meta ON public.passages USING GIN (meta);
CREATE INDEX IF NOT EXISTS idx_questions_options ON public.questions USING GIN (options);
CREATE INDEX IF NOT EXISTS idx_questions_answer_key ON public.questions USING GIN (answer_key);
CREATE INDEX IF NOT EXISTS idx_questions_meta ON public.questions USING GIN (meta);
CREATE INDEX IF NOT EXISTS idx_attempts_raw ON public.attempts USING GIN (raw);
CREATE INDEX IF NOT EXISTS idx_scores_feedback ON public.scores USING GIN (feedback);
CREATE INDEX IF NOT EXISTS idx_speaking_submissions_meta ON public.speaking_submissions USING GIN (meta);
CREATE INDEX IF NOT EXISTS idx_writing_submissions_meta ON public.writing_submissions USING GIN (meta);
CREATE INDEX IF NOT EXISTS idx_sim_runs_config ON public.sim_runs USING GIN (config);
CREATE INDEX IF NOT EXISTS idx_sim_runs_result ON public.sim_runs USING GIN (result);
CREATE INDEX IF NOT EXISTS idx_system_prompts_variables ON public.system_prompts USING GIN (variables);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vocab_reviews_updated_at BEFORE UPDATE ON public.vocab_reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_prompts_updated_at BEFORE UPDATE ON public.system_prompts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
