"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon, Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { predictQuestions, QuestionsResult, ToolLimitError, track } from "@/lib/tools";
import { GhostCta, ToolLimitNotice } from "./ToolNotices";

const TYPE_STYLES: Record<string, string> = {
  technical: "bg-violet-50 text-violet-700",
  behavioral: "bg-amber-50 text-amber-700",
  role: "bg-sky-50 text-sky-700",
  hr: "bg-emerald-50 text-emerald-700",
};
const TYPE_LABELS: Record<string, string> = { technical: "Technical", behavioral: "Behavioral", role: "Role", hr: "HR" };

export default function QuestionPredictor() {
  const [jd, setJd] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limited, setLimited] = useState(false);
  const [result, setResult] = useState<QuestionsResult | null>(null);
  const [copied, setCopied] = useState(false);

  const tooShort = jd.trim().length < 80;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tooShort || loading) return;
    setLoading(true);
    setError(null);
    setLimited(false);
    try {
      const data = await predictQuestions(jd.trim(), company.trim());
      setResult(data);
      track("tool_used", { tool: "interview_questions" });
    } catch (err) {
      if (err instanceof ToolLimitError) {
        setLimited(true);
        track("tool_limit_hit", { tool: "interview_questions" });
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyAll = async () => {
    if (!result) return;
    const text = result.questions.map((q, i) => `${i + 1}. ${q.question}\n   Tip: ${q.hint}`).join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8 space-y-5">
        <div>
          <label htmlFor="jd" className="block text-sm font-semibold text-gray-900 mb-2">
            Job description
          </label>
          <textarea
            id="jd"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            rows={9}
            maxLength={10000}
            placeholder="Paste the full job description here: role, responsibilities, requirements…"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[15px] text-gray-800 focus:border-sky-400 focus:bg-white focus:outline-none"
          />
          {jd.length > 0 && tooShort && (
            <p className="mt-1 text-xs text-gray-500">Paste a bit more of the job description for better questions.</p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
            Company <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            maxLength={120}
            placeholder="e.g. Infosys, Amazon, a fintech startup"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[15px] text-gray-800 focus:border-sky-400 focus:bg-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={tooShort || loading}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-sky-500 px-7 py-3 font-semibold text-white shadow-md hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        >
          {loading && <HugeiconsIcon icon={Loading03Icon} size={18} className="animate-spin" />}
          {loading ? "Predicting questions…" : "Predict my interview questions"}
        </button>
        <p className="text-xs text-gray-500">Free, no sign-up needed. Takes about 10 seconds.</p>
      </form>

      {limited && <ToolLimitNotice what="predictions" />}
      {error && <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700">{error}</p>}

      {result && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Your likely interview questions</h2>
              {result.role && <p className="text-gray-500 mt-1">For: {result.role}</p>}
            </div>
            <button
              type="button"
              onClick={copyAll}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-sky-300"
            >
              <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} size={16} />
              {copied ? "Copied" : "Copy all"}
            </button>
          </div>
          <ol className="space-y-4">
            {result.questions.map((q, i) => (
              <li key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_STYLES[q.type] ?? TYPE_STYLES.role}`}
                    >
                      {TYPE_LABELS[q.type] ?? "Role"}
                    </span>
                    <p className="mt-2 font-semibold text-gray-900 leading-snug">{q.question}</p>
                    {q.why && <p className="mt-2 text-sm text-gray-500">Why they ask: {q.why}</p>}
                    {q.hint && (
                      <p className="mt-2 text-sm text-gray-700">
                        <span className="font-semibold text-sky-700">How to answer:</span> {q.hint}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <GhostCta
            title="Want help with these in the real interview?"
            text="Ghost listens to the interviewer and suggests a clear answer in seconds, tailored to your resume. It stays hidden from screen share. Start with 20 free credits."
          />
        </div>
      )}
    </div>
  );
}
