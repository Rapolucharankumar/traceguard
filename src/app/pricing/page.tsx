"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, Zap, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";

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
    price: "₹199",
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
    href: "#"
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      // 1. Create order
      const response = await fetch("/api/create-order", { method: "POST" });
      const order = await response.json();

      if (response.status === 401) {
        toast.error("Please login to upgrade");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(order.error || "Failed to create order");
      }

      // 2. Configure Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "TraceGuard Pro",
        description: "1 Month Pro Plan",
        order_id: order.id,
        handler: async function (response: any) {
          toast.loading("Verifying payment...", { id: "verify" });
          
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              toast.success("Payment successful! Welcome to Pro.", { id: "verify" });
              router.push("/dashboard/billing/success");
            } else {
              throw new Error(verifyData.error || "Verification failed");
            }
          } catch (err: any) {
            toast.error(err.message || "Payment verification failed", { id: "verify" });
            router.push("/dashboard/billing/failure");
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#3b82f6", // Primary color (blue-500)
        },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        toast.error(`Payment Failed: ${response.error.description}`);
        router.push("/dashboard/billing/failure");
      });
      rzp.open();

    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
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
                      <button 
                        className={buttonVariants({ className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)]" })}
                        onClick={handleUpgrade}
                        disabled={loading}
                      >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                        {loading ? "Processing..." : tier.cta}
                      </button>
                    ) : (
                      <Link href={tier.href} className={buttonVariants({ variant: "outline", className: "w-full bg-white/5 border-white/10 hover:bg-white/10 text-white" })}>
                        {tier.cta}
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
