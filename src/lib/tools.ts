import posthog from "posthog-js";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface PredictedQuestion {
  question: string;
  type: string;
  why: string;
  hint: string;
}

export interface QuestionsResult {
  role: string;
  questions: PredictedQuestion[];
}

export interface AtsKeyword {
  keyword: string;
  required: boolean;
}

export interface AtsCheck {
  label: string;
  ok: boolean;
  detail: string;
}

export interface AtsResult {
  score: number;
  keyword_score: number;
  format_score: number;
  summary: string;
  matched_keywords: AtsKeyword[];
  missing_keywords: AtsKeyword[];
  checks: AtsCheck[];
  suggestions: string[];
}

/** Thrown when the visitor has used up today's free uses. */
export class ToolLimitError extends Error {}

function authHeader(): Record<string, string> {
  try {
    const token = localStorage.getItem("renekin_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

async function handle<T>(res: Response): Promise<T> {
  if (res.status === 429) throw new ToolLimitError("Daily limit reached");
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const detail = body?.detail;
    throw new Error(typeof detail === "string" ? detail : "Something went wrong. Please try again.");
  }
  return res.json();
}

export function track(event: string, props?: Record<string, unknown>) {
  if (posthog.__loaded) posthog.capture(event, props);
}

export async function predictQuestions(jobDescription: string, company?: string): Promise<QuestionsResult> {
  const res = await fetch(`${API_URL}/tools/interview-questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ job_description: jobDescription, company: company || null }),
  });
  return handle<QuestionsResult>(res);
}

export async function checkResume(jobDescription: string, resume: File | string): Promise<AtsResult> {
  const form = new FormData();
  form.append("job_description", jobDescription);
  if (typeof resume === "string") form.append("resume_text", resume);
  else form.append("resume_file", resume);
  const res = await fetch(`${API_URL}/tools/ats-check`, {
    method: "POST",
    headers: authHeader(),
    body: form,
  });
  return handle<AtsResult>(res);
}
