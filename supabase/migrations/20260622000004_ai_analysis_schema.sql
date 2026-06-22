-- Add recruiter_readiness_score to the existing scan_reports table
ALTER TABLE public.scan_reports 
ADD COLUMN recruiter_readiness_score INTEGER CHECK (recruiter_readiness_score >= 0 AND recruiter_readiness_score <= 100);
