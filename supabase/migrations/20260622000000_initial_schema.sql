-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
-- Extends Supabase auth.users with application-specific data
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'pro', 'enterprise')),
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SCANS TABLE
-- Represents a single footprint discovery job initiated by a user
CREATE TABLE public.scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    target_email TEXT NOT NULL,
    target_username TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scanning', 'completed', 'failed')),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 3. PROFILES FOUND TABLE
-- Individual social or web profiles discovered during a scan
CREATE TABLE public.profiles_found (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scan_id UUID REFERENCES public.scans(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    platform TEXT NOT NULL, -- e.g., 'LinkedIn', 'GitHub'
    username TEXT NOT NULL,
    profile_url TEXT NOT NULL,
    visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'anonymous')),
    discovered_data JSONB, -- Stores the raw metadata found (e.g., bio, location)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. RISK REPORTS TABLE
-- Security and privacy vulnerabilities flagged for a user
CREATE TABLE public.risk_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    scan_id UUID REFERENCES public.scans(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    severity TEXT CHECK (severity IN ('Low', 'Medium', 'High')),
    category TEXT NOT NULL, -- e.g., 'Email Exposure', 'Location Tracking'
    remediation_steps JSONB,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- 5. AI ANALYSIS TABLE
-- The synthesized intelligence and scores generated from the raw data
CREATE TABLE public.ai_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    scan_id UUID REFERENCES public.scans(id) ON DELETE CASCADE,
    professional_score INTEGER CHECK (professional_score >= 0 AND professional_score <= 100),
    privacy_score INTEGER CHECK (privacy_score >= 0 AND privacy_score <= 100),
    hiring_readiness_score INTEGER CHECK (hiring_readiness_score >= 0 AND hiring_readiness_score <= 100),
    identity_summary TEXT, -- The paragraph summary
    actionable_insights JSONB, -- Array of recommendations
    ats_keyword_extraction JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. MONITORING ALERTS TABLE
-- Continuous monitoring notifications for the user
CREATE TABLE public.monitoring_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    alert_type TEXT NOT NULL, -- e.g., 'new_profile_found', 'data_breach'
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles_found ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monitoring_alerts ENABLE ROW LEVEL SECURITY;

-- Example RLS: Users can only see their own data
CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can view own scans" ON public.scans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own profiles" ON public.profiles_found FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own risk reports" ON public.risk_reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own AI analysis" ON public.ai_analysis FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own alerts" ON public.monitoring_alerts FOR SELECT USING (auth.uid() = user_id);
