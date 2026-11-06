import { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

const URL = "https://renekin.com/lockedin-ai-alternative";

// LockedIn AI prices read from lockedinai.com/pricing on Nov 6, 2026. The site only showed rupees (visitor
// in India), with a "LOCKIN50" 50%-off code applied automatically, and exposes no USD prices; dollar figures
// are converted at the ECB rate that day (₹94.48 = $1) and labelled approximate. Rupee source figures:
// Credits ₹12,426/mo regular, ₹6,213/mo promo, ₹4,437.67/mo billed quarterly; Unlimited ₹24,848/mo regular;
// Lifetime ₹89,565.50 promo. Free plan from lockedinai.com/ai-copilot, refunds from
// lockedinai.com/refund-policy. Recheck before editing: their prices change often.
export const metadata: Metadata = {
  title: { absolute: "Best LockedIn AI Alternative (2026): Ghost vs LockedIn AI" },
  description:
    "Ghost is a LockedIn AI alternative for interviews with no subscription: 20 free credits, then one-time credit packs from $10 that never auto-renew.",
  keywords: [
    "LockedIn AI alternative",
    "LockedIn AI alternatives",
    "Ghost vs LockedIn AI",
    "cheaper LockedIn AI alternative",
    "LockedIn AI pricing",
    "AI interview copilot",
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: "Best LockedIn AI Alternative (2026): Ghost vs LockedIn AI",
    description: "No subscription: pay once for credits. Compare Ghost and LockedIn AI side by side.",
    images: ["/opengraph-image"],
  },
};

const rows: [string, string, string][] = [
  ["Pricing model", "One-time credit packs that never auto-renew", "Subscription (monthly or every 3 months), or a one-time Lifetime plan"],
  ["Cheapest paid option", "$10 once (200 credits, about 3–4 interviews)", "About $66 for one month of Credits with a 50% promo; about $132 regular"],
  ["Free plan", "20 credits with every feature unlocked", "10 minutes of live interview help"],
  ["Refunds", "Credits are non-refundable, but every feature can be tried free first", "Monthly and 3-month plans non-refundable once started; Lifetime within 7 days if unused"],
  ["Hidden from screen share", "Yes, on every plan including free", "Yes, stealth mode on supported desktop apps"],
  ["Reads your screen", "Yes, screenshot coding problems, slides and diagrams", "Yes, coding and online assessment help"],
  ["Uses your resume and job description", "Yes", "Yes"],
  ["AI mock interviews", "No built-in mock interviewer; free prep tools on the website", "Yes, at half the credit rate"],
  ["Platforms", "macOS 12+ and Windows 10+", "macOS 13.1+, Windows 10+, web, iOS and Android"],
];

const faqs: Faq[] = [
  {
    q: "What is the best LockedIn AI alternative?",
    a: "If you want live interview help without a subscription, Ghost by Renekin AI is a strong LockedIn AI alternative. You start with 20 free credits, then buy one-time credit packs from $10 that never auto-renew. It runs on macOS and Windows.",
  },
  {
    q: "How much does LockedIn AI cost?",
    a: "On November 6, 2026, LockedIn AI's pricing page listed the Credits plan at about $132 a month regular, about $66 a month with a 50% promo code, or about $47 a month billed every 3 months. Unlimited was about $263 a month regular, and Lifetime about $948 with the promo. These are converted from the prices LockedIn AI showed us in rupees; prices vary by country and promotion, so check lockedinai.com for yours.",
  },
  {
    q: "Is there a cheaper alternative to LockedIn AI?",
    a: "Yes, if you have a few interviews coming up. Ghost's $10 pack covers about 3 to 4 interviews and its $19 pack about 7, paid once. LockedIn AI's cheapest single month of Credits was about $66 with its current promo.",
  },
  {
    q: "Does Ghost need a subscription?",
    a: "No. You buy credits once and use them when you need them: 1 credit for a text question, 2 for a screenshot and 3 for a voice question. Every new account starts with 20 free credits, and there's nothing to cancel.",
  },
  {
    q: "Is Ghost hidden from screen share like LockedIn AI?",
    a: "Yes. Ghost's window is excluded from screen capture on macOS and Windows, so it doesn't appear when you share your screen in Zoom, Google Meet or Microsoft Teams, or in screen recordings. This is included on every plan, including free.",
  },
  {
    q: "When is LockedIn AI a better choice than Ghost?",
    a: "If you need help on your phone, a human helper who can see your session, online assessment help, built-in mock interviews or career tools like a resume builder, LockedIn AI covers more ground. If you want focused live help on your computer for a handful of interviews, without a subscription, Ghost is the better fit.",
  },
];

export default function LockedInAiAlternativePage() {
  return (
    <div className="-mt-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-12 sm:pb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/85 mb-4">LockedIn AI alternative</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-sm text-balance">
            Pay once for interview help. No subscription.
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Ghost by Renekin AI is a LockedIn AI alternative built for live interviews. Start with 20 free credits,
            then buy credits once when you need them, with nothing to cancel.
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
              LockedIn AI is a broad career suite sold as a{" "}
              <strong className="text-gray-900">subscription</strong>: its Credits plan lists at{" "}
              <strong className="text-gray-900">about $132 a month</strong>, about half that with its
              current promo. Ghost focuses on live interview help on your computer and costs{" "}
              <strong className="text-gray-900">$10 to $28, paid once</strong>. If you have a few interviews coming
              up, Ghost is the simpler, cheaper choice. If you want phone apps, a human helper and career tools in one
              place, LockedIn AI covers more.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Ghost vs LockedIn AI</h2>
          <div className="-mx-4 sm:mx-0 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px] sm:text-base">
              <thead>
                <tr className="border-b-2 border-gray-200 text-gray-900">
                  <th className="py-3 pl-4 pr-2 font-semibold w-[28%]" />
                  <th className="py-3 px-3 font-semibold bg-sky-50 text-sky-800">Ghost</th>
                  <th className="py-3 pl-3 pr-4 font-semibold">LockedIn AI</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, ghost, lockedIn]) => (
                  <tr key={label} className="border-t border-gray-100 align-top">
                    <td className="py-3 pl-4 pr-3 font-semibold text-gray-900">{label}</td>
                    <td className="py-3 px-3 bg-sky-50/60 text-gray-800">{ghost}</td>
                    <td className="py-3 pl-3 pr-4 text-gray-600">{lockedIn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            LockedIn AI prices are from{" "}
            <a href="https://www.lockedinai.com/pricing" target="_blank" rel="nofollow noopener noreferrer" className="underline">
              LockedIn AI&apos;s pricing page
            </a>{" "}
            on November 6, 2026. The site showed us local prices, so dollar amounts are approximate conversions at that
            day&apos;s exchange rate and US prices may differ. Prices also vary with promotions and may change. Refund
            terms are from LockedIn AI&apos;s{" "}
            <a href="https://www.lockedinai.com/refund-policy" target="_blank" rel="nofollow noopener noreferrer" className="underline">
              refund policy
            </a>
            .
          </p>
        </div>
      </section>

      {/* Why switch */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Why people look for a LockedIn AI alternative</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">A subscription for a few weeks of interviews</h3>
              <p className="text-gray-600 leading-relaxed">
                Most job hunts are a few intense weeks, then nothing for months. A monthly or 3-month subscription
                keeps billing after the interviews stop. Ghost&apos;s credits are bought once, with nothing to cancel.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Try it properly before paying</h3>
              <p className="text-gray-600 leading-relaxed">
                LockedIn AI&apos;s monthly and 3-month plans can&apos;t be refunded once started, and its free plan
                gives 10 minutes of live help. Ghost&apos;s credits aren&apos;t refundable either, but 20 free credits
                unlock every feature, so you can test it in a real interview before spending $10 or more.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Focused on the interview itself</h3>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">What live help for 5 interviews costs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="text-sm font-semibold text-gray-500 mb-1">LockedIn AI, Credits plan</p>
              <p className="text-4xl font-bold text-gray-900">~$66</p>
              <p className="text-sm text-gray-500 mt-2">
                One month with the current 50% promo (about $132 regular), non-refundable once started
              </p>
            </div>
            <div className="rounded-2xl border-2 border-sky-400 bg-sky-50 p-6">
              <p className="text-sm font-semibold text-sky-700 mb-1">Ghost, live answers</p>
              <p className="text-4xl font-bold text-gray-900">$19</p>
              <p className="text-sm text-gray-600 mt-2">Popular pack: 450 credits, enough for about 7 interviews, paid once</p>
            </div>
          </div>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Comparing more tools? See our{" "}
            <Link href="/blog/best-ai-interview-copilot" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              comparison of 6 AI interview copilots
            </Link>
            , the{" "}
            <Link href="/final-round-ai-alternative" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              Final Round AI alternative
            </Link>{" "}
            and{" "}
            <Link href="/cluely-alternative" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              Cluely alternative
            </Link>{" "}
            pages, or how Ghost works as a{" "}
            <Link href="/ai-interview-assistant" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              real-time AI interview assistant
            </Link>
            .
          </p>
        </div>
      </section>

      {/* When LockedIn fits */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">When LockedIn AI might suit you better</h2>
          <p className="text-gray-600 leading-relaxed">
            LockedIn AI covers more ground: phone apps for iPhone and Android, a human helper who can see your session,
            online assessment help, built-in mock interviews, and career tools like a resume builder and cover letter
            generator. If you want all of that in one subscription, it may suit you better. Ghost doesn&apos;t have a
            built-in mock interviewer yet; you can prepare with our{" "}
            <Link href="/tools" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              free interview tools
            </Link>{" "}
            instead. If you want focused live help on your computer for a handful of interviews, without a
            subscription, Ghost is built for that.
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Switch from LockedIn AI in 2 minutes</h2>
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
