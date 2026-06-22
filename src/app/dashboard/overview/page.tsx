import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, ScanSearch, CheckCircle2, AlertCircle, Activity, Globe, Lock, Briefcase } from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">
          Your digital footprint summary and current exposure metrics.
        </p>
      </div>

      {/* Scores Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background/50 backdrop-blur-md border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Presence Score</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78/100</div>
            <Progress value={78} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-3 flex items-center">
              <span className="text-emerald-500 flex items-center mr-1">
                +4.5% 
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-background/50 backdrop-blur-md border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Privacy Score</CardTitle>
            <Lock className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-500">A-</div>
            <Progress value={90} className="mt-3 h-2 bg-muted/30 [&>div]:bg-emerald-500" />
            <p className="text-xs text-muted-foreground mt-3">
              Low exposure risk detected
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur-md border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professional Score</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">85/100</div>
            <Progress value={85} className="mt-3 h-2 bg-muted/30 [&>div]:bg-blue-500" />
            <p className="text-xs text-muted-foreground mt-3">
              Strong LinkedIn presence
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur-md border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">2</div>
            <div className="flex gap-2 mt-3">
              <Badge variant="destructive" className="bg-destructive/20 text-destructive hover:bg-destructive/30 border-0">High Priority</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Action required on 2 items
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* AI Summary Widget */}
        <Card className="col-span-4 bg-background/50 backdrop-blur-md border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              AI Insight Summary
            </CardTitle>
            <CardDescription>
              Analysis of your recent footprint scan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Overall impression:</strong> Your professional footprint is robust and primarily centered around software engineering and tech leadership. LinkedIn and GitHub profiles are highly visible and well-maintained. 
                <br /><br />
                <strong className="text-foreground">Risk identified:</strong> An old personal blog from 2018 is still indexed and contains a plaintext email address, which correlates with an uptick in spam exposure.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Top Recommendations</h4>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Remove exposed email</p>
                  <p className="text-xs text-muted-foreground">Your personal email is publicly visible on medium.com/about. Consider updating to a generic contact form.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Update GitHub bio</p>
                  <p className="text-xs text-muted-foreground">Adding a clear summary to your GitHub bio can increase your Professional Score by 5 points.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Public Profiles Found */}
        <Card className="col-span-3 bg-background/50 backdrop-blur-md border-border/50">
          <CardHeader>
            <CardTitle>Discovered Profiles</CardTitle>
            <CardDescription>Accounts linked to your identity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                { name: "LinkedIn", visibility: "Public", risk: "Low", icon: Briefcase },
                { name: "GitHub", visibility: "Public", risk: "Low", icon: Globe },
                { name: "Twitter / X", visibility: "Semi-Private", risk: "Medium", icon: Globe },
                { name: "Personal Blog", visibility: "Public", risk: "High", icon: Globe },
                { name: "Reddit", visibility: "Anonymous", risk: "Low", icon: Globe },
              ].map((profile, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50">
                      <profile.icon className="h-4 w-4" />
                    </div>
                    <div className="grid gap-0.5">
                      <p className="text-sm font-medium leading-none">{profile.name}</p>
                      <p className="text-xs text-muted-foreground">{profile.visibility}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      profile.risk === "High" ? "border-destructive text-destructive" :
                      profile.risk === "Medium" ? "border-amber-500 text-amber-500" :
                      "border-emerald-500 text-emerald-500"
                    }
                  >
                    {profile.risk} Risk
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
