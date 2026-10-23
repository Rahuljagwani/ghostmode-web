"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Loading03Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { ToolLimitError, track } from "@/lib/tools";

export const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[15px] text-gray-800 focus:border-sky-400 focus:bg-white focus:outline-none";

/** Loading / error / daily-limit state for a free tool. */
export function useToolRun<T>(tool: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limited, setLimited] = useState(false);
  const [result, setResult] = useState<T | null>(null);

  const run = async (fn: () => Promise<T>) => {
    setLoading(true);
    setError(null);
    setLimited(false);
    try {
      setResult(await fn());
      track("tool_used", { tool });
    } catch (err) {
      if (err instanceof ToolLimitError) {
        setLimited(true);
        track("tool_limit_hit", { tool });
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, limited, result, run };
}

export function SubmitButton({ loading, disabled, label, loadingLabel }: { loading: boolean; disabled: boolean; label: string; loadingLabel: string }) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-sky-500 px-7 py-3 font-semibold text-white shadow-md hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
    >
      {loading && <HugeiconsIcon icon={Loading03Icon} size={18} className="animate-spin" />}
      {loading ? loadingLabel : label}
    </button>
  );
}

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-sky-300"
    >
      <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} size={15} />
      {copied ? "Copied" : label}
    </button>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700">{message}</p>;
}
