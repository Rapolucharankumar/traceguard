-- Drop old mock tables
DROP TABLE IF EXISTS public.risk_reports CASCADE;
DROP TABLE IF EXISTS public.ai_analysis CASCADE;
DROP TABLE IF EXISTS public.profiles_found CASCADE;
DROP TABLE IF EXISTS public.scans CASCADE;

-- 1. SCAN JOBS TABLE
CREATE TABLE public.scan_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    target_email TEXT,
    target_username TEXT,
    status TEXT DEFAULT 'scanning' CHECK (status IN ('scanning', 'completed', 'failed')),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 2. PROFILE DISCOVERIES TABLE (Realtime Enabled)
CREATE TABLE public.profile_discoveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.scan_jobs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    username TEXT,
    profile_url TEXT NOT NULL,
    status TEXT DEFAULT 'found' CHECK (status IN ('found', 'not_found', 'error')),
    severity TEXT DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high')),
    raw_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RISK SIGNALS TABLE
CREATE TABLE public.risk_signals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.scan_jobs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    category TEXT NOT NULL,
    remediation_steps JSONB,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SCAN REPORTS TABLE
CREATE TABLE public.scan_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.scan_jobs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    professional_score INTEGER CHECK (professional_score >= 0 AND professional_score <= 100),
    privacy_score INTEGER CHECK (privacy_score >= 0 AND privacy_score <= 100),
    identity_summary TEXT,
    actionable_insights JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.scan_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_discoveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scan jobs" ON public.scan_jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scan jobs" ON public.scan_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own scan jobs" ON public.scan_jobs FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own profiles" ON public.profile_discoveries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own risks" ON public.risk_signals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own reports" ON public.scan_reports FOR SELECT USING (auth.uid() = user_id);

-- REALTIME CONFIGURATION
-- Enable Replica Identity to send full row changes over websockets
ALTER TABLE public.profile_discoveries REPLICA IDENTITY FULL;
ALTER TABLE public.scan_jobs REPLICA IDENTITY FULL;

-- Add tables to the 'supabase_realtime' publication
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE public.scan_jobs, public.profile_discoveries;
COMMIT;
