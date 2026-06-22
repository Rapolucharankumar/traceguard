"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, Bell, User, Key, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Profile updated successfully");
      setLoading(false);
    }, 1000);
  };

  const handleManageBilling = () => {
    // In a real Razorpay subscriptions implementation, this would open a customer portal.
    // Since we are using Orders for 1-month passes, we direct them to pricing.
    toast.info("Manage Billing", {
      description: "You will be redirected to the pricing page to renew or upgrade your plan."
    });
    setTimeout(() => {
      window.location.href = "/pricing";
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings, billing preferences, and notifications.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Billing & Subscription */}
        <Card className="bg-background/40 backdrop-blur-md border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <CardTitle className="text-white">Subscription Plan</CardTitle>
            </div>
            <CardDescription>Manage your current plan and billing cycle.</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-white text-lg">TraceGuard Free</span>
                  <Badge variant="secondary" className="bg-white/10 text-white/70">Current Plan</Badge>
                </div>
                <p className="text-sm text-white/50">Your free trial is active. Upgrade to unlock AI deep analysis.</p>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" className={buttonVariants({ variant: "outline", className: "bg-transparent border-white/10 hover:bg-white/5 text-white" })} onClick={handleManageBilling}>
                  Manage Billing <ExternalLink className="ml-2 h-3 w-3" />
                </button>
                <Link href="/pricing" className={buttonVariants({ className: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.2)]" })}>
                  Upgrade to Pro
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card className="bg-background/40 backdrop-blur-md border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-white/70" />
              <CardTitle className="text-white">Profile Information</CardTitle>
            </div>
            <CardDescription>Update your personal details associated with your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white/80">Full Name</Label>
                  <Input id="fullName" defaultValue="Alex Chen" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">Email Address</Label>
                  <Input id="email" type="email" defaultValue="alex@example.com" disabled className="bg-white/5 border-white/10 text-white/50 cursor-not-allowed" />
                  <p className="text-xs text-white/40">Email cannot be changed directly.</p>
                </div>
              </div>
              <button type="submit" disabled={loading} className={buttonVariants({ className: "bg-white/10 hover:bg-white/20 text-white" })}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-background/40 backdrop-blur-md border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-white/70" />
              <CardTitle className="text-white">Notification Preferences</CardTitle>
            </div>
            <CardDescription>Control how TraceGuard alerts you about new risks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors">
              <div>
                <p className="font-medium text-sm text-white">Critical Risk Alerts</p>
                <p className="text-xs text-white/50">Immediate emails when high-severity privacy leaks are found.</p>
              </div>
              <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors">
              <div>
                <p className="font-medium text-sm text-white">Monthly AI Digest</p>
                <p className="text-xs text-white/50">A comprehensive summary of your evolving footprint score.</p>
              </div>
              <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors opacity-50">
              <div>
                <p className="font-medium text-sm text-white">Real-time Webhook Push (Pro)</p>
                <p className="text-xs text-white/50">Send payloads to Zapier/Discord when scans complete.</p>
              </div>
              <Badge variant="outline" className="border-white/10 text-white/30">Upgrade Required</Badge>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
