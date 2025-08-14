-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocab_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocab_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speaking_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sim_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_prompts ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Profiles table policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile" ON public.profiles
    FOR DELETE USING (auth.uid() = user_id);

-- Study plans table policies
CREATE POLICY "Users can view own study plans" ON public.study_plans
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own study plans" ON public.study_plans
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study plans" ON public.study_plans
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own study plans" ON public.study_plans
    FOR DELETE USING (auth.uid() = user_id);

-- Vocabulary items table policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view vocab items" ON public.vocab_items
    FOR SELECT USING (auth.role() = 'authenticated');

-- Vocabulary reviews table policies
CREATE POLICY "Users can view own vocab reviews" ON public.vocab_reviews
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vocab reviews" ON public.vocab_reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vocab reviews" ON public.vocab_reviews
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vocab reviews" ON public.vocab_reviews
    FOR DELETE USING (auth.uid() = user_id);

-- Passages table policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view passages" ON public.passages
    FOR SELECT USING (auth.role() = 'authenticated');

-- Questions table policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view questions" ON public.questions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Attempts table policies
CREATE POLICY "Users can view own attempts" ON public.attempts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts" ON public.attempts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own attempts" ON public.attempts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own attempts" ON public.attempts
    FOR DELETE USING (auth.uid() = user_id);

-- Scores table policies
CREATE POLICY "Users can view own scores" ON public.scores
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.attempts 
            WHERE attempts.id = scores.attempt_id 
            AND attempts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own scores" ON public.scores
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.attempts 
            WHERE attempts.id = scores.attempt_id 
            AND attempts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own scores" ON public.scores
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.attempts 
            WHERE attempts.id = scores.attempt_id 
            AND attempts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own scores" ON public.scores
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.attempts 
            WHERE attempts.id = scores.attempt_id 
            AND attempts.user_id = auth.uid()
        )
    );

-- Speaking submissions table policies
CREATE POLICY "Users can view own speaking submissions" ON public.speaking_submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.attempts 
            WHERE attempts.id = speaking_submissions.attempt_id 
            AND attempts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own speaking submissions" ON public.speaking_submissions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.attempts 
            WHERE attempts.id = speaking_submissions.attempt_id 
            AND attempts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own speaking submissions" ON public.speaking_submissions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.attempts 
            WHERE attempts.id = speaking_submissions.attempt_id 
            AND attempts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own speaking submissions" ON public.speaking_submissions
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.attempts 
            WHERE attempts.id = speaking_submissions.attempt_id 
            AND attempts.user_id = auth.uid()
        )
    );

-- Writing submissions table policies
CREATE POLICY "Users can view own writing submissions" ON public.writing_submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.attempts 
            WHERE attempts.id = writing_submissions.attempt_id 
            AND attempts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own writing submissions" ON public.writing_submissions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.attempts 
            WHERE attempts.id = writing_submissions.attempt_id 
            AND attempts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own writing submissions" ON public.writing_submissions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.attempts 
            WHERE attempts.id = writing_submissions.attempt_id 
            AND attempts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own writing submissions" ON public.writing_submissions
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.attempts 
            WHERE attempts.id = writing_submissions.attempt_id 
            AND attempts.user_id = auth.uid()
        )
    );

-- Simulator runs table policies
CREATE POLICY "Users can view own simulator runs" ON public.sim_runs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own simulator runs" ON public.sim_runs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own simulator runs" ON public.sim_runs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own simulator runs" ON public.sim_runs
    FOR DELETE USING (auth.uid() = user_id);

-- Badges table policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view badges" ON public.badges
    FOR SELECT USING (auth.role() = 'authenticated');

-- User badges table policies
CREATE POLICY "Users can view own badges" ON public.user_badges
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges" ON public.user_badges
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own badges" ON public.user_badges
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own badges" ON public.user_badges
    FOR DELETE USING (auth.uid() = user_id);

-- System prompts table policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view system prompts" ON public.system_prompts
    FOR SELECT USING (auth.role() = 'authenticated');

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, name, email)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
