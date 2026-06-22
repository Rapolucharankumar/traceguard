"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Share2, 
  Printer, 
  CheckCircle2, 
  ShieldAlert, 
  Activity,
  Target,
  BrainCircuit
} from "lucide-react";
import { useState } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    setIsGenerating(true);
    // Simulate generation delay before triggering browser print
    setTimeout(() => {
      window.print();
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      
      {/* Hide this header when printing */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Reports</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            Generate and export comprehensive digital footprint dossiers for personal review or employer transparency.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-white/5 border-white/10 hover:bg-white/10" onClick={handleDownload}>
            <Printer className="h-4 w-4" />
            Print Format
          </Button>
          <Button 
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" 
            onClick={handleDownload}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                Generating PDF...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </span>
            )}
          </Button>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 lg:grid-cols-12 print:block print:w-full"
      >
        {/* Left Column: Report Configuration (Hidden on Print) */}
        <motion.div variants={itemVariants} className="lg:col-span-3 space-y-6 print:hidden">
          <Card className="bg-background/40 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Report Configuration</CardTitle>
              <CardDescription>Select sections to include</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Executive Summary</span>
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Privacy Risks</span>
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Professional Presence</span>
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Actionable Recommendations</span>
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-center justify-between text-white/40">
                <span className="text-sm font-medium">Raw Threat Data</span>
                <div className="h-4 w-4 rounded border border-white/20" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/20 backdrop-blur-md">
            <CardContent className="pt-6">
              <p className="text-xs text-primary/80 mb-4">
                The document preview on the right represents exactly what will be generated in the final PDF.
              </p>
              <Button variant="secondary" className="w-full gap-2 bg-primary/10 text-primary hover:bg-primary/20" onClick={() => alert("Report link copied to clipboard!")}>
                <Share2 className="h-4 w-4" />
                Share Secure Link
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column: Document Preview */}
        <motion.div variants={itemVariants} className="lg:col-span-9 print:col-span-12 print:m-0">
          
          {/* Document Container: Styled to look like a physical paper document */}
          <div className="bg-white text-zinc-900 rounded-xl shadow-2xl p-8 sm:p-12 min-h-[1056px] w-full max-w-4xl mx-auto print:shadow-none print:p-0 print:m-0 print:bg-transparent">
            
            {/* Document Header */}
            <header className="border-b-2 border-zinc-200 pb-6 mb-8 flex justify-between items-end">
              <div>
                <div className="flex items-center gap-2 text-zinc-900 mb-4">
                  <ShieldAlert className="h-6 w-6 text-zinc-900" />
                  <span className="font-bold text-xl tracking-tight">TraceGuard Intelligence</span>
                </div>
                <h1 className="text-3xl font-serif font-bold text-zinc-900">Comprehensive Footprint Dossier</h1>
                <p className="text-zinc-500 mt-2 font-medium">Subject: Alex Chen | Generated: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold tracking-tighter text-zinc-900">89<span className="text-xl text-zinc-400">/100</span></div>
                <p className="text-sm font-bold uppercase tracking-wider text-zinc-500 mt-1">Overall Security Score</p>
              </div>
            </header>

            <div className="space-y-10">
              {/* 1. AI Summary */}
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2 mb-4">
                  <BrainCircuit className="h-5 w-5" /> 1. Executive Summary
                </h2>
                <p className="text-zinc-700 leading-relaxed">
                  The subject presents a highly optimized professional digital footprint, strongly aligned with Senior Software Engineering roles. The overall privacy posture is robust, with no breached credentials found in major dark web indices. However, minor vulnerabilities exist regarding historical email exposure and cross-platform username reuse which could facilitate targeted social engineering.
                </p>
              </section>

              {/* 2. Professional Presence */}
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2 mb-4">
                  <Target className="h-5 w-5" /> 2. Professional Presence Analysis
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">ATS Market Match</h3>
                    <div className="text-3xl font-bold text-zinc-900">92%</div>
                    <p className="text-xs text-zinc-600 mt-2">Highly correlated with target role keywords.</p>
                  </div>
                  <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-1">Technical Influence</h3>
                    <div className="text-3xl font-bold text-zinc-900">Top 15%</div>
                    <p className="text-xs text-zinc-600 mt-2">Based on open-source contributions and articles.</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-zinc-700">
                  <span className="font-semibold text-zinc-900">Key Strengths:</span> Consistent GitHub commit history, high-density React/TypeScript keywords on LinkedIn, and verifiable progression timeline.
                </div>
              </section>

              {/* 3. Privacy Risks */}
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2 mb-4">
                  <ShieldAlert className="h-5 w-5" /> 3. Identified Privacy Risks
                </h2>
                <table className="w-full text-left text-sm text-zinc-700">
                  <thead className="bg-zinc-100 font-semibold text-zinc-900">
                    <tr>
                      <th className="p-3 rounded-tl-lg">Risk Vector</th>
                      <th className="p-3">Severity</th>
                      <th className="p-3 rounded-tr-lg">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr>
                      <td className="p-3 font-medium">Public Email Exposure</td>
                      <td className="p-3"><span className="text-red-600 font-bold">High</span></td>
                      <td className="p-3">Primary email scraped from GitHub bio and personal site.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Username Reuse</td>
                      <td className="p-3"><span className="text-amber-600 font-bold">Medium</span></td>
                      <td className="p-3">Gaming forums tied to professional handle.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Location Tracking</td>
                      <td className="p-3"><span className="text-emerald-600 font-bold">Low</span></td>
                      <td className="p-3">Minor real-time tagging on Instagram.</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 4. Recommendations */}
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-zinc-900 border-b border-zinc-200 pb-2 mb-4">
                  <Activity className="h-5 w-5" /> 4. Remediation Action Plan
                </h2>
                <ul className="list-decimal list-inside space-y-3 text-zinc-700">
                  <li className="pl-2">
                    <span className="font-semibold text-zinc-900">Remove plaintext email from GitHub:</span> Replace with a masked forwarding address to prevent spam scraping.
                  </li>
                  <li className="pl-2">
                    <span className="font-semibold text-zinc-900">Consolidate Social Footprint:</span> Deactivate the dormant 2017 Twitter account to funnel recruiter traffic to LinkedIn.
                  </li>
                  <li className="pl-2">
                    <span className="font-semibold text-zinc-900">Enhance Repository Documentation:</span> Add architectural diagrams to your top 3 public repositories to increase technical credibility.
                  </li>
                  <li className="pl-2">
                    <span className="font-semibold text-zinc-900">Scrub old resumes:</span> Request removal of the 2019 PDF resume containing your phone number from external directories.
                  </li>
                </ul>
              </section>

            </div>

            {/* Document Footer */}
            <footer className="mt-16 pt-6 border-t border-zinc-200 text-center text-xs text-zinc-400">
              Generated by TraceGuard Intelligence Engine • CONFIDENTIAL DOCUMENT • Page 1 of 1
            </footer>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
