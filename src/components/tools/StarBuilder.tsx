"use client";

import { useState } from "react";
import { buildStarAnswer, StarResult } from "@/lib/tools";
import { GhostCta, ToolLimitNotice } from "./ToolNotices";
import { CopyButton, ErrorNote, inputClass, SubmitButton, useToolRun } from "./shared";

const EXAMPLE_QUESTIONS = [
  "Tell me about a time you faced a challenge.",
  "Tell me about a time you worked under pressure.",
  "Describe a conflict with a teammate and how you resolved it.",
  "Tell me about a time you showed leadership.",
  "Tell me about a mistake you made and what you learned.",
];

export default function StarBuilder() {
  const [question, setQuestion] = useState(EXAMPLE_QUESTIONS[0]);
  const [story, setStory] = useState("");
  const { loading, error, limited, result, run } = useToolRun<StarResult>("star_builder");
  const ready = story.trim().length >= 40;

  const parts: [string, keyof StarResult, string][] = [
    ["S", "situation", "Situation"],
    ["T", "task", "Task"],
    ["A", "action", "Action"],
    ["R", "result", "Result"],
  ];

  return (
    <div className="space-y-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ready) run(() => buildStarAnswer(story.trim(), question.trim()));
        }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8 space-y-5"
      >
        <div>
          <label htmlFor="q" className="block text-sm font-semibold text-gray-900 mb-2">
            Interview question
          </label>
          <input id="q" value={question} onChange={(e) => setQuestion(e.target.value)} maxLength={300} list="star-questions" className={inputClass} />
          <datalist id="star-questions">
            {EXAMPLE_QUESTIONS.map((q) => (
              <option key={q} value={q} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="story" className="block text-sm font-semibold text-gray-900 mb-2">
            What happened? (rough notes are fine)
          </label>
          <textarea
            id="story"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={6}
            maxLength={4000}
            placeholder="e.g. In my final year project, 2 teammates stopped working a month before the deadline. I split their work, made a plan, finished on time and we got an A."
            className={inputClass}
          />
        </div>
        <SubmitButton loading={loading} disabled={!ready} label="Build my STAR answer" loadingLabel="Building your answer…" />
        <p className="text-xs text-gray-500">Free, no sign-up needed. Only uses facts you provide.</p>
      </form>

      {limited && <ToolLimitNotice what="answers" />}
      {error && <ErrorNote message={error} />}

      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {parts.map(([letter, key, label]) => (
              <div key={key} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">{letter}</span>
                  <span className="font-semibold text-gray-900">{label}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{result[key]}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your full answer</h2>
                <p className="text-sm text-gray-500 mt-1">{result.question}</p>
              </div>
              <CopyButton text={result.full_answer} />
            </div>
            <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">{result.full_answer}</p>
          </div>
          {result.tip && (
            <p className="rounded-xl bg-sky-50 border border-sky-200 px-4 py-3 text-gray-800">
              <span className="font-semibold text-sky-700">Make it stronger:</span> {result.tip}
            </p>
          )}
          <GhostCta
            title="Get STAR answers live in your interview"
            text="Ghost's behavioral mode suggests STAR answers in seconds when the interviewer asks, using your own resume. Hidden from screen share. 20 free credits to start."
          />
        </div>
      )}
    </div>
  );
}
