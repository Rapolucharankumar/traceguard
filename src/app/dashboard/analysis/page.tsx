"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, TrendingUp, ShieldAlert, BrainCircuit, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { generateAiReport } from "@/app/actions/analysis";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function AnalysisPage() {
  const [reports, setReports] = useState<any[]>([]);
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

    // Fetch reports
    const { data: reportsData } = await supabase
      .from("scan_reports")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });
    
    setReports(reportsData || []);

    // Fetch completed jobs that don't have a report yet
    const { data: jobsData } = await supabase
      .from("scan_jobs")
      .select("id, target_username, created_at")
      .eq("user_id", user.id)
      .eq("status", "completed")
      .not("id", "in", `(${(reportsData || []).map(r => r.job_id).join(',') || '00000000-0000-0000-0000-000000000000'})`)
      .order("created_at", { ascending: false });

    setUnreportedJobs(jobsData || []);
    setLoading(false);
  };

  const handleGenerate = async (jobId: string) => {
    setGenerating(jobId);
    toast.loading("Google Gemini is analyzing footprints...", { id: "ai-gen" });
    try {
      await generateAiReport(jobId);
      toast.success("AI Analysis Complete!", { id: "ai-gen" });
      await fetchData(); // refresh data
    } catch (error: any) {
      toast.error(error.message || "Analysis failed", { id: "ai-gen" });
    } finally {
      setGenerating(null);
    }
  };

  // Format data for Recharts
  const chartData = reports.map((r, i) => ({
    name: `Scan ${i + 1}`,
    professional: r.professional_score,
    privacy: r.privacy_score,
    readiness: r.recruiter_readiness_score
  }));

  const latestReport = reports.length > 0 ? reports[reports.length - 1] : null;

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            AI Intelligence Engine
          </h1>
          <p className="text-muted-foreground mt-1">
            Historical progression and deep analysis powered by Google Gemini.
          </p>
        </div>
        <Button onClick={fetchData} variant="outline" size="icon" className="border-white/10 hover:bg-white/5">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Unreported Jobs Queue */}
          {unreportedJobs.length > 0 && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Ready for Analysis
                </CardTitle>
                <CardDescription>You have footprint scans that haven't been analyzed by AI yet.</CardDescription>
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
                      {generating === job.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                      Generate Insights
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Historical Trends Chart */}
          {reports.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                      Historical Score Progression
                    </CardTitle>
                    <CardDescription>How your digital identity has evolved over time.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#050505', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Line type="monotone" name="Professional" dataKey="professional" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} />
                        <Line type="monotone" name="Privacy Exposure" dataKey="privacy" stroke="#ef4444" strokeWidth={3} />
                        <Line type="monotone" name="Recruiter Ready" dataKey="readiness" stroke="#10b981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Latest Report Details */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl">Latest AI Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-white/80 leading-relaxed">
                      {latestReport?.identity_summary}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-6">
                      <div className="text-center p-2 rounded bg-white/5 border border-white/5">
                        <div className="text-2xl font-bold text-blue-400">{latestReport?.professional_score}</div>
                        <div className="text-[10px] text-white/50 uppercase mt-1">Prof</div>
                      </div>
                      <div className="text-center p-2 rounded bg-white/5 border border-white/5">
                        <div className="text-2xl font-bold text-red-400">{latestReport?.privacy_score}</div>
                        <div className="text-[10px] text-white/50 uppercase mt-1">Exp</div>
                      </div>
                      <div className="text-center p-2 rounded bg-white/5 border border-white/5">
                        <div className="text-2xl font-bold text-green-400">{latestReport?.recruiter_readiness_score}</div>
                        <div className="text-[10px] text-white/50 uppercase mt-1">Ready</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ShieldAlert className="h-4 w-4 text-yellow-500" />
                      Security Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {(latestReport?.actionable_insights || []).map((rec: string, i: number) => (
                        <li key={i} className="text-sm text-white/70 flex gap-3 items-start">
                          <span className="text-yellow-500 font-bold">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {reports.length === 0 && unreportedJobs.length === 0 && (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <BrainCircuit className="h-12 w-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Analysis Data</h3>
              <p className="text-white/50 max-w-md mx-auto">
                Run a Footprint Discovery scan first. Once the scan completes, you can generate an AI intelligence report here.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
