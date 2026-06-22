"use client";

import { motion } from "framer-motion";
import { XCircle, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentFailurePage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Payment Failed</h1>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          We couldn't process your payment. Your card may have been declined or the connection was interrupted. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard/settings" className={buttonVariants({ variant: "outline", className: "border-white/10 hover:bg-white/5 text-white" })}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Settings
          </Link>
          <Link href="/pricing" className={buttonVariants({ className: "bg-primary text-primary-foreground hover:bg-primary/90" })}>
            Try Again
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
