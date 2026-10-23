"use client";

import { useState } from "react";
import { tellMeAboutYourself, TmayResult } from "@/lib/tools";
import { GhostCta, ToolLimitNotice } from "./ToolNotices";
import { CopyButton, ErrorNote, inputClass, SubmitButton, useToolRun } from "./shared";

export default function TmayGenerator() {
  const [background, setBackground] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const { loading, error, limited, result, run } = useToolRun<TmayResult>("tell_me_about_yourself");
  const ready = background.trim().length >= 60 && role.trim().length >= 2;

  return (
    <div className="space-y-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ready) run(() => tellMeAboutYourself(background.trim(), role.trim(), company.trim()));
        }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8 space-y-5"
      >
        <div>
          <label htmlFor="bg" className="block text-sm font-semibold text-gray-900 mb-2">
            Your resume or background
          </label>
          <textarea
            id="bg"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            rows={8}
            maxLength={8000}
            placeholder="Paste your resume, or a few lines: education, projects, internships, achievements…"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-900 mb-2">
              Role you&apos;re interviewing for
            </label>
            <input id="role" value={role} onChange={(e) => setRole(e.target.value)} maxLength={120} placeholder="e.g. Software Engineer" className={inputClass} />
          </div>
          <div>
            <label htmlFor="co" className="block text-sm font-semibold text-gray-900 mb-2">
              Company <span className="font-normal text-gray-500">(optional)</span>
            </label>
            <input id="co" value={company} onChange={(e) => setCompany(e.target.value)} maxLength={120} placeholder="e.g. Infosys" className={inputClass} />
          </div>
        </div>
        <SubmitButton loading={loading} disabled={!ready} label="Write my answer" loadingLabel="Writing your answer…" />
        <p className="text-xs text-gray-500">Free, no sign-up needed. Only uses facts you provide.</p>
      </form>

      {limited && <ToolLimitNotice what="answers" />}
      {error && <ErrorNote message={error} />}

      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your answer</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {result.word_count} words · about {Math.max(1, Math.round(result.word_count / 2.3))} seconds out loud
                </p>
              </div>
              <CopyButton text={result.answer} />
            </div>
            <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">{result.answer}</p>
          </div>
          {result.tips.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-3">Delivery tips</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {result.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}
          <GhostCta
            title="Blank on the next question?"
            text="Ghost listens to the interviewer and suggests answers in seconds, using your resume, so you're never stuck mid-interview. Hidden from screen share. 20 free credits to start."
          />
        </div>
      )}
    </div>
  );
}
