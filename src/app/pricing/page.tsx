"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";

const tiers = [
  {
    name: "Basic",
    price: "Free",
    description: "Essential footprint scanning for individuals.",
    features: [
      "1 Manual Scan per month",
      "Basic Privacy Score",
      "Public Search Engine Indexing",
      "Email Exposure Check"
    ],
    cta: "Get Started",
    popular: false,
    href: "/login"
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    description: "Continuous monitoring and deep AI insights.",
    features: [
      "Unlimited Automated Scans",
      "AI Professional Presence Analysis",
      "Dark Web Credential Monitoring",
      "ATS Keyword Parsing Simulation",
      "Custom Remediation Plans",
      "Priority Email Support"
    ],
    cta: "Upgrade to Pro",
    popular: true,
    href: "#" // Hooked to stripe checkout in real app
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For executives and high-profile individuals.",
    features: [
      "Everything in Pro",
      "Dedicated OSINT Analyst",
      "Automated Takedown Requests",
      "Family Member Protection",
      "24/7 Phone Support",
      "Custom API Access"
    ],
    cta: "Contact Sales",
    popular: false,
    href: "mailto:sales@traceguard.com"
  }
];

export default function PricingPage() {
  const handleUpgrade = () => {
    // In a real app, this would call /api/stripe/checkout
    toast.info("Connecting to Stripe...", {
      description: "This is a mockup. Stripe integration requires live keys."
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-foreground pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-white/50">
              Choose the level of protection that fits your digital life. No hidden fees. Cancel anytime.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className={`h-full bg-white/5 backdrop-blur-xl border-white/10 flex flex-col relative overflow-hidden ${tier.popular ? 'border-primary shadow-[0_0_30px_rgba(var(--primary),0.15)] scale-105 z-10' : ''}`}>
                {tier.popular && (
                  <>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
                    <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 text-center">
                      Most Popular
                    </div>
                  </>
                )}
                
                <CardHeader>
                  <CardTitle className="text-xl text-white">{tier.name}</CardTitle>
                  <p className="text-sm text-white/50 h-10 mt-2">{tier.description}</p>
                  <div className="mt-4 flex items-baseline text-4xl font-extrabold text-white">
                    {tier.price}
                    {tier.period && <span className="ml-1 text-xl font-medium text-white/40">{tier.period}</span>}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 mt-6">
                  <ul className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle2 className={`h-5 w-5 mr-3 shrink-0 ${tier.popular ? 'text-primary' : 'text-white/40'}`} />
                        <span className="text-sm text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  {tier.popular ? (
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)]" onClick={handleUpgrade}>
                      <Zap className="mr-2 h-4 w-4" />
                      {tier.cta}
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white" asChild>
                      <Link href={tier.href}>{tier.cta}</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
