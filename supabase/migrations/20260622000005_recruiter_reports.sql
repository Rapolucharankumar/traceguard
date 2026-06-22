-- Create recruiter_reports table
CREATE TABLE public.recruiter_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.scan_jobs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    hiring_readiness_score INTEGER CHECK (hiring_readiness_score >= 0 AND hiring_readiness_score <= 100),
    strengths JSONB NOT NULL DEFAULT '[]',
    weaknesses JSONB NOT NULL DEFAULT '[]',
    missing_signals JSONB NOT NULL DEFAULT '[]',
    verified_skills JSONB NOT NULL DEFAULT '[]',
    weak_signals JSONB NOT NULL DEFAULT '[]',
    reputation_synthesis TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.recruiter_reports ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view own recruiter reports" ON public.recruiter_reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own recruiter reports" ON public.recruiter_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own recruiter reports" ON public.recruiter_reports FOR UPDATE USING (auth.uid() = user_id);
