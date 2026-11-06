import { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

const URL = "https://renekin.com/parakeet-ai-alternative";

// ParakeetAI prices, credit rules, free trial and refund terms read from parakeet-ai.com (pricing section
// and billing FAQ) on Nov 6, 2026. US dollar prices come from the site's own price data (planPrices.USD),
// not a conversion: 1 credit $25, 3 for $39, 8 for $78, 15 for $117; unlimited $52/week, $99.90/month,
// $399.90/year. Recheck before editing.
// Ghost per-interview cost: a typical interview uses 50 to 60 credits (pricing page FAQ).
export const metadata: Metadata = {
  title: { absolute: "Parakeet AI Alternative (2026): Ghost vs Parakeet AI" },
  description:
    "Ghost is a Parakeet AI alternative for interviews that costs about $2 to $3 per interview, with 20 free credits and one-time packs that never expire.",
  keywords: [
    "Parakeet AI alternative",
    "ParakeetAI alternative",
    "Parakeet AI alternatives",
    "Ghost vs Parakeet AI",
    "cheaper Parakeet AI alternative",
    "Parakeet AI pricing",
    "AI interview assistant",
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: "Parakeet AI Alternative (2026): Ghost vs Parakeet AI",
    description: "About $2 to $3 per interview, credits that never expire. Compare Ghost and Parakeet AI side by side.",
    images: ["/opengraph-image"],
  },
};

const rows: [string, string, string][] = [
  ["How you pay", "Per question: 1 credit for text, 2 for a screenshot, 3 for voice", "Per call time: 0.5 credit for every 30 minutes, or an unlimited subscription"],
  ["Cost of a typical 1-hour interview", "About $2 to $3 (50 to 60 credits)", "1 credit: $7.80 to $25, depending on pack size"],
  ["Smallest purchase", "$10 for 200 credits (about 3–4 interviews)", "$25 for 1 credit, or $39 for 3"],
  ["Free trial", "20 credits with every feature unlocked", "10 sessions of up to 10 minutes each, plus 1 free mock interview"],
  ["Credits expire", "Never", "Never"],
  ["Refunds", "Credits are non-refundable, but every feature can be tried free first", "7 days for unused purchases; 28 days for an unused renewal"],
  ["Hidden from screen share", "Yes, on every plan including free", "Yes, privacy mode"],
  ["AI mock interviews", "No built-in mock interviewer; free prep tools on the website", "Yes, first one free"],
  ["Platforms", "Desktop app: macOS 12+ and Windows 10+", "Desktop app (Mac and Windows), Chrome, and a phone web app"],
];

const faqs: Faq[] = [
  {
    q: "What is the best Parakeet AI alternative?",
    a: "If you want to pay less per interview, Ghost by Renekin AI is a strong Parakeet AI alternative. A typical interview costs about $2 to $3 in credits, you start with 20 free credits, and credits never expire. It runs as a desktop app on macOS and Windows.",
  },
  {
    q: "How much does Parakeet AI cost?",
    a: "As of November 2026, ParakeetAI lists credit packs of 3 credits for $39, 8 for $78 and 15 for $117, or a single credit for $25. One credit covers an hour of call time. Unlimited plans are $52 a week, $99.90 a month or $399.90 a year. Check parakeet-ai.com for current prices.",
  },
  {
    q: "Is Ghost cheaper than Parakeet AI?",
    a: "For most interviews, yes. Ghost charges per question rather than per minute, and a typical interview uses 50 to 60 credits, about $2 to $3 on the $10 pack and less on larger packs. A 1-hour ParakeetAI session costs 1 credit, which costs $7.80 to $25 depending on the pack.",
  },
  {
    q: "Do Ghost credits expire?",
    a: "No. Like ParakeetAI's credits, Ghost credits never expire, so you can buy once and use them across interview seasons.",
  },
  {
    q: "Is Ghost hidden from screen share like Parakeet AI?",
    a: "Yes. Ghost's window is excluded from screen capture on macOS and Windows, so it doesn't appear when you share your screen in Zoom, Google Meet or Microsoft Teams, or in screen recordings. This is included on every plan, including free.",
  },
  {
    q: "When is Parakeet AI a better choice than Ghost?",
    a: "If you want to use it in a browser or on your phone, want built-in mock interviews or system design diagrams, or value a refund window for unused purchases, ParakeetAI covers more. If you want the lowest cost per interview in a desktop app, Ghost is the better fit.",
  },
];

export default function ParakeetAiAlternativePage() {
  return (
    <div className="-mt-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-12 sm:pb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/85 mb-4">Parakeet AI alternative</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-sm text-balance">
            Interview help for about $2 to $3 an interview.
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Ghost by Renekin AI is a Parakeet AI alternative that charges per question, not per minute, so a typical
            interview costs a few dollars. Credits never expire.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 bg-white text-gray-800 px-7 py-3.5 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Try Ghost free
              <Icon icon={ArrowRight02Icon} size={20} />
            </Link>
            <Link href="/pricing" className="text-white/90 hover:text-white font-medium transition-colors">
              See pricing
            </Link>
          </div>
          <p className="mt-5 text-sm font-medium text-white/85">20 free credits · macOS &amp; Windows · No subscription</p>
        </div>
      </section>

      {/* Short answer */}
      <section className="bg-gradient-to-b from-sky-100 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-14 sm:pb-16">
          <div className="rounded-2xl border border-sky-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">The short answer</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              ParakeetAI and Ghost both sell credits that never expire, but they count differently. ParakeetAI charges
              for call time: <strong className="text-gray-900">1 credit per hour</strong>, which costs{" "}
              <strong className="text-gray-900">$7.80 to $25</strong>. Ghost charges per
              question, so a typical interview costs <strong className="text-gray-900">about $2 to $3</strong>. If
              you want the lowest cost per interview, Ghost is cheaper. If you want browser and phone access or
              built-in mock interviews, ParakeetAI covers more.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Ghost vs Parakeet AI</h2>
          <div className="-mx-4 sm:mx-0 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px] sm:text-base">
              <thead>
                <tr className="border-b-2 border-gray-200 text-gray-900">
                  <th className="py-3 pl-4 pr-2 font-semibold w-[28%]" />
                  <th className="py-3 px-3 font-semibold bg-sky-50 text-sky-800">Ghost</th>
                  <th className="py-3 pl-3 pr-4 font-semibold">Parakeet AI</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, ghost, parakeet]) => (
                  <tr key={label} className="border-t border-gray-100 align-top">
                    <td className="py-3 pl-4 pr-3 font-semibold text-gray-900">{label}</td>
                    <td className="py-3 px-3 bg-sky-50/60 text-gray-800">{ghost}</td>
                    <td className="py-3 pl-3 pr-4 text-gray-600">{parakeet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            ParakeetAI prices, credit rules, free trial and refund terms are from{" "}
            <a href="https://www.parakeet-ai.com/" target="_blank" rel="nofollow noopener noreferrer" className="underline">
              ParakeetAI&apos;s website
            </a>{" "}
            as of November 2026, in US dollars, and may change. Ghost&apos;s per-interview cost assumes a typical
            interview uses 50 to 60 credits.
          </p>
        </div>
      </section>

      {/* Why switch */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Why people look for a Parakeet AI alternative</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Paying for minutes, not answers</h3>
              <p className="text-gray-600 leading-relaxed">
                Interviews include introductions, your own talking and the interviewer&apos;s pitch, and minute-based
                pricing charges for all of it. Ghost only charges when you ask it something, so quiet stretches cost
                nothing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">A longer free try</h3>
              <p className="text-gray-600 leading-relaxed">
                ParakeetAI&apos;s free sessions last up to 10 minutes each. Ghost&apos;s 20 free credits aren&apos;t
                timed: a session stays open as long as you like, and you spend credits only on the questions you need
                help with.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Built for interview rounds</h3>
              <p className="text-gray-600 leading-relaxed">
                Ghost has answer styles for behavioral (STAR), technical and coding rounds, reads coding problems from a
                screenshot, and uses your resume and the job description so answers sound like you. It also runs on
                Macs from macOS 12.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost example */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">What 5 one-hour interviews cost</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="text-sm font-semibold text-gray-500 mb-1">ParakeetAI, credit pack</p>
              <p className="text-4xl font-bold text-gray-900">$78</p>
              <p className="text-sm text-gray-500 mt-2">The 8-credit pack, the cheapest way to cover 5 hours</p>
            </div>
            <div className="rounded-2xl border-2 border-sky-400 bg-sky-50 p-6">
              <p className="text-sm font-semibold text-sky-700 mb-1">Ghost, live answers</p>
              <p className="text-4xl font-bold text-gray-900">$19</p>
              <p className="text-sm text-gray-600 mt-2">Popular pack: 450 credits, enough for about 7 interviews</p>
            </div>
          </div>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Comparing more tools? See our{" "}
            <Link href="/blog/best-ai-interview-copilot" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              comparison of 6 AI interview copilots
            </Link>{" "}
            and the{" "}
            <Link href="/final-round-ai-alternative" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              Final Round AI
            </Link>
            ,{" "}
            <Link href="/lockedin-ai-alternative" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              LockedIn AI
            </Link>
            ,{" "}
            <Link href="/interview-coder-alternative" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              Interview Coder
            </Link>{" "}
            and{" "}
            <Link href="/cluely-alternative" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              Cluely
            </Link>{" "}
            alternative pages.
          </p>
        </div>
      </section>

      {/* When Parakeet fits */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">When Parakeet AI might suit you better</h2>
          <p className="text-gray-600 leading-relaxed">
            ParakeetAI works in Chrome and on your phone as well as a desktop app, has built-in mock interviews and
            system design diagrams, supports over 50 languages, and gives refunds within 7 days for unused purchases.
            If those matter most, it may suit you better. Ghost doesn&apos;t have a built-in mock interviewer yet; you
            can prepare with our{" "}
            <Link href="/tools" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              free interview tools
            </Link>{" "}
            instead. If you want the lowest cost per interview in a desktop app, Ghost is built for that.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-4 sm:px-6 pb-16 sm:pb-20 pt-2">
        <FaqSection faqs={faqs} />
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-400 to-sky-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Switch from Parakeet AI in 2 minutes</h2>
          <p className="text-white/85 mb-8 max-w-lg mx-auto">
            Download Ghost, sign in, add your resume, and you&apos;re ready. 20 free credits, no card needed.
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
