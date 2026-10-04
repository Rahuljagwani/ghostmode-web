import { Metadata } from "next";
import Link from "next/link";
import DemoVideo from "@/components/DemoVideo";
import Icon from "@/components/Icon";
import {
  ArrowRight02Icon,
  Mic01Icon,
  EyeIcon,
  Brain01Icon,
  ViewOffIcon,
  MonitorDotIcon,
  FlashIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

const URL = "https://renekin.com/ai-interview-assistant";

export const metadata: Metadata = {
  title: { absolute: "AI Interview Assistant for Real-Time Answers | Ghost by Renekin AI" },
  description:
    "Ghost is an AI interview assistant that listens to the question, reads your screen and suggests answers in seconds. Works with Zoom, Meet and Teams on Mac and Windows.",
  keywords: [
    "AI interview assistant",
    "real-time interview assistant",
    "AI interview helper",
    "AI assistant for interviews",
    "AI interview copilot",
    "interview assistant app",
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: "AI Interview Assistant for Real-Time Answers | Ghost",
    description:
      "Listens to the question, reads your screen and suggests answers in seconds. Hidden from screen share. Mac and Windows.",
    images: ["/opengraph-image"],
  },
};

const capabilities: { icon: IconSvgElement; title: string; desc: string; color: string; bg: string }[] = [
  {
    icon: Mic01Icon,
    title: "Hears the question",
    desc: "Live transcription of the interviewer. On headphones, Ghost captures system audio so it hears the call clearly.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: EyeIcon,
    title: "Reads your screen",
    desc: "Screenshot a coding problem, a slide or a diagram and get a structured answer in seconds.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Brain01Icon,
    title: "Knows your story",
    desc: "Add your resume and the job description, and answers are tailored to your experience and the role.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: ViewOffIcon,
    title: "Hidden from screen share",
    desc: "Ghost's window is excluded from screen capture, so it doesn't appear in Zoom, Google Meet, Teams or recordings.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: MonitorDotIcon,
    title: "Always on top",
    desc: "A small floating window that stays above every app, including fullscreen calls, and out of your way.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: FlashIcon,
    title: "Easy to scan",
    desc: "Answers come formatted as points and code you can glance at quickly, then say in your own words.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const useCases: { title: string; desc: string }[] = [
  {
    title: "Coding interviews",
    desc: "Screenshot the problem and get an approach, the code and the time and space complexity, so you can explain your thinking clearly.",
  },
  {
    title: "Technical interviews",
    desc: "Questions on system design, databases, networking or your framework of choice, answered with the key points to cover.",
  },
  {
    title: "HR and behavioral interviews",
    desc: "\"Tell me about yourself\", \"Why this company?\" and STAR-style stories built from your own resume.",
  },
  {
    title: "Mock interview practice",
    desc: "Practise with a friend or on your own and see how a strong answer is structured before the real thing.",
  },
  {
    title: "Meetings and presentations",
    desc: "Client calls, stand-ups and demos. Get context and facts in the moment when someone asks a hard question.",
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "What is an AI interview assistant?",
    a: "An AI interview assistant is an app that helps you during a live or practice interview. It transcribes the interviewer's question and suggests a relevant, structured answer in real time, so you can respond clearly and confidently.",
  },
  {
    q: "How does Ghost work during an interview?",
    a: "Open Ghost before your call. It floats on top of your screen, listens to the question or takes a screenshot when you ask it to, and shows a suggested answer in a few seconds, based on the question, your screen and the resume or notes you added.",
  },
  {
    q: "Does Ghost work with Zoom, Google Meet and Microsoft Teams?",
    a: "Yes. Ghost is a desktop app, so it works alongside any video call app, including Zoom, Google Meet, Microsoft Teams and browser-based interview platforms.",
  },
  {
    q: "Will the interviewer see Ghost when I share my screen?",
    a: "No. Ghost's window is excluded from screen capture on macOS and Windows, so it doesn't show up when you share your screen or record it.",
  },
  {
    q: "Which operating systems are supported?",
    a: "Ghost runs on macOS 12 or later and Windows 10 (version 2004) or later.",
  },
  {
    q: "How much does Ghost cost?",
    a: "Every new account gets 20 free credits. After that, credit packs start at $10 for 200 credits, with no subscription. A text question costs 1 credit, a screenshot 2 and a voice question 3, and a typical interview uses about 50 to 60 credits.",
  },
  {
    q: "Does Ghost store my interviews?",
    a: "No. AI queries are not stored beyond your active session, and we never sell your personal information.",
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
      { "@type": "ListItem", position: 2, name: "AI Interview Assistant", item: URL },
    ],
  },
];

export default function AiInterviewAssistantPage() {
  return (
    <div className="-mt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-12 sm:pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-sm text-balance">
            AI Interview Assistant
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Ghost listens to the interviewer, reads your screen and suggests clear answers in seconds,
            for coding, technical and HR rounds. Hidden from screen share on Mac and Windows.
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

      {/* What it is */}
      <section className="bg-gradient-to-b from-sky-100 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
          <DemoVideo />
          <div className="max-w-3xl mx-auto mt-14 sm:mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              What is an AI interview assistant?
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                An AI interview assistant is an app that sits beside your video call and helps you answer.
                It hears the question, understands the context and gives you the key points of a strong
                answer while you&apos;re still listening.
              </p>
              <p>
                <strong className="text-gray-900">Ghost</strong> is built for exactly that moment. It&apos;s
                a small floating window on your desktop: it transcribes the interviewer, can read a coding
                problem or slide straight off your screen, and uses your resume and the job description so
                the answers sound like you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How Ghost works in an interview
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              ["Add your context", "Download Ghost, sign in and add your resume, the job description and any notes."],
              ["Join your call", "Start Zoom, Google Meet or Teams as normal. Ghost floats on top, hidden from screen share."],
              ["Get the answer", "Let it listen, take a screenshot, or type a question. Suggested answers appear in seconds."],
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
            Everything you need in the moment
          </h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-12">
            One small window that hears, sees and remembers your context.
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

      {/* Use cases */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            Built for every round
          </h2>
          <div className="space-y-8">
            {useCases.map((u) => (
              <div key={u.title}>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{u.title}</h3>
                <p className="text-gray-600 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            Pay per question, not per month
          </h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              Most AI interview tools charge a monthly subscription, even though most people only interview
              a few times a year. Ghost uses credits instead: a text question is 1 credit, a screenshot 2 and
              a voice question 3. A typical interview uses about 50 to 60 credits.
            </p>
            <p>
              You start with <strong className="text-gray-900">20 free credits</strong>, and packs start at{" "}
              <strong className="text-gray-900">$10 for 200 credits</strong>. On the largest pack that&apos;s
              about $2 per interview. See how that compares in our{" "}
              <Link href="/blog/best-ai-interview-copilot" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
                AI interview copilot price comparison
              </Link>
              , or view all <Link href="/pricing" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">plans and pricing</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            Frequently asked questions
          </h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Try the AI interview assistant free
          </h2>
          <p className="text-white/85 mb-8 max-w-lg mx-auto">
            20 free credits, every feature unlocked. No card, no subscription.
          </p>
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
