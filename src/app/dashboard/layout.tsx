"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScanSearch, ShieldAlert, Users, FileText, Settings, User, Bell, Search, Menu, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
    { name: "Footprint Scan", href: "/dashboard/footprint", icon: ScanSearch },
    { name: "AI Analysis", href: "/dashboard/analysis", icon: BrainCircuit },
    { name: "Recruiter View", href: "/dashboard/recruiter", icon: Users },
    { name: "Privacy Risks", href: "/dashboard/privacy", icon: ShieldAlert },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#050505] text-foreground font-sans overflow-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-[100%] blur-[120px]" />
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-white/5 bg-black/40 backdrop-blur-2xl sm:flex shadow-2xl"
        >
          <div className="flex h-16 items-center px-6 border-b border-white/5">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <ShieldAlert className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold text-lg tracking-tight text-white">TraceGuard</span>
            </Link>
          </div>
          
          <nav className="flex flex-col gap-1.5 px-3 py-6">
            <div className="px-3 text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">Main Menu</div>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive ? "text-white bg-white/10" : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <link.icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-white/40 group-hover:text-white/70"}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto p-4 border-t border-white/5">
            <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
              <Settings className="h-4 w-4 text-white/40" />
              Settings
            </Link>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <div className="flex flex-col sm:pl-64 w-full h-screen overflow-hidden">
          {/* Top Navbar */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/5 bg-black/40 px-4 sm:px-8 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20"
          >
            <div className="flex items-center gap-4 sm:hidden">
              <button className="text-white/70 hover:text-white">
                <Menu className="h-5 w-5" />
              </button>
              <ShieldAlert className="h-5 w-5 text-primary" />
            </div>

            {/* Search Bar */}
            <div className="hidden sm:flex flex-1 max-w-md items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search reports, profiles, or risks..." 
                className="w-full h-9 rounded-full bg-white/5 border border-white/10 pl-9 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
              />
              <div className="absolute right-3 text-[10px] font-medium text-white/30 border border-white/10 rounded px-1.5 py-0.5 bg-white/5">
                ⌘K
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-auto sm:ml-0">
              <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
              </button>
              
              <div className="h-6 w-[1px] bg-white/10 mx-1 hidden sm:block"></div>
              
              <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-medium leading-none text-white">Alex Chen</span>
                  <span className="text-xs text-white/40 mt-1">Pro Plan</span>
                </div>
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-primary/50 text-white border border-white/20 shadow-lg shadow-primary/20">
                  <User className="h-4 w-4" />
                </div>
              </button>
            </div>
          </motion.header>

          {/* Page Content with AnimatePresence for route transitions */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="mx-auto max-w-6xl"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
