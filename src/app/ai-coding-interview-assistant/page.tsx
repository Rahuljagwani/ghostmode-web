import { Metadata } from "next";
import Link from "next/link";
import DemoVideo from "@/components/DemoVideo";
import Icon from "@/components/Icon";
import {
  ArrowRight02Icon,
  Mic01Icon,
  EyeIcon,
  CodeIcon,
  ViewOffIcon,
  Clock01Icon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

const URL = "https://renekin.com/ai-coding-interview-assistant";

export const metadata: Metadata = {
  title: { absolute: "AI Coding Interview Assistant: Approach, Code & Complexity | Ghost" },
  description:
    "Screenshot a coding problem and Ghost gives you the approach, clean code, time and space complexity and edge cases in seconds. Hidden from screen share on Mac and Windows.",
  keywords: [
    "AI coding interview assistant",
    "coding interview AI",
    "AI coding interview copilot",
    "LeetCode interview assistant",
    "technical interview AI assistant",
    "DSA interview help",
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: "AI Coding Interview Assistant | Ghost by Renekin AI",
    description:
      "Screenshot the problem, get the approach, code, complexity and edge cases in seconds. Hidden from screen share.",
    images: ["/opengraph-image"],
  },
};

const capabilities: { icon: IconSvgElement; title: string; desc: string; color: string; bg: string }[] = [
  {
    icon: EyeIcon,
    title: "Reads the problem from your screen",
    desc: "Take a screenshot of the question in any editor, browser tab or shared doc. No copying and pasting.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Layers01Icon,
    title: "Approach before code",
    desc: "A short explanation of the idea first, so you can talk through your thinking before you start typing.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: CodeIcon,
    title: "Clean code in your language",
    desc: "Python, Java, C++, JavaScript, Go and more. Readable code with clear variable names, not code-golf.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Clock01Icon,
    title: "Complexity and edge cases",
    desc: "Time and space complexity plus the edge cases interviewers love to ask about: empty input, duplicates, overflow.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Mic01Icon,
    title: "Hears the follow-ups",
    desc: "\"Can you do it in O(1) space?\" \"What if the input is sorted?\" Ghost listens and suggests how to adapt.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: ViewOffIcon,
    title: "Hidden from screen share",
    desc: "Ghost's window is excluded from screen capture, so it doesn't appear in Zoom, Google Meet, Teams or recordings.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const rounds: { title: string; desc: string }[] = [
  {
    title: "Data structures and algorithms (DSA)",
    desc: "Arrays, strings, hash maps, two pointers, sliding window, trees, graphs, dynamic programming. The classic LeetCode-style round.",
  },
  {
    title: "Live coding in a shared editor",
    desc: "Ghost floats over any app, so it works alongside browser-based coding pads, your own IDE, or a screen-shared doc.",
  },
  {
    title: "Debugging and code review",
    desc: "Screenshot a buggy function and get the likely cause, the fix, and how to explain it.",
  },
  {
    title: "System design",
    desc: "Screenshot a diagram or the prompt and get the key components, trade-offs and scaling points to cover.",
  },
  {
    title: "Practice and mock interviews",
    desc: "Work through problems with a friend and see how a strong answer is structured before the real round.",
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "What is an AI coding interview assistant?",
    a: "An AI coding interview assistant is an app that helps you during a coding interview. You show it the problem, and it suggests an approach, working code, the time and space complexity, and edge cases to mention, so you can explain your solution clearly.",
  },
  {
    q: "How does Ghost help in a coding interview?",
    a: "Take a screenshot of the coding problem and Ghost returns the approach, clean code in your chosen language, the time and space complexity, and edge cases, usually within a few seconds. It can also listen to follow-up questions and suggest how to adapt your solution.",
  },
  {
    q: "Which programming languages does Ghost support?",
    a: "Ghost can answer in any mainstream language, including Python, Java, C++, JavaScript, TypeScript, Go, C# and Kotlin. Just tell it which one you're using.",
  },
  {
    q: "Does Ghost work with browser-based coding editors?",
    a: "Yes. Ghost is a desktop app that floats on top of any window, so it works alongside coding pads in your browser, your own IDE, or a shared document during a video call.",
  },
  {
    q: "Will the interviewer see Ghost when I share my screen?",
    a: "No. Ghost's window is excluded from screen capture on macOS and Windows, so it doesn't appear when you share your screen in Zoom, Google Meet or Microsoft Teams, or in screen recordings.",
  },
  {
    q: "Can Ghost help with system design interviews?",
    a: "Yes. Screenshot the prompt or a diagram and Ghost outlines the key components, data flow, trade-offs and how to scale the design, which you can use as talking points.",
  },
  {
    q: "How much does it cost?",
    a: "Every new account gets 20 free credits. A screenshot costs 2 credits and a text question 1 credit. Credit packs start at $10 for 200 credits, with no subscription.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://renekin.com" },
      { "@type": "ListItem", position: 2, name: "AI Coding Interview Assistant", item: URL },
    ],
  },
];

const sample = `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []`;

export default function AiCodingInterviewAssistantPage() {
  return (
    <div className="-mt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-12 sm:pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-sm text-balance">
            AI Coding Interview Assistant
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Screenshot the problem. Ghost gives you the approach, clean code, time and space complexity and edge
            cases in seconds, so you can talk through your solution with confidence.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 bg-white text-gray-800 px-7 py-3.5 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Try it free
              <Icon icon={ArrowRight02Icon} size={20} />
            </Link>
            <Link href="/pricing" className="text-white/90 hover:text-white font-medium transition-colors">
              See pricing
            </Link>
          </div>
          <p className="mt-5 text-sm font-medium text-white/85">
            20 free credits · macOS &amp; Windows · No subscription
          </p>
        </div>
      </section>

      {/* What it is + sample */}
      <section className="bg-gradient-to-b from-sky-100 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                What is an AI coding interview assistant?
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  An AI coding interview assistant is an app that helps you during a coding round. You show it the
                  problem, and it suggests the approach, working code, the complexity and the edge cases worth
                  mentioning.
                </p>
                <p>
                  <strong className="text-gray-900">Ghost</strong> does this from a single screenshot. It sits in a
                  small floating window on your desktop, works with any editor or browser tab, and can also listen
                  to the interviewer&apos;s follow-up questions.
                </p>
              </div>
            </div>

            {/* Sample answer */}
            <div className="rounded-2xl bg-[#1e2d3d] text-gray-100 shadow-2xl overflow-hidden border border-white/10">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-semibold text-[#4fc3f7]">Ghost · Coding</span>
              </div>
              <div className="p-5 space-y-4 text-sm leading-relaxed">
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Problem:</span> Two Sum. Return indices of the two numbers
                  that add up to the target.
                </p>
                <p>
                  <span className="font-semibold text-[#4fc3f7]">Approach:</span> one pass with a hash map. For each
                  number, check if its complement is already stored.
                </p>
                <pre className="overflow-x-auto rounded-lg bg-black/30 p-3 text-[13px] leading-relaxed font-mono text-emerald-200">
                  {sample}
                </pre>
                <p>
                  <span className="font-semibold text-[#4fc3f7]">Complexity:</span> O(n) time, O(n) space.
                </p>
                <p>
                  <span className="font-semibold text-[#4fc3f7]">Edge cases:</span> duplicates, negative numbers, no
                  valid pair.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How Ghost works in a coding round
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              ["Open Ghost before the round", "Sign in, pick your language, and join the call as normal. Ghost floats on top, hidden from screen share."],
              ["Screenshot the problem", "When the question appears, take a screenshot. Ghost reads it straight off your screen."],
              ["Explain and code", "Get the approach, code, complexity and edge cases in seconds, then walk the interviewer through it in your own words."],
            ].map(([title, desc], i) => (
              <li key={title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-sky-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-5 shadow-md">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-gradient-to-b from-sky-50 via-sky-100 to-sky-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Built for technical interviews
          </h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-12">
            Everything you need to solve the problem and explain it well.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {capabilities.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                  <Icon icon={c.icon} size={20} className={c.color} />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rounds */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Works for every kind of technical round</h2>
          <div className="space-y-8">
            {rounds.map((r) => (
              <div key={r.title}>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{r.title}</h3>
                <p className="text-gray-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-gray-600 leading-relaxed">
            Interviewing for a non-technical round too? See the{" "}
            <Link href="/ai-interview-assistant" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              AI interview assistant
            </Link>{" "}
            for behavioural and HR questions.
          </p>
        </div>
      </section>

      {/* Demo */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">See Ghost in action</h2>
          <DemoVideo />
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">Pay per question, not per month</h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              A screenshot costs 2 credits and a text question 1 credit. A typical coding round with a few problems and
              follow-ups uses about 30 to 50 credits.
            </p>
            <p>
              You start with <strong className="text-gray-900">20 free credits</strong>, and packs start at{" "}
              <strong className="text-gray-900">$10 for 200 credits</strong>, with no subscription. See how that
              compares in our{" "}
              <Link href="/blog/best-ai-interview-copilot" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
                AI interview copilot price comparison
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Frequently asked questions</h2>
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-gray-900">
                  <h3>{f.q}</h3>
                  <span className="text-sky-500 text-2xl leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-400 to-sky-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Try the AI coding interview assistant free</h2>
          <p className="text-white/85 mb-8 max-w-lg mx-auto">20 free credits, every feature unlocked. No card, no subscription.</p>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 bg-white text-gray-800 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Download Ghost
            <Icon icon={ArrowRight02Icon} size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
