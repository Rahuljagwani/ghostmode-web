"use client";

import { useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon, Upload01Icon, CheckmarkCircle02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { AtsResult, checkResume, ToolLimitError, track } from "@/lib/tools";
import { GhostCta, ToolLimitNotice } from "./ToolNotices";

function scoreColor(score: number) {
  if (score >= 75) return { ring: "text-emerald-500", label: "Strong match" };
  if (score >= 50) return { ring: "text-amber-500", label: "Decent match, room to improve" };
  return { ring: "text-rose-500", label: "Weak match" };
}

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const { ring } = scoreColor(score);
  return (
    <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
      <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="10" className="text-gray-100" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - score / 100)}
        className={ring}
      />
    </svg>
  );
}

export default function AtsChecker() {
  const [mode, setMode] = useState<"file" | "text">("file");
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limited, setLimited] = useState(false);
  const [result, setResult] = useState<AtsResult | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const hasResume = mode === "file" ? !!file : resumeText.trim().length >= 100;
  const canSubmit = hasResume && jd.trim().length >= 80 && !loading;

  const pickFile = (f: File | undefined) => {
    setError(null);
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) {
      setError("File is larger than 2 MB. Please upload a smaller file.");
      return;
    }
    if (!/\.(pdf|docx|txt)$/i.test(f.name)) {
      setError("Please upload a PDF, DOCX or TXT file.");
      return;
    }
    setFile(f);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setLimited(false);
    try {
      const data = await checkResume(jd.trim(), mode === "file" && file ? file : resumeText.trim());
      setResult(data);
      track("tool_used", { tool: "ats_checker", score: data.score });
    } catch (err) {
      if (err instanceof ToolLimitError) {
        setLimited(true);
        track("tool_limit_hit", { tool: "ats_checker" });
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const tabClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
      active ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-sm font-semibold text-gray-900">Your resume</span>
            <div className="flex gap-2">
              <button type="button" className={tabClass(mode === "file")} onClick={() => setMode("file")}>
                Upload
              </button>
              <button type="button" className={tabClass(mode === "text")} onClick={() => setMode("text")}>
                Paste text
              </button>
            </div>
          </div>
          {mode === "file" ? (
            <div
              onClick={() => fileInput.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                pickFile(e.dataTransfer.files?.[0]);
              }}
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center hover:border-sky-300"
            >
              <HugeiconsIcon icon={Upload01Icon} size={28} className="text-sky-500" />
              <p className="mt-2 font-medium text-gray-800">{file ? file.name : "Click or drop your resume here"}</p>
              <p className="mt-1 text-xs text-gray-500">PDF, DOCX or TXT, up to 2 MB</p>
              <input
                ref={fileInput}
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={(e) => pickFile(e.target.files?.[0])}
              />
            </div>
          ) : (
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={9}
              maxLength={20000}
              placeholder="Paste the full text of your resume here"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[15px] text-gray-800 focus:border-sky-400 focus:bg-white focus:outline-none"
            />
          )}
        </div>

        <div>
          <label htmlFor="ats-jd" className="block text-sm font-semibold text-gray-900 mb-2">
            Job description
          </label>
          <textarea
            id="ats-jd"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            rows={7}
            maxLength={10000}
            placeholder="Paste the job description you're applying for"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[15px] text-gray-800 focus:border-sky-400 focus:bg-white focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-sky-500 px-7 py-3 font-semibold text-white shadow-md hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        >
          {loading && <HugeiconsIcon icon={Loading03Icon} size={18} className="animate-spin" />}
          {loading ? "Checking your resume…" : "Check my resume"}
        </button>
        <p className="text-xs text-gray-500">
          Free, no sign-up needed. Your resume is only used to run this check.
        </p>
      </form>

      {limited && <ToolLimitNotice what="resume checks" />}
      {error && <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700">{error}</p>}

      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <ScoreRing score={result.score} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">{result.score}</span>
                <span className="text-xs text-gray-500">out of 100</span>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xl font-bold text-gray-900">{scoreColor(result.score).label}</p>
              {result.summary && <p className="mt-1 text-gray-600">{result.summary}</p>}
              <p className="mt-3 text-sm text-gray-500">
                Keyword match {result.keyword_score}% · Format {result.format_score}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-3">Missing keywords</h2>
              {result.missing_keywords.length ? (
                <div className="flex flex-wrap gap-2">
                  {result.missing_keywords.map((k) => (
                    <span
                      key={k.keyword}
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        k.required ? "bg-rose-50 text-rose-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {k.keyword}
                      {!k.required && " (nice to have)"}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">None. Your resume covers the key terms.</p>
              )}
              <p className="mt-3 text-xs text-gray-500">Only add the ones that are genuinely true for you.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-3">Keywords you already have</h2>
              <div className="flex flex-wrap gap-2">
                {result.matched_keywords.map((k) => (
                  <span key={k.keyword} className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                    {k.keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-bold text-gray-900 mb-3">Format checks</h2>
            <ul className="divide-y divide-gray-100">
              {result.checks.map((c) => (
                <li key={c.label} className="flex items-start gap-3 py-3">
                  <HugeiconsIcon
                    icon={c.ok ? CheckmarkCircle02Icon : Cancel01Icon}
                    size={20}
                    className={`mt-0.5 shrink-0 ${c.ok ? "text-emerald-500" : "text-rose-500"}`}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{c.label}</p>
                    <p className="text-sm text-gray-600">{c.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {result.suggestions.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-3">How to improve</h2>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                {result.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          )}

          <GhostCta
            title="Got the interview? Ghost helps you ace it"
            text="Ghost listens to the interviewer and suggests clear answers in seconds, using your resume and this job description. Hidden from screen share. 20 free credits to start."
          />
        </div>
      )}
    </div>
  );
}
