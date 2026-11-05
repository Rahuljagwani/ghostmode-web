import { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

const URL = "https://renekin.com/final-round-ai-alternative";

// Final Round AI prices read from finalroundai.com/subscription-simple on Nov 6, 2026 (visitor view,
// before any sign-in discount). Recheck before editing: they have changed several times this year.
export const metadata: Metadata = {
  title: { absolute: "Best Final Round AI Alternative (2026): Ghost vs Final Round" },
  description:
    "Ghost is a Final Round AI alternative with live interview answers on the free plan and $10 one-time credit packs instead of a $150 monthly subscription.",
  keywords: [
    "Final Round AI alternative",
    "Final Round AI alternatives",
    "Ghost vs Final Round AI",
    "cheaper Final Round AI alternative",
    "free Final Round AI alternative",
    "Final Round AI pricing",
    "AI interview copilot",
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: "Best Final Round AI Alternative (2026): Ghost vs Final Round",
    description: "Live answers on the free plan, no subscription. Compare Ghost and Final Round AI side by side.",
    images: ["/opengraph-image"],
  },
};

const rows: [string, string, string][] = [
  ["Live answers on the free plan", "Yes, 20 free credits with every feature", "No. The free plan has no live copilot, and there's no free trial"],
  ["Cheapest way to use it in a real interview", "$10 once (200 credits, about 3–4 interviews)", "$150 for one month, or $250 a quarter, or $300 a year upfront"],
  ["Pricing model", "One-time credit packs that never auto-renew", "Subscription: monthly, quarterly or yearly"],
  ["Refunds", "Credits are non-refundable, but every feature can be tried free first", "Monthly plan non-refundable; 72-hour guarantee on first quarterly or yearly purchase"],
  ["Hidden from screen share", "Yes, on every plan including free", "Stealth mode on paid plans"],
  ["Reads your screen", "Yes, screenshot coding problems, slides and diagrams", "Yes (Screen Help)"],
  ["Uses your resume and job description", "Yes", "Yes"],
  ["AI mock interviews", "No built-in mock interviewer; free prep tools on the website", "Yes, practice interviews in 8 scenarios"],
  ["Platforms", "macOS 12+ and Windows 10+", "macOS 14.4+ and Windows"],
];

const faqs: Faq[] = [
  {
    q: "What is the best Final Round AI alternative?",
    a: "For live interview help on a budget, Ghost by Renekin AI is a strong Final Round AI alternative. Its free plan includes live answers, and paid use starts with a $10 one-time credit pack instead of a subscription. It runs on macOS and Windows.",
  },
  {
    q: "How much does Final Round AI cost?",
    a: "As of November 2026, Final Round AI's plan page lists a free plan without the live copilot, a Monthly plan at $150 a month, a Quarterly plan at $83.33 a month billed quarterly, and a Yearly plan at $25 a month billed annually. Signed-in users may see a discount. Check finalroundai.com for current prices.",
  },
  {
    q: "Is there a free alternative to Final Round AI?",
    a: "Ghost gives every new account 20 free credits with every feature unlocked, including live answers and staying hidden from screen share, so you can use it in a real interview before paying anything. No card is needed.",
  },
  {
    q: "Is there a cheaper alternative to Final Round AI?",
    a: "Yes. If you have a few interviews coming up, Ghost's $10 pack covers about 3 to 4 and its $19 pack about 7, paid once. Final Round AI's monthly plan is $150, and its lower monthly rates require paying for 3 or 12 months upfront.",
  },
  {
    q: "Is Ghost hidden from screen share like Final Round AI?",
    a: "Yes. Ghost's window is excluded from screen capture on macOS and Windows, so it doesn't appear when you share your screen in Zoom, Google Meet or Microsoft Teams, or in screen recordings. This is included on every plan, including free.",
  },
  {
    q: "When is Final Round AI a better choice than Ghost?",
    a: "If you want built-in AI mock interviews and automatic debriefs, and you'll use it heavily for a year, Final Round AI's yearly plan can be good value. If you need live help for a handful of interviews without a subscription, Ghost is the better fit.",
  },
];

export default function FinalRoundAiAlternativePage() {
  return (
    <div className="-mt-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-12 sm:pb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/85 mb-4">Final Round AI alternative</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-sm text-balance">
            Live interview help without a $150 subscription.
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Ghost by Renekin AI is a Final Round AI alternative that gives you live answers on the free plan, then
            charges once for credits instead of a monthly subscription.
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
              Final Round AI&apos;s free plan doesn&apos;t include its live copilot, and its{" "}
              <strong className="text-gray-900">Monthly plan is $150</strong> (non-refundable). Ghost includes live
              answers on the <strong className="text-gray-900">free plan</strong>, and paid use starts at{" "}
              <strong className="text-gray-900">$10, paid once</strong>. If you have a few interviews coming up,
              Ghost is the cheaper way to get live help. If you want built-in mock interviews and will use them all
              year, Final Round AI&apos;s yearly plan is worth a look.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Ghost vs Final Round AI</h2>
          <div className="-mx-4 sm:mx-0 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px] sm:text-base">
              <thead>
                <tr className="border-b-2 border-gray-200 text-gray-900">
                  <th className="py-3 pl-4 pr-2 font-semibold w-[28%]" />
                  <th className="py-3 px-3 font-semibold bg-sky-50 text-sky-800">Ghost</th>
                  <th className="py-3 pl-3 pr-4 font-semibold">Final Round AI</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, ghost, finalRound]) => (
                  <tr key={label} className="border-t border-gray-100 align-top">
                    <td className="py-3 pl-4 pr-3 font-semibold text-gray-900">{label}</td>
                    <td className="py-3 px-3 bg-sky-50/60 text-gray-800">{ghost}</td>
                    <td className="py-3 pl-3 pr-4 text-gray-600">{finalRound}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Final Round AI prices and plan details are from{" "}
            <a
              href="https://www.finalroundai.com/subscription-simple"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="underline"
            >
              Final Round AI&apos;s plan page
            </a>{" "}
            as of November 2026, before any sign-in discount, and may change.
          </p>
        </div>
      </section>

      {/* Why switch */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Why people look for a Final Round AI alternative</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trying it shouldn&apos;t require a subscription</h3>
              <p className="text-gray-600 leading-relaxed">
                Final Round AI&apos;s free plan covers interview prep but not live help, so the first real interview
                means subscribing. With Ghost, your 20 free credits work in a live interview straight away.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Job hunts are bursty</h3>
              <p className="text-gray-600 leading-relaxed">
                Most people have a few interviews close together, then none for months. Paying $150 for a month, or
                committing to 3 or 12 months upfront, fits that poorly. Credits you buy once and use when you need them
                fit it far better.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Built for the interview itself</h3>
              <p className="text-gray-600 leading-relaxed">
                Ghost has answer styles for behavioral (STAR), technical and coding rounds, reads coding problems from a
                screenshot, and uses your resume and the job description so answers sound like you. It runs on Macs
                from macOS 12, not just the newest versions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost example */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">What live help for 5 interviews costs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="text-sm font-semibold text-gray-500 mb-1">Final Round AI, live copilot</p>
              <p className="text-4xl font-bold text-gray-900">$150</p>
              <p className="text-sm text-gray-500 mt-2">Monthly plan, one month, non-refundable</p>
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
            </Link>
            , the{" "}
            <Link href="/cluely-alternative" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              Cluely alternative
            </Link>{" "}
            and{" "}
            <Link href="/lockedin-ai-alternative" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              LockedIn AI alternative
            </Link>{" "}
            pages, or how Ghost works as a{" "}
            <Link href="/ai-interview-assistant" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              real-time AI interview assistant
            </Link>
            .
          </p>
        </div>
      </section>

      {/* When Final Round fits */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">When Final Round AI might suit you better</h2>
          <p className="text-gray-600 leading-relaxed">
            If you want built-in AI mock interviews across many scenarios, automatic debriefs after each session, and
            you&apos;ll use it heavily for a year, Final Round AI&apos;s yearly plan can be good value. Ghost doesn&apos;t
            have a built-in mock interviewer yet; you can prepare with our{" "}
            <Link href="/tools" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              free interview tools
            </Link>{" "}
            instead. If you need live help for a handful of interviews without a subscription, Ghost is built for that.
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Switch from Final Round AI in 2 minutes</h2>
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
