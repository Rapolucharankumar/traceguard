"use server";

import { createClient } from "@/utils/supabase/server";
import { GoogleGenAI, Type, Schema } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const recruiterSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hiringReadinessScore: {
      type: Type.INTEGER,
      description: "A score from 0-100 indicating how strong the candidate appears to an Applicant Tracking System (ATS) and a technical recruiter based solely on their public footprint.",
    },
    reputationSynthesis: {
      type: Type.STRING,
      description: "A 3-4 sentence paragraph synthesizing the candidate's public reputation. How do they look to an employer?",
    },
    strengths: {
      type: Type.ARRAY,
      description: "Top 3 clear strengths found in the digital footprint.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["title", "description"],
      },
    },
    weaknesses: {
      type: Type.ARRAY,
      description: "Top 2-3 weaknesses or red flags found in the digital footprint.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["title", "description"],
      },
    },
    missingSignals: {
      type: Type.ARRAY,
      description: "Gaps in the footprint that a recruiter would normally expect to see for a strong candidate.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["title", "description"],
      },
    },
    verifiedSkills: {
      type: Type.ARRAY,
      description: "List of technical or professional skills that are explicitly verified or heavily implied by the footprint data.",
      items: { type: Type.STRING },
    },
    weakSignals: {
      type: Type.ARRAY,
      description: "List of skills that are claimed but lack strong public verification or endorsements.",
      items: { type: Type.STRING },
    },
  },
  required: [
    "hiringReadinessScore",
    "reputationSynthesis",
    "strengths",
    "weaknesses",
    "missingSignals",
    "verifiedSkills",
    "weakSignals",
  ],
};

export async function generateRecruiterReport(jobId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // 1. Fetch OSINT Data
  const { data: discoveries, error: fetchError } = await supabase
    .from("profile_discoveries")
    .select("*")
    .eq("job_id", jobId);

  if (fetchError || !discoveries || discoveries.length === 0) {
    throw new Error("No footprint data found for this job.");
  }

  const footprintContext = discoveries.map((d) => ({
    platform: d.platform,
    status: d.status,
    severity: d.severity,
    data: d.raw_data,
  }));

  const prompt = `
    You are an elite Technical Recruiter and an advanced Applicant Tracking System (ATS) AI.
    Analyze the following digital footprint data for a candidate. 
    Evaluate their public presence exactly as a hiring manager would in a 5-minute pre-screen.
    Do not be overly polite; be objective, analytical, and critical where necessary.
    
    Data:
    ${JSON.stringify(footprintContext, null, 2)}
  `;

  try {
    // 2. Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recruiterSchema,
        temperature: 0.3,
      },
    });

    const resultText = response.text;
    if (!resultText) throw new Error("AI returned empty response");

    const parsedReport = JSON.parse(resultText);

    // 3. Save to Database
    const { error: insertError } = await supabase.from("recruiter_reports").insert({
      job_id: jobId,
      user_id: user.id,
      hiring_readiness_score: parsedReport.hiringReadinessScore,
      strengths: parsedReport.strengths,
      weaknesses: parsedReport.weaknesses,
      missing_signals: parsedReport.missingSignals,
      verified_skills: parsedReport.verifiedSkills,
      weak_signals: parsedReport.weakSignals,
      reputation_synthesis: parsedReport.reputationSynthesis,
    });

    if (insertError) throw new Error(`Database error: ${insertError.message}`);

    return { success: true, report: parsedReport };
  } catch (error: any) {
    console.error("Recruiter Generation Error:", error);
    throw new Error(error.message || "Failed to generate recruiter report");
  }
}
