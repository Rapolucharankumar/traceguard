"use server";

import { createClient } from "@/utils/supabase/server";

export async function createScanJob(username: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("scan_jobs")
    .insert({
      user_id: user.id,
      target_username: username,
      status: "scanning"
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create job: ${error.message}`);
  return data.id;
}

export async function completeScanJob(jobId: string) {
  const supabase = await createClient();
  await supabase.from("scan_jobs").update({ status: "completed", completed_at: new Date().toISOString() }).eq("id", jobId);
}

// ----------------------------------------------------------------------
// OSINT WORKERS
// ----------------------------------------------------------------------

export async function scanGithub(jobId: string, username: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: { "User-Agent": "TraceGuard-OSINT-Engine" },
      next: { revalidate: 0 }
    });

    if (res.status === 200) {
      const data = await res.json();
      await supabase.from("profile_discoveries").insert({
        job_id: jobId,
        user_id: user.id,
        platform: "GitHub",
        username,
        profile_url: data.html_url,
        status: "found",
        severity: data.email ? "high" : "low", // Exposed email is a risk
        raw_data: data
      });
    } else {
      await insertNotFound(supabase, jobId, user.id, "GitHub", username);
    }
  } catch (error) {
    await insertError(supabase, jobId, user.id, "GitHub", username);
  }
}

export async function scanReddit(jobId: string, username: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  try {
    const res = await fetch(`https://www.reddit.com/user/${username}/about.json`, {
      headers: { "User-Agent": "TraceGuard-Bot" },
      next: { revalidate: 0 }
    });

    if (res.status === 200) {
      const data = await res.json();
      await supabase.from("profile_discoveries").insert({
        job_id: jobId,
        user_id: user.id,
        platform: "Reddit",
        username,
        profile_url: `https://reddit.com/user/${username}`,
        status: "found",
        severity: "medium", // Potential oversharing risk
        raw_data: data.data
      });
    } else {
      await insertNotFound(supabase, jobId, user.id, "Reddit", username);
    }
  } catch (error) {
    await insertError(supabase, jobId, user.id, "Reddit", username);
  }
}

export async function checkGenericProfile(jobId: string, platform: string, profileUrl: string, username: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  try {
    // We use a basic HEAD or GET request to see if the page exists (200 OK)
    // Note: Some platforms block fetch and return 403, we count that as 'error' or 'not_found'
    const res = await fetch(profileUrl, {
      method: "GET",
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      next: { revalidate: 0 }
    });

    if (res.status === 200) {
      await supabase.from("profile_discoveries").insert({
        job_id: jobId,
        user_id: user.id,
        platform,
        username,
        profile_url: profileUrl,
        status: "found",
        severity: "low",
        raw_data: { http_status: 200 }
      });
    } else {
      await insertNotFound(supabase, jobId, user.id, platform, username);
    }
  } catch (error) {
    await insertError(supabase, jobId, user.id, platform, username);
  }
}

// Helpers
async function insertNotFound(supabase: any, jobId: string, userId: string, platform: string, username: string) {
  await supabase.from("profile_discoveries").insert({
    job_id: jobId, user_id: userId, platform, username, profile_url: "", status: "not_found"
  });
}

async function insertError(supabase: any, jobId: string, userId: string, platform: string, username: string) {
  await supabase.from("profile_discoveries").insert({
    job_id: jobId, user_id: userId, platform, username, profile_url: "", status: "error"
  });
}
