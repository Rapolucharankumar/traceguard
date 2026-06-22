"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldAlert, 
  Mail, 
  Lock, 
  AlertTriangle, 
  ChevronRight, 
  UserX, 
  PhoneCall, 
  MessageSquareWarning,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-400 mb-3">
            <ShieldAlert className="mr-1 h-3 w-3" /> 2 Critical Vulnerabilities
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Privacy Risks</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            A comprehensive breakdown of your exposed personal data, oversharing patterns, and immediate remediation steps.
          </p>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2"
      >
        {/* High Risk: Email Exposure */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="bg-red-500/5 border-red-500/30 backdrop-blur-md shadow-[0_0_40px_rgba(239,68,68,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-50 transition-opacity group-hover:opacity-100" />
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">Public Email Exposure</CardTitle>
                    <CardDescription className="text-red-300/70 mt-1">Direct contact vector found in multiple locations</CardDescription>
                  </div>
                </div>
                <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30 text-sm px-3 py-1">High Risk</Badge>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-sm text-white/70 mb-4">
                Your primary email address (<span className="text-white font-medium font-mono">alex.chen@example.com</span>) is publicly visible in plain text on 3 websites. This exposes you directly to automated scraping, spear-phishing campaigns, and spam bots.
              </p>
              <div className="bg-black/40 rounded-lg border border-red-500/20 p-4">
                <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Detected Locations</h4>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-white/80">johndoe.dev/contact</span>
                    <Button variant="ghost" size="sm" className="h-6 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2">Remediate <ChevronRight className="ml-1 h-3 w-3" /></Button>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-white/80">github.com/achen99 (Public Bio)</span>
                    <Button variant="ghost" size="sm" className="h-6 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2">Remediate <ChevronRight className="ml-1 h-3 w-3" /></Button>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-white/80">medium.com/@alexchen/about</span>
                    <Button variant="ghost" size="sm" className="h-6 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2">Remediate <ChevronRight className="ml-1 h-3 w-3" /></Button>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Medium Risk: Username Reuse */}
        <motion.div variants={itemVariants}>
          <Card className="h-full bg-amber-500/5 border-amber-500/30 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <UserX className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Username Reuse</CardTitle>
                  </div>
                </div>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">Medium Risk</Badge>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 flex-1">
              <p className="text-sm text-white/70 mb-4">
                The handle <span className="font-mono text-white">@achen99</span> is used across Twitter, Reddit, and a known breached gaming forum from 2019. 
              </p>
              <p className="text-sm text-amber-400/80 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                This allows bad actors to easily cross-reference your anonymous activity with your real identity. We strongly recommend using unique handles for non-professional accounts.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Medium Risk: Oversharing Detection */}
        <motion.div variants={itemVariants}>
          <Card className="h-full bg-amber-500/5 border-amber-500/30 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader className="pb-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <MessageSquareWarning className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Oversharing Detection</CardTitle>
                  </div>
                </div>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">Medium Risk</Badge>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 flex-1">
              <p className="text-sm text-white/70 mb-4">
                AI analysis of your Twitter and Instagram feeds indicates a high frequency of real-time location tagging (124 posts) and travel plan announcements.
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-2 text-sm text-white/60">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Pattern detected: Posting airport boarding passes.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Low Risk: Public Contact Information (Phone) */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="bg-emerald-500/5 border-emerald-500/20 backdrop-blur-md relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Public Phone Directory</CardTitle>
                  </div>
                </div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">Low Risk</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mt-2 text-sm text-emerald-400/80 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <p>No public records of your primary phone number were found in accessible data brokers or major social profiles.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Recommendations Summary */}
        <motion.div variants={itemVariants} className="md:col-span-2 mt-4">
          <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            Security Recommendations Action Plan
          </h3>
          <div className="bg-background/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl">
            <div className="divide-y divide-white/5">
              {[
                { task: "Remove email from GitHub bio", impact: "High", time: "2 mins", link: "github.com/settings/profile" },
                { task: "Enable 2FA on Reddit account", impact: "High", time: "5 mins", link: "reddit.com/prefs/update/" },
                { task: "Scrub location tags from past Instagram photos", impact: "Medium", time: "15 mins", link: "instagram.com" },
                { task: "Set up a forwarding alias (e.g., SimpleLogin) for public profiles", impact: "Medium", time: "10 mins", link: "#" },
              ].map((rec, i) => (
                <div key={i} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <div>
                    <p className="font-medium text-white mb-1">{rec.task}</p>
                    <div className="flex items-center gap-3 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${rec.impact === "High" ? "bg-red-500" : "bg-amber-500"}`}></span>
                        {rec.impact} Impact
                      </span>
                      <span>•</span>
                      <span>{rec.time} effort</span>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white shrink-0">
                    Take Action <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
