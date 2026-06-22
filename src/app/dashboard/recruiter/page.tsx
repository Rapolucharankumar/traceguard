"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Star, AlertCircle, Search, FileText, CheckCircle2, TrendingUp, HelpCircle, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { generateRecruiterReport } from "@/app/actions/recruiter";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function RecruiterPage() {
  const [report, setReport] = useState<any>(null);
  const [unreportedJobs, setUnreportedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch latest recruiter report
    const { data: reportsData } = await supabase
      .from("recruiter_reports")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1);
    
    setReport(reportsData && reportsData.length > 0 ? reportsData[0] : null);

    // Fetch completed jobs that don't have a recruiter report yet
    const { data: jobsData } = await supabase
      .from("scan_jobs")
      .select("id, target_username, created_at")
      .eq("user_id", user.id)
      .eq("status", "completed");

    // Filter jobs that don't have reports
    if (jobsData) {
      const { data: allReports } = await supabase.from("recruiter_reports").select("job_id").eq("user_id", user.id);
      const reportedJobIds = allReports ? allReports.map(r => r.job_id) : [];
      const pendingJobs = jobsData.filter(job => !reportedJobIds.includes(job.id));
      setUnreportedJobs(pendingJobs);
    }

    setLoading(false);
  };

  const handleGenerate = async (jobId: string) => {
    setGenerating(jobId);
    toast.loading("Simulating Recruiter / ATS Analysis...", { id: "recruiter-gen" });
    try {
      await generateRecruiterReport(jobId);
      toast.success("Recruiter Analysis Complete!", { id: "recruiter-gen" });
      await fetchData(); 
    } catch (error: any) {
      toast.error(error.message || "Analysis failed", { id: "recruiter-gen" });
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary mb-3">
            <Search className="mr-1 h-3 w-3" /> External Perspective
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Recruiter Intelligence View</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            A simulated 5-minute dossier. Exactly what hiring managers and automated ATS systems deduce about you.
          </p>
        </div>
        <Button onClick={fetchData} variant="outline" size="icon" className="border-white/10 hover:bg-white/5 shrink-0">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {unreportedJobs.length > 0 && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  Simulate ATS Screening
                </CardTitle>
                <CardDescription>Run the recruiter simulation on your unanalyzed OSINT footprints.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {unreportedJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between bg-white/5 p-3 rounded-md border border-white/10">
                    <div>
                      <div className="font-medium">Target: {job.target_username}</div>
                      <div className="text-xs text-white/40">{new Date(job.created_at).toLocaleString()}</div>
                    </div>
                    <Button 
                      onClick={() => handleGenerate(job.id)} 
                      disabled={generating !== null}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {generating === job.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                      Run Analysis
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {!report && unreportedJobs.length === 0 && (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Search className="h-12 w-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Recruiter Data</h3>
              <p className="text-white/50 max-w-md mx-auto">
                Run a Footprint Discovery scan first to generate a digital footprint for the recruiter to analyze.
              </p>
            </div>
          )}

          {report && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-12"
            >
              {/* Top Section: Score & Reputation Summary */}
              <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-6">
                <Card className="bg-background/40 backdrop-blur-xl border-white/10 shadow-2xl relative overflow-hidden flex-1">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white">Hiring Readiness</CardTitle>
                    <CardDescription>Overall ATS match confidence</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-6">
                    <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-emerald-500/20">
                      <span className="text-5xl font-bold text-white tracking-tighter">{report.hiring_readiness_score}</span>
                      <span className="absolute bottom-6 text-xs text-emerald-500 font-medium">/ 100</span>
                      <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                        <circle 
                          cx="50" cy="50" r="44" fill="transparent" stroke="currentColor" strokeWidth="12" 
                          className={`${report.hiring_readiness_score > 70 ? 'text-emerald-500' : report.hiring_readiness_score > 40 ? 'text-amber-500' : 'text-red-500'} stroke-dasharray-100 transition-all duration-1000`} 
                          strokeDasharray="276" strokeDashoffset={276 - (276 * report.hiring_readiness_score) / 100} 
                        />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="md:col-span-8 flex flex-col gap-6">
                <Card className="bg-background/40 backdrop-blur-xl border-white/10 flex-1">
                  <CardHeader className="pb-4 border-b border-white/5">
                    <CardTitle className="text-lg flex items-center gap-2 text-white">
                      <BrainCircuit className="h-5 w-5 text-primary" />
                      Public Reputation Synthesis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {report.reputation_synthesis}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Bottom Section: Strengths & Weaknesses */}
              <motion.div variants={itemVariants} className="md:col-span-6 flex flex-col gap-6">
                <Card className="bg-emerald-500/5 backdrop-blur-md border-emerald-500/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-emerald-400">
                      <Star className="h-5 w-5" /> Detected Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {(report.strengths || []).map((strength: any, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-white">{strength.title}</h4>
                            <p className="text-xs text-white/50 mt-1">{strength.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-background/40 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-500" />
                      Verified ATS Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(report.verified_skills || []).map((skill: string) => (
                        <Badge key={skill} variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                          <CheckCircle2 className="mr-1 h-3 w-3" /> {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="md:col-span-6 flex flex-col gap-6">
                {report.weaknesses && report.weaknesses.length > 0 && (
                  <Card className="bg-red-500/5 backdrop-blur-md border-red-500/20">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-red-400">
                        <AlertCircle className="h-5 w-5" /> Red Flags & Weaknesses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {(report.weaknesses || []).map((weakness: any, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium text-white">{weakness.title}</h4>
                              <p className="text-xs text-white/50 mt-1">{weakness.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <Card className="bg-amber-500/5 backdrop-blur-md border-amber-500/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-amber-400">
                      <HelpCircle className="h-5 w-5" /> Missing Signals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {(report.missing_signals || []).map((missing: any, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <HelpCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-white">{missing.title}</h4>
                            <p className="text-xs text-white/50 mt-1">{missing.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-background/40 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-4 w-4 text-amber-500" />
                      Weak Keyword Signals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(report.weak_signals || []).map((skill: string) => (
                        <Badge key={skill} variant="outline" className="border-white/10 text-white/50">
                          <HelpCircle className="mr-1 h-3 w-3" /> {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
