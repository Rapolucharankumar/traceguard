"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, Star, AlertCircle, UserCheck, Search, FileText, CheckCircle2, TrendingUp, HelpCircle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function RecruiterPage() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary mb-3">
            <Search className="mr-1 h-3 w-3" /> External Perspective
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Recruiter Intelligence View</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            A simulated 5-minute dossier. This is exactly what hiring managers and automated ATS systems deduce about you before an interview.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-1">Target Role</p>
            <p className="text-sm font-medium">Senior Frontend Engineer</p>
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-12"
      >
        {/* Top Section: Score & Reputation Summary */}
        <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-6">
          {/* Hiring Readiness Score */}
          <Card className="bg-background/40 backdrop-blur-xl border-white/10 shadow-2xl relative overflow-hidden flex-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Hiring Readiness</CardTitle>
              <CardDescription>Overall ATS match confidence</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-emerald-500/20">
                <span className="text-5xl font-bold text-white tracking-tighter">88</span>
                <span className="absolute bottom-6 text-xs text-emerald-500 font-medium">/ 100</span>
                <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-emerald-500 stroke-dasharray-100 stroke-dashoffset-[12]" strokeDasharray="276" strokeDashoffset="33" />
                </svg>
              </div>
              <div className="mt-6 w-full text-center">
                <p className="text-sm text-white/70 font-medium">Top 12% among peer group</p>
                <div className="flex items-center justify-center gap-2 mt-2 text-xs text-white/40">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  +4 pts since last profile update
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-8 flex flex-col gap-6">
          {/* Public Reputation */}
          <Card className="bg-background/40 backdrop-blur-xl border-white/10 flex-1">
            <CardHeader className="pb-4 border-b border-white/5">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <BrainCircuit className="h-5 w-5 text-primary" />
                Public Reputation Synthesis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Candidate presents a highly professional, technically focused online persona. Cross-referencing GitHub activity with LinkedIn endorsements suggests strong practical experience in modern web architecture. There are no controversial public social media posts. The candidate is perceived as a "doer" with a slight gap in visible leadership signals.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Tech Stack Match</span>
                    <span className="text-sm font-bold text-emerald-400">92%</span>
                  </div>
                  <Progress value={92} className="h-1.5 bg-white/10 [&>div]:bg-emerald-500" />
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Leadership Signals</span>
                    <span className="text-sm font-bold text-amber-400">45%</span>
                  </div>
                  <Progress value={45} className="h-1.5 bg-white/10 [&>div]:bg-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Section: Strengths & Missing Info */}
        <motion.div variants={itemVariants} className="md:col-span-6 flex flex-col">
          <Card className="bg-emerald-500/5 backdrop-blur-md border-emerald-500/20 flex-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <Star className="h-5 w-5" /> Detected Strengths
              </CardTitle>
              <CardDescription className="text-emerald-500/70">What makes you stand out immediately</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Consistent Open Source Contributions</h4>
                    <p className="text-xs text-white/50 mt-1">Over 400 contributions on GitHub in the last year, demonstrating sustained engagement and passion for coding outside of regular hours.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Clear Progression Timeline</h4>
                    <p className="text-xs text-white/50 mt-1">LinkedIn profile shows a logical, uninterrupted career progression from Junior to Mid-level, staying at companies for an average of 2.5 years.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Keyword Density Match</h4>
                    <p className="text-xs text-white/50 mt-1">Your profile naturally contains high-value keywords (React, Typescript, System Design) in context, which ranks highly in ATS filters.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="md:col-span-6 flex flex-col">
          <Card className="bg-amber-500/5 backdrop-blur-md border-amber-500/20 flex-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-amber-400">
                <AlertCircle className="h-5 w-5" /> Missing Information
              </CardTitle>
              <CardDescription className="text-amber-500/70">Red flags or gaps a recruiter will notice</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Lack of Measurable Impact</h4>
                    <p className="text-xs text-white/50 mt-1">Current job descriptions list responsibilities but lack metrics. (e.g., "Maintained React app" instead of "Improved load times by 40%").</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">No Visible Mentorship/Community Involvement</h4>
                    <p className="text-xs text-white/50 mt-1">For a Senior role, recruiters look for signs of mentoring. There are no blog posts, talks, or StackOverflow answers indicating knowledge sharing.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Incomplete Skills Endorsements</h4>
                    <p className="text-xs text-white/50 mt-1">While you list AWS, you have zero endorsements for it, making it a "weak signal" compared to your highly-endorsed frontend skills.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-4 border-t border-amber-500/10">
              <p className="text-xs text-amber-400/80 font-medium">
                Fixing these issues could boost your ATS match score by ~8 points.
              </p>
            </CardFooter>
          </Card>
        </motion.div>

        {/* ATS Keyword Parsing Simulation */}
        <motion.div variants={itemVariants} className="md:col-span-12">
          <Card className="bg-background/40 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Raw ATS Keyword Extraction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {/* Verified */}
                {["React", "TypeScript", "Next.js", "Node.js", "Frontend Architecture", "Tailwind CSS", "Git"].map(skill => (
                  <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors py-1">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> {skill}
                  </Badge>
                ))}
                
                {/* Weak Signal */}
                {["AWS", "Docker", "CI/CD", "GraphQL"].map(skill => (
                  <Badge key={skill} variant="outline" className="border-white/10 text-white/50 py-1">
                    <HelpCircle className="mr-1 h-3 w-3" /> {skill} (Weak Signal)
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  );
}
