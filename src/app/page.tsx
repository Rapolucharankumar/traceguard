"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Shield, Search, Eye, Activity, ChevronRight, Lock, Fingerprint, Zap } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-foreground selection:bg-primary/30 font-sans overflow-x-hidden">
      {/* Glow effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 rounded-[100%] blur-[120px] opacity-50" />
      </div>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-white/[0.05] bg-black/40 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
        <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4 md:px-8 mx-auto">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">TraceGuard</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-white/60">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors hidden sm:block">
              Log in
            </Link>
            <Link href="/dashboard/overview" className={cn(buttonVariants({ size: "sm" }), "h-9 px-4 rounded-full bg-white text-black hover:bg-white/90 font-medium")}>
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 pt-16">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <motion.div 
            className="container max-w-screen-xl px-4 md:px-8 mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 mb-8 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" style={{ boxShadow: "0 0 10px var(--color-primary)" }}></span>
              Introducing TraceGuard 2.0
              <ChevronRight className="ml-1 h-3 w-3 text-white/50" />
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-[1.1]"
            >
              Know What the Internet <br className="hidden md:block" /> Knows About You.
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-10 font-light"
            >
              AI-powered digital footprint intelligence. Instantly discover, analyze, and secure your public online presence like never before.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard/overview" className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 rounded-full text-base font-medium group bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)]")}>
                  Start Free Scan
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Hero Image / Dashboard Preview */}
            <motion.div 
              variants={fadeUp}
              className="mt-20 mx-auto max-w-5xl relative rounded-2xl border border-white/10 bg-black/50 backdrop-blur-2xl p-2 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Dashboard Preview" 
                className="rounded-xl opacity-60 mix-blend-screen w-full h-auto object-cover border border-white/5"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Social Proof */}
        <section className="py-12 border-y border-white/5 bg-white/[0.02]">
          <div className="container max-w-screen-xl px-4 md:px-8 mx-auto text-center">
            <p className="text-sm font-medium text-white/40 mb-8 uppercase tracking-widest">Trusted by security-conscious professionals at</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-50 grayscale">
              {/* Replace with actual logos in production */}
              <div className="text-xl font-bold font-serif">Acme Corp</div>
              <div className="text-xl font-bold tracking-tighter">GlobalTech</div>
              <div className="text-xl font-bold italic">CyberNet</div>
              <div className="text-xl font-bold tracking-widest">Quantum</div>
              <div className="text-xl font-bold">Stark Ind.</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32">
          <div className="container max-w-screen-xl px-4 md:px-8 mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mb-20 md:mb-32 max-w-3xl"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                Intelligence previously reserved <br className="hidden md:block" /> for security teams.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-white/50 leading-relaxed">
                TraceGuard gives you the same visibility that data brokers, recruiters, and hackers have. Take control of your digital narrative.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {/* Feature 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 md:p-10 transition-colors hover:bg-white/[0.04]"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Deep Footprint Scan</h3>
                <p className="text-white/50 leading-relaxed">
                  We scour the open, deep, and dark web to find forgotten accounts, public records, and leaked databases associated with your identity.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 md:p-10 transition-colors hover:bg-white/[0.04]"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">AI Reputation AI</h3>
                <p className="text-white/50 leading-relaxed">
                  Our proprietary models analyze your public data to determine how you are perceived by automated algorithms and human investigators alike.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 md:p-10 transition-colors hover:bg-white/[0.04]"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Risk Remediation</h3>
                <p className="text-white/50 leading-relaxed">
                  Not just alerts. We provide step-by-step guidance on how to secure exposed accounts, delete unwanted data, and optimize your privacy settings.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 md:p-10 transition-colors hover:bg-white/[0.04]"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white">
                  <Fingerprint className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">Continuous Monitoring</h3>
                <p className="text-white/50 leading-relaxed">
                  The internet changes daily. TraceGuard runs silently in the background, alerting you instantly if new information about you is exposed.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32 relative">
          <div className="absolute inset-0 bg-white/[0.02] border-y border-white/5" />
          <div className="container max-w-screen-xl px-4 md:px-8 mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">How TraceGuard Works</h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                From signup to complete digital control in under 3 minutes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Connect", desc: "Enter your primary email or name. We use this as a seed to begin the recursive scan." },
                { step: "02", title: "Analyze", desc: "Our engine maps your digital footprint, processing thousands of sources in real-time." },
                { step: "03", title: "Act", desc: "Review your dashboard, implement our security recommendations, and track your progress." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative"
                >
                  <div className="text-7xl font-bold text-white/[0.03] absolute -top-10 -left-4 pointer-events-none select-none">
                    {item.step}
                  </div>
                  <div className="relative z-10 border-l border-white/10 pl-6 pt-2 pb-8">
                    <h4 className="text-xl font-semibold mb-2 text-white">{item.title}</h4>
                    <p className="text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="container max-w-screen-md px-4 md:px-8 mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="h-12 w-12 text-primary mx-auto mb-8 opacity-80" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                Ready to secure your identity?
              </h2>
              <p className="text-xl text-white/50 mb-10">
                Join thousands of professionals who trust TraceGuard to manage their digital footprint.
              </p>
              <Link href="/dashboard/overview" className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 rounded-full text-base font-medium bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.15)]")}>
                Start Free Scan
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black py-12">
        <div className="container max-w-screen-xl px-4 md:px-8 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Shield className="h-5 w-5" />
            <span className="font-semibold text-sm">TraceGuard © 2026</span>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
