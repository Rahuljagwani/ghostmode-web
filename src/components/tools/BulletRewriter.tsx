"use client";

import { useState } from "react";
import { BulletResult, rewriteBullet } from "@/lib/tools";
import { GhostCta, ToolLimitNotice } from "./ToolNotices";
import { CopyButton, ErrorNote, inputClass, SubmitButton, useToolRun } from "./shared";

export default function BulletRewriter() {
  const [bullet, setBullet] = useState("");
  const [role, setRole] = useState("");
  const { loading, error, limited, result, run } = useToolRun<BulletResult>("bullet_rewriter");
  const ready = bullet.trim().length >= 10;

  return (
    <div className="space-y-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ready) run(() => rewriteBullet(bullet.trim(), role.trim()));
        }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8 space-y-5"
      >
        <div>
          <label htmlFor="bullet" className="block text-sm font-semibold text-gray-900 mb-2">
            Your resume bullet point
          </label>
          <textarea
            id="bullet"
            value={bullet}
            onChange={(e) => setBullet(e.target.value)}
            rows={3}
            maxLength={600}
            placeholder='e.g. "Worked on the college placement website"'
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="brole" className="block text-sm font-semibold text-gray-900 mb-2">
            Target role <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input id="brole" value={role} onChange={(e) => setRole(e.target.value)} maxLength={120} placeholder="e.g. Frontend Developer" className={inputClass} />
        </div>
        <SubmitButton loading={loading} disabled={!ready} label="Rewrite my bullet" loadingLabel="Rewriting…" />
        <p className="text-xs text-gray-500">Free, no sign-up needed. Fill in the [placeholders] with your real numbers.</p>
      </form>

      {limited && <ToolLimitNotice what="rewrites" />}
      {error && <ErrorNote message={error} />}

      {result && (
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">3 stronger versions</h2>
          <div className="space-y-4">
            {result.rewrites.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-medium text-gray-900 leading-relaxed">{r.text}</p>
                  <CopyButton text={r.text} />
                </div>
                {r.why && <p className="mt-2 text-sm text-gray-500">{r.why}</p>}
              </div>
            ))}
          </div>
          {result.tip && (
            <p className="rounded-xl bg-sky-50 border border-sky-200 px-4 py-3 text-gray-800">
              <span className="font-semibold text-sky-700">Make it stronger:</span> {result.tip}
            </p>
          )}
          <GhostCta
            title="Resume done? Get ready for the interview"
            text="Ghost suggests clear answers in real time during your interview, using your resume and the job description. Hidden from screen share. 20 free credits to start."
          />
        </div>
      )}
    </div>
  );
}
