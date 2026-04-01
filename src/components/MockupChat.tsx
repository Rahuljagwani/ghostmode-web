"use client";

import { useEffect, useState, useCallback } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Mic01Icon } from "@hugeicons/core-free-icons";

interface Scenario {
  question: string;
  lines: { text: string; dim?: boolean }[];
  code?: { lang: string; lines: string[] };
}

const scenarios: Scenario[] = [
  {
    question: "What should I say now, analyse the screen",
    lines: [
      { text: 'Approach: "I\'ll use a Hash Map to store indices, allowing for a single-pass O(n) solution."' },
      { text: 'Trade-off: "Choosing space efficiency over a brute-force O(n²) nested loop."', dim: true },
      { text: 'Edge Cases: "Mention handling empty arrays or cases with no valid solution."', dim: true },
    ],
    code: {
      lang: "Python",
      lines: [
        '<span class="text-blue-400">def</span> <span class="text-yellow-300">twoSum</span><span class="text-white/80">(nums, target):</span>',
        '<span class="text-white/70 pl-4">    prevMap = {} # val : index</span>',
        '<span class="pl-4">    <span class="text-blue-400">for</span> <span class="text-white/80">i, n</span> <span class="text-blue-400">in</span> <span class="text-yellow-300">enumerate</span><span class="text-white/80">(nums):</span></span>',
        '<span class="text-white/70 pl-8">        diff = target - n</span>',
        '<span class="pl-8">        <span class="text-blue-400">if</span> <span class="text-white/80">diff</span> <span class="text-blue-400">in</span> <span class="text-white/80">prevMap:</span></span>',
        '<span class="pl-12">            <span class="text-blue-400">return</span> <span class="text-white/80">[prevMap[diff], i]</span></span>',
        '<span class="text-white/70 pl-8">        prevMap[n] = i</span>',
      ],
    },
  },
  {
    question: "How do I explain my system design approach?",
    lines: [
      { text: 'Start with requirements: "The system needs to handle 10K requests/sec with sub-100ms latency."' },
      { text: 'Propose architecture: "I\'d use a load balancer → API gateway → microservices with Redis caching."', dim: true },
      { text: 'Mention trade-offs: "This adds complexity but gives us horizontal scalability and fault isolation."', dim: true },
    ],
  },
  {
    question: "They asked about React performance, what do I say?",
    lines: [
      { text: 'Key point: "Use React.memo and useMemo to prevent unnecessary re-renders in large component trees."' },
      { text: 'Mention: "Virtualize long lists with react-window, and lazy-load routes with React.lazy + Suspense."', dim: true },
      { text: 'Bonus: "Use the React DevTools Profiler to identify bottlenecks before optimizing."', dim: true },
    ],
    code: {
      lang: "TypeScript",
      lines: [
        '<span class="text-blue-400">const</span> <span class="text-yellow-300">MemoList</span> <span class="text-white/80">= React.memo(({ items }) =&gt; {</span>',
        '<span class="pl-4">  <span class="text-blue-400">const</span> <span class="text-white/80">sorted = useMemo(</span></span>',
        '<span class="pl-8">    <span class="text-white/80">() =&gt; items.sort(compareFn),</span></span>',
        '<span class="pl-8">    <span class="text-white/80">[items]</span></span>',
        '<span class="pl-4">  <span class="text-white/80">);</span></span>',
        '<span class="pl-4">  <span class="text-blue-400">return</span> <span class="text-white/80">&lt;VirtualList data={sorted} /&gt;;</span></span>',
        '<span class="text-white/80">});</span>',
      ],
    },
  },
];

type Phase = "typing" | "streaming" | "code" | "hold" | "fadeout" | "pause";

export default function MockupChat() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typedChars, setTypedChars] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [visibleCodeLines, setVisibleCodeLines] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const scenario = scenarios[scenarioIdx];

  const reset = useCallback(() => {
    setTypedChars(0);
    setVisibleLines(0);
    setVisibleCodeLines(0);
    setOpacity(1);
  }, []);

  // Typing phase
  useEffect(() => {
    if (phase !== "typing") return;
    if (typedChars >= scenario.question.length) {
      const t = setTimeout(() => setPhase("streaming"), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTypedChars((c) => c + 1), 30);
    return () => clearTimeout(t);
  }, [phase, typedChars, scenario.question.length]);

  // Streaming answer lines
  useEffect(() => {
    if (phase !== "streaming") return;
    if (visibleLines >= scenario.lines.length) {
      const t = setTimeout(
        () => setPhase(scenario.code ? "code" : "hold"),
        400
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleLines((l) => l + 1), 500);
    return () => clearTimeout(t);
  }, [phase, visibleLines, scenario.lines.length, scenario.code]);

  // Streaming code lines
  useEffect(() => {
    if (phase !== "code" || !scenario.code) return;
    if (visibleCodeLines >= scenario.code.lines.length) {
      const t = setTimeout(() => setPhase("hold"), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleCodeLines((l) => l + 1), 180);
    return () => clearTimeout(t);
  }, [phase, visibleCodeLines, scenario.code]);

  // Hold visible
  useEffect(() => {
    if (phase !== "hold") return;
    const t = setTimeout(() => setPhase("fadeout"), 3000);
    return () => clearTimeout(t);
  }, [phase]);

  // Fade out
  useEffect(() => {
    if (phase !== "fadeout") return;
    setOpacity(0);
    const t = setTimeout(() => setPhase("pause"), 600);
    return () => clearTimeout(t);
  }, [phase]);

  // Pause then next scenario
  useEffect(() => {
    if (phase !== "pause") return;
    const t = setTimeout(() => {
      setScenarioIdx((i) => (i + 1) % scenarios.length);
      reset();
      setPhase("typing");
    }, 800);
    return () => clearTimeout(t);
  }, [phase, reset]);

  return (
    <div
      className="p-3 space-y-2 transition-opacity duration-500"
      style={{ opacity }}
    >
      {/* User message */}
      <div className="flex justify-end">
        <div className="bg-white/10 text-white/90 text-xs px-3 py-2 rounded-xl rounded-br-sm max-w-[300px]">
          {scenario.question.slice(0, typedChars)}
          {phase === "typing" && (
            <span className="inline-block w-[2px] h-3 bg-white/70 ml-0.5 animate-pulse align-middle" />
          )}
        </div>
      </div>

      {/* AI response */}
      {visibleLines > 0 && (
        <div className="bg-white/8 rounded-xl rounded-bl-sm p-2.5 space-y-1 border border-white/10">
          {scenario.lines.slice(0, visibleLines).map((line, i) => (
            <p
              key={i}
              className={`text-xs leading-relaxed animate-[fadeInUp_0.3s_ease-out_both] ${
                line.dim ? "text-white/60" : "text-white/80"
              }`}
            >
              {line.text}
            </p>
          ))}
        </div>
      )}

      {/* Code block */}
      {visibleCodeLines > 0 && scenario.code && (
        <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10 animate-[fadeInUp_0.3s_ease-out_both]">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 bg-white/5">
            <span className="text-white/50 text-[10px]">{scenario.code.lang}</span>
            <HugeiconsIcon icon={Copy01Icon} size={12} className="text-white/30" />
          </div>
          <div className="p-2.5 text-[11px] font-mono leading-snug">
            {scenario.code.lines.slice(0, visibleCodeLines).map((line, i) => (
              <div
                key={i}
                className="animate-[fadeInUp_0.2s_ease-out_both]"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="pt-1">
        <div className="flex items-center gap-2 bg-white/8 rounded-lg px-3 py-2 border border-white/15">
          <div className="w-6 h-6 rounded-full bg-[#4fc3f7]/20 flex items-center justify-center flex-shrink-0">
            <HugeiconsIcon icon={Mic01Icon} size={12} className="text-[#4fc3f7]" />
          </div>
          <span className="text-white/30 text-xs">Ask anything about the screen</span>
        </div>
      </div>
    </div>
  );
}
