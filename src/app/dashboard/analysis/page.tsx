"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, Activity, Lock, Target, TrendingUp, Sparkles, Lightbulb } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid } from "recharts";

const scoreData = [
  { month: "Jan", professional: 65, privacy: 80 },
  { month: "Feb", professional: 68, privacy: 82 },
  { month: "Mar", professional: 72, privacy: 79 },
  { month: "Apr", professional: 78, privacy: 85 },
  { month: "May", professional: 82, privacy: 88 },
  { month: "Jun", professional: 85, privacy: 90 },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AnalysisPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Deep intelligence and synthesized insights from your digital footprint.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 border border-white/10 rounded-full px-3 py-1">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span>Last analyzed 2 hours ago</span>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-3"
      >
        {/* Digital Identity Summary */}
        <motion.div variants={itemVariants} className="md:col-span-3">
          <Card className="bg-gradient-to-br from-primary/10 via-background/40 to-background/40 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BrainCircuit className="h-5 w-5 text-primary" />
                Digital Identity Synthesis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-xl text-white/80 leading-relaxed font-light italic border-l-2 border-primary/50 pl-4 py-2">
                "You appear to be a <span className="text-white font-medium">software developer</span> interested in <span className="text-white font-medium">AI and technology</span>. Your public footprint strongly signals expertise in frontend frameworks like React and Next.js, with a secondary focus on cloud architecture. Your persona is perceived as highly analytical and professionally driven."
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Professional Presence Score */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <Card className="h-full bg-background/40 backdrop-blur-md border-white/10 hover:border-white/20 transition-all flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/70">Professional Presence</CardTitle>
                <Target className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div>
                <div className="text-4xl font-bold text-white mb-2">85<span className="text-xl text-white/40">/100</span></div>
                <Progress value={85} className="h-1.5 bg-white/5 [&>div]:bg-blue-500" />
                <p className="text-xs text-white/50 mt-3">Top 12% in your industry</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">Key Contributors</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">GitHub Activity</Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">LinkedIn SEO</Badge>
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">Tech Blog</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Risk Score */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <Card className="h-full bg-background/40 backdrop-blur-md border-white/10 hover:border-white/20 transition-all flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/70">Privacy Protection</CardTitle>
                <Lock className="h-4 w-4 text-emerald-500" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div>
                <div className="text-4xl font-bold text-emerald-500 mb-2">90<span className="text-xl text-white/40">/100</span></div>
                <Progress value={90} className="h-1.5 bg-white/5 [&>div]:bg-emerald-500" />
                <p className="text-xs text-white/50 mt-3">Excellent security posture</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">Vulnerabilities</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-red-500/30 text-red-400">Old Email Exposed</Badge>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">No breached passwords</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline Chart */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <Card className="h-full bg-background/40 backdrop-blur-md border-white/10 hover:border-white/20 transition-all flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-white/70">6-Month Trajectory</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 px-4 pb-4">
              <div className="h-32 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scoreData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#ffffff50' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#ffffff50' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000000dd', borderColor: '#ffffff20', borderRadius: '8px', fontSize: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="professional" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorProf)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Actionable Insights */}
        <motion.div variants={itemVariants} className="md:col-span-3">
          <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-400" />
            AI-Generated Recommendations
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-background/40 backdrop-blur-md border-white/10 group hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white group-hover:text-primary transition-colors">Enhance GitHub Readme</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/60">
                  Your most popular repository lacks a comprehensive README. Adding architecture diagrams and setup instructions typically increases recruiter engagement by 40%.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/40 backdrop-blur-md border-white/10 group hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white group-hover:text-primary transition-colors">Consolidate Social Footprint</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/60">
                  You have an inactive Twitter/X account from 2017 that dilutes your search presence. Consider deactivating it to funnel traffic towards your optimized LinkedIn profile.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/40 backdrop-blur-md border-white/10 group hover:border-emerald-500/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white group-hover:text-emerald-400 transition-colors">Remove Old Resume PDF</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/60">
                  An old version of your resume containing your personal phone number is still indexed on a previous employer's public directory. We recommend sending a removal request.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-background/40 backdrop-blur-md border-white/10 group hover:border-blue-500/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white group-hover:text-blue-400 transition-colors">Publish Technical Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/60">
                  To achieve the next tier of Professional Presence score (90+), our models suggest publishing 1-2 articles on Medium or Dev.to focusing on Next.js optimization strategies.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
