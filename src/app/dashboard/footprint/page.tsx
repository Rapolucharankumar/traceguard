"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  ScanSearch, 
  RefreshCw, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  Briefcase, 
  Code, 
  Camera, 
  MessageSquare, 
  Globe,
  FileText,
  Layers,
  AlertTriangle,
  Search
} from "lucide-react";

type ScanState = "idle" | "scanning" | "results";

const MOCK_RESULTS = [
  { platform: "LinkedIn", username: "alexchen.dev", url: "linkedin.com/in/alexchen.dev", visibility: "Public", risk: "Low", status: "Monitored", icon: Briefcase, data: "Full resume, 500+ connections" },
  { platform: "GitHub", username: "achen99", url: "github.com/achen99", visibility: "Public", risk: "Low", status: "Monitored", icon: Code, data: "64 public repositories, personal email exposed in commits" },
  { platform: "Instagram", username: "alex.explores", url: "instagram.com/alex.explores", visibility: "Public", risk: "Medium", status: "Action Needed", icon: Camera, data: "Location tags enabled on 124 photos" },
  { platform: "Twitter / X", username: "achen_dev", url: "twitter.com/achen_dev", visibility: "Public", risk: "Low", status: "Monitored", icon: MessageSquare, data: "Professional focus, 2.4k followers" },
  { platform: "Reddit", username: "throwaway_ac99", url: "reddit.com/user/throwaway_ac99", visibility: "Anonymous", risk: "High", status: "Vulnerable", icon: Globe, data: "Comment history linked to secondary email" },
  { platform: "Medium", username: "@alexchen", url: "medium.com/@alexchen", visibility: "Public", risk: "Low", status: "Monitored", icon: FileText, data: "12 published articles, email in bio" },
  { platform: "Stack Overflow", username: "alex-c", url: "stackoverflow.com/users/44321/alex-c", visibility: "Public", risk: "Low", status: "Monitored", icon: Layers, data: "Top 5% in React, location visible" },
];

const SCAN_STEPS = [
  "Initializing deep web crawlers...",
  "Querying major social networks...",
  "Analyzing public developer platforms...",
  "Searching paste sites and forums...",
  "Cross-referencing leaked databases...",
  "Compiling risk exposure profile...",
  "Finalizing report..."
];

export default function FootprintPage() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (scanState === "scanning") {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 5 + 2;
        if (currentProgress > 100) currentProgress = 100;
        setProgress(currentProgress);
        
        const stepIndex = Math.min(
          Math.floor((currentProgress / 100) * SCAN_STEPS.length),
          SCAN_STEPS.length - 1
        );
        setCurrentStep(stepIndex);

        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setScanState("results"), 800);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [scanState]);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !username) return;
    setScanState("scanning");
    setProgress(0);
    setCurrentStep(0);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Footprint Scan</h1>
          <p className="text-muted-foreground mt-1">
            Discover what information about you is publicly visible online.
          </p>
        </div>
        {scanState === "results" && (
          <Button onClick={() => setScanState("idle")} variant="outline" className="gap-2 shrink-0 border-white/10 bg-white/5 hover:bg-white/10 text-white">
            <RefreshCw className="h-4 w-4" />
            New Scan
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {scanState === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-background/40 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
              <CardHeader className="relative z-10 pb-4 border-b border-white/5">
                <CardTitle className="text-xl flex items-center gap-2 text-white">
                  <Search className="h-5 w-5 text-primary" />
                  Initiate Deep Scan
                </CardTitle>
                <CardDescription className="text-white/50">
                  Provide a seed email and username to begin the recursive discovery process.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 pt-6">
                <form onSubmit={handleStartScan} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/80">Primary Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="alex.chen@example.com" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-white/80">Common Username (Optional)</Label>
                      <Input 
                        id="username" 
                        placeholder="@alexchen99" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary/50"
                      />
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto px-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                    <ScanSearch className="h-5 w-5" />
                    Start Footprint Scan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {scanState === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
              <div className="relative h-24 w-24 bg-black/50 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                <ScanSearch className="h-10 w-10 text-primary animate-[spin_3s_linear_infinite]" />
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold mb-2 text-white">Analyzing Digital Footprint</h3>
            
            <div className="w-full max-w-md mt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/60 font-mono">{SCAN_STEPS[currentStep]}</span>
                <span className="text-primary font-mono">{Math.floor(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/5 [&>div]:bg-primary" />
            </div>
          </motion.div>
        )}

        {scanState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {MOCK_RESULTS.map((result, i) => (
              <motion.div
                key={result.platform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full bg-background/40 backdrop-blur-md border-white/10 hover:border-white/20 transition-all shadow-xl hover:shadow-primary/5 flex flex-col group">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:bg-white/10 transition-colors">
                          <result.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base text-white">{result.platform}</CardTitle>
                          <CardDescription className="text-white/50 text-xs mt-0.5">{result.url}</CardDescription>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          result.risk === "High" ? "border-red-500/50 text-red-400 bg-red-500/10" :
                          result.risk === "Medium" ? "border-amber-500/50 text-amber-400 bg-amber-500/10" :
                          "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                        }
                      >
                        {result.risk} Risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-4 text-sm text-white/70 bg-white/5 rounded-lg p-3 border border-white/5">
                      <span className="font-semibold text-white/90">Discovered Data: </span>
                      {result.data}
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-1.5">
                        {result.status === "Monitored" ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : result.risk === "High" ? (
                          <ShieldAlert className="h-4 w-4 text-red-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-xs font-medium text-white/60">{result.status}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-white/50 hover:text-white">
                        <span className="text-xs">View</span>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
