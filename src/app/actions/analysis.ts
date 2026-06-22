"use server";

import { createClient } from "@/utils/supabase/server";
import { GoogleGenAI, Type, Schema } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const reportSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    identitySummary: {
      type: Type.STRING,
      description: "A 2-3 sentence summary of the person's digital identity based on the footprints.",
    },
    professionalScore: {
      type: Type.INTEGER,
      description: "A score from 0-100 indicating how professional their public presence is.",
    },
    privacyExposureScore: {
      type: Type.INTEGER,
      description: "A score from 0-100 indicating how exposed their private data is (higher means more exposed).",
    },
    recruiterReadinessScore: {
      type: Type.INTEGER,
      description: "A score from 0-100 indicating how ready they are to be hired based on their footprint.",
    },
    securityRecommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of actionable steps to improve privacy and security.",
    },
  },
  required: [
    "identitySummary",
    "professionalScore",
    "privacyExposureScore",
    "recruiterReadinessScore",
    "securityRecommendations",
  ],
};

export async function generateAiReport(jobId: string) {
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

  // 2. Format Context for LLM
  const footprintContext = discoveries.map((d) => ({
    platform: d.platform,
    status: d.status,
    severity: d.severity,
    data: d.raw_data,
  }));

  const prompt = `
    You are TraceGuard, an elite OSINT analyst and privacy expert.
    Analyze the following digital footprint data for a user and generate a structured risk and identity report.
    
    Data:
    ${JSON.stringify(footprintContext, null, 2)}
  `;

  try {
    // 3. Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
        temperature: 0.2, // Low temp for more deterministic scoring
      },
    });

    const resultText = response.text;
    if (!resultText) throw new Error("AI returned empty response");

    const parsedReport = JSON.parse(resultText);

    // 4. Save to Database
    const { error: insertError } = await supabase.from("scan_reports").insert({
      job_id: jobId,
      user_id: user.id,
      identity_summary: parsedReport.identitySummary,
      professional_score: parsedReport.professionalScore,
      privacy_score: parsedReport.privacyExposureScore,
      recruiter_readiness_score: parsedReport.recruiterReadinessScore,
      actionable_insights: parsedReport.securityRecommendations,
    });

    if (insertError) throw new Error(`Database error: ${insertError.message}`);

    return { success: true, report: parsedReport };
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    throw new Error(error.message || "Failed to generate AI report");
  }
}
