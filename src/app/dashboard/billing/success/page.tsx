"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Welcome to TraceGuard Pro. Your account has been upgraded and you now have access to unlimited scans and advanced analytics.
        </p>
        <Link href="/dashboard/overview" className={buttonVariants({ className: "bg-primary text-primary-foreground hover:bg-primary/90" })}>
          Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
