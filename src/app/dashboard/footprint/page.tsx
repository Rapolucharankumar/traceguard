"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, CheckCircle2, XCircle, AlertTriangle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/utils/supabase/client";
import { 
  createScanJob, 
  completeScanJob, 
  scanGithub, 
  scanReddit, 
  checkGenericProfile 
} from "@/app/actions/discovery";

type DiscoveryStatus = "found" | "not_found" | "error";

interface Discovery {
  id: string;
  platform: string;
  username: string;
  profile_url: string;
  status: DiscoveryStatus;
  severity: "low" | "medium" | "high";
  raw_data: any;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function FootprintPage() {
  const [username, setUsername] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [discoveries, setDiscoveries] = useState<Discovery[]>([]);
  const supabase = createClient();

  useEffect(() => {
    if (!jobId) return;

    // Subscribe to real-time inserts on profile_discoveries for this specific job
    const channel = supabase
      .channel(`scan_job_${jobId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "profile_discoveries",
          filter: `job_id=eq.${jobId}`,
        },
        (payload) => {
          setDiscoveries((prev) => [...prev, payload.new as Discovery]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [jobId, supabase]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsScanning(true);
    setDiscoveries([]);
    setJobId(null);

    try {
      // 1. Create the Scan Job record in DB
      const newJobId = await createScanJob(username);
      setJobId(newJobId);

      // 2. Client-Side Orchestrated Fan-Out
      // We fire all Server Actions simultaneously without awaiting them sequentially.
      // This bypasses Vercel's 10s timeout by keeping requests isolated.
      await Promise.allSettled([
        scanGithub(newJobId, username),
        scanReddit(newJobId, username),
        checkGenericProfile(newJobId, "Medium", `https://medium.com/@${username}`, username),
        checkGenericProfile(newJobId, "Twitter", `https://twitter.com/${username}`, username),
        checkGenericProfile(newJobId, "Dev.to", `https://dev.to/${username}`, username)
      ]);

      // 3. Complete the job
      await completeScanJob(newJobId);
      
    } catch (error) {
      console.error("Scan error:", error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Footprint Discovery</h1>
        <p className="text-muted-foreground mt-1">
          Trace your username across the public internet using real OSINT endpoints.
        </p>
      </div>

      {/* Search Form */}
      <Card className="bg-background/40 backdrop-blur-md border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <CardContent className="p-6 relative z-10">
          <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                <Input 
                  placeholder="Enter username to trace (e.g., torvalds)" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-9 bg-white/5 border-white/10 h-12 text-lg text-white placeholder:text-white/30"
                  disabled={isScanning}
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isScanning || !username} 
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] text-lg transition-all"
            >
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Scanning...
                </>
              ) : (
                "Start Trace"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Live Results Stream */}
      {(jobId || discoveries.length > 0) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              Live Feed
            </h2>
            {isScanning && (
              <Badge variant="outline" className="border-primary/50 text-primary animate-pulse">
                Workers Active...
              </Badge>
            )}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {discoveries.map((discovery) => (
              <motion.div key={discovery.id} variants={itemVariants}>
                <Card className={`bg-white/5 backdrop-blur-sm border border-white/5 overflow-hidden transition-all hover:bg-white/10 ${discovery.status === 'found' && discovery.severity === 'high' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : ''}`}>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="font-bold text-lg text-white">{discovery.platform}</div>
                      {discovery.status === "found" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      {discovery.status === "not_found" && <XCircle className="h-5 w-5 text-zinc-500" />}
                      {discovery.status === "error" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/50">Username</span>
                        <span className="text-white font-medium">{discovery.username}</span>
                      </div>

                      {discovery.status === "found" ? (
                        <>
                          {discovery.severity === "high" && (
                            <Badge variant="destructive" className="mt-2 w-full justify-center">High Risk Data</Badge>
                          )}
                          <a 
                            href={discovery.profile_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-4 block text-xs text-center py-2 rounded bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
                          >
                            View Public Profile
                          </a>
                        </>
                      ) : (
                        <div className="mt-4 text-xs text-center py-2 text-white/40 italic">
                          {discovery.status === "error" ? "Connection failed" : "No profile detected"}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {isScanning && (
              <motion.div variants={itemVariants}>
                 <Card className="bg-white/5 backdrop-blur-sm border border-white/5 border-dashed flex items-center justify-center min-h-[160px]">
                    <div className="flex flex-col items-center gap-2 text-white/40">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-sm">Awaiting endpoints...</span>
                    </div>
                 </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
