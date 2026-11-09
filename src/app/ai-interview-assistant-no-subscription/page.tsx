import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

const URL = "https://renekin.com/ai-interview-assistant-no-subscription";

// Competitor prices are the same figures, sources and dates as the comparison pages (recheck there first):
// - Final Round AI: $150/month or $250/quarter, finalroundai.com/subscription-simple, Nov 6, 2026.
// - LockedIn AI: Credits plan about $132/month regular, about $66 with the 50% promo, converted from rupees at
//   the Nov 6, 2026 ECB rate (see lockedin-ai-alternative/page.tsx).
// - Interview Coder: $299/month Monthly Pro, interviewcoder.co, November 2026.
// - ParakeetAI: 1 credit = 1 hour of call time; $25 for 1, $39 for 3, $78 for 8, $117 for 15; parakeet-ai.com,
//   Nov 6, 2026.
// Ghost: a typical interview uses 50 to 60 credits (pricing page FAQ). Packs $10/200, $19/450, $28/750.
// Products we could not verify from an official pricing page are not named here.
export const metadata: Metadata = {
  title: { absolute: "AI Interview Assistant With No Subscription (2026 Pricing Compared)" },
  description:
    "Compare how AI interview assistants charge: monthly plans, per-hour credits, your own API key, or pay-as-you-go credits. See what 3 and 10 interviews really cost.",
  keywords: [
    "AI interview assistant no subscription",
    "AI interview copilot without subscription",
    "pay as you go AI interview assistant",
    "AI interview assistant one-time payment",
    "cheap AI interview assistant",
    "AI interview assistant pricing",
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: "AI Interview Assistant With No Subscription (2026 Pricing Compared)",
    description: "Monthly plans vs per-hour credits vs pay-as-you-go. What 3 and 10 interviews really cost.",
    images: ["/opengraph-image"],
  },
};

const models: { name: string; how: string; examples: string; good: string; watch: string }[] = [
  {
    name: "Monthly subscription",
    how: "A fixed fee every month, whether or not you have interviews.",
    examples: "Final Round AI ($150/month), Interview Coder ($299/month), LockedIn AI (about $132/month regular)",
    good: "Daily interviews for months on end.",
    watch: "Keeps billing after your job search ends unless you cancel. Often non-refundable once started.",
  },
  {
    name: "Pay per hour of call time",
    how: "You buy time. The clock runs for the whole call, including small talk and your own answers.",
    examples: "ParakeetAI (1 credit = 1 hour, $7.80 to $25 per credit)",
    good: "Long calls where you need help on almost every question.",
    watch: "A 1-hour interview costs the same whether you asked for help once or forty times.",
  },
  {
    name: "Bring your own API key",
    how: "You pay for the app (free or a one-time licence), then pay an AI provider like OpenAI or Anthropic directly for usage.",
    examples: "Several open-source and indie desktop apps",
    good: "Developers who already have API keys and want full control.",
    watch: "Two bills, setup work, and usage costs you only see after the interview.",
  },
  {
    name: "Pay-as-you-go credits",
    how: "Buy a credit pack once. Each question uses a few credits; credits never expire.",
    examples: "Ghost by Renekin AI ($10 for 200 credits; 1 credit per text question, 2 per screenshot, 3 per voice question)",
    good: "A job search with a handful of interviews spread over weeks.",
    watch: "If you interview every day for months, an unlimited plan can work out cheaper.",
  },
];

const costRows: [string, string, string][] = [
  ["Ghost (pay-as-you-go credits)", "$10, paid once", "$28, paid once"],
  ["ParakeetAI (per hour)", "$39 (3-hour pack)", "$117 (8 + 3 hours, or the 15-hour pack)"],
  ["LockedIn AI (monthly)", "About $66 with promo, $132 regular", "About $132 with promo, $264 regular (2 months)"],
  ["Final Round AI (monthly)", "$150", "$250 (quarterly plan, cheaper than 2 months at $150)"],
  ["Interview Coder (monthly)", "$299", "$598 (2 months)"],
];

const faqs: Faq[] = [
  {
    q: "Is there an AI interview assistant without a subscription?",
    a: "Yes. Ghost by Renekin AI uses one-time credit packs from $10 that never renew. Every new account gets 20 free credits.",
  },
  {
    q: "What is the cheapest AI interview assistant for a few interviews?",
    a: "For 3 to 4 interviews, a $10 pay-as-you-go pack like Ghost's is usually cheapest. Monthly plans start around $66 to $150 for the same month.",
  },
  {
    q: "How much does one interview cost with Ghost?",
    a: "A typical interview uses 50 to 60 credits, about $2 to $3 on the $10 pack and about $2 on the $28 pack.",
  },
  {
    q: "Do Ghost credits renew or auto-charge?",
    a: "No. You pay once per pack and nothing renews, so there is nothing to cancel. Credits never expire.",
  },
  {
    q: "When is a monthly subscription better?",
    a: "If you have interviews almost every day for months, an unlimited monthly plan can cost less per interview than credits.",
  },
  {
    q: "Does pay-as-you-go mean fewer features?",
    a: "Not with Ghost. Every pack, including the free 20 credits, includes voice, screenshots, resume context and staying hidden from screen share.",
  },
];

export default function NoSubscriptionPage() {
  return (
    <div className="-mt-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-12 sm:pb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/85 mb-4">No subscription</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-sm text-balance">
            An AI interview assistant you don&apos;t pay for every month
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Most job searches are a few busy weeks, not a year. Here is how AI interview assistants charge, and what
            3 or 10 interviews actually cost with each model.
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
          <p className="mt-5 text-sm font-medium text-white/85">20 free credits · macOS &amp; Windows · Nothing to cancel</p>
        </div>
      </section>

      {/* Short answer */}
      <section className="bg-gradient-to-b from-sky-100 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-14 sm:pb-16">
          <div className="rounded-2xl border border-sky-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">The short answer</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              If you have a handful of interviews coming up, <strong className="text-gray-900">pay-as-you-go
              credits</strong> are the cheapest way to get live AI help. With Ghost by Renekin AI,{" "}
              <strong className="text-gray-900">3 interviews cost $10</strong> and{" "}
              <strong className="text-gray-900">10 interviews cost $28</strong>, paid once. The same help on a
              monthly plan costs <strong className="text-gray-900">$66 to $299</strong> for a single month.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing models */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
            The 4 ways AI interview assistants charge
          </h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
            The headline price matters less than the model. Pick the one that matches how often you interview.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {models.map((m) => (
              <div
                key={m.name}
                className={`rounded-2xl p-6 ${
                  m.name === "Pay-as-you-go credits" ? "border-2 border-sky-400 bg-sky-50" : "border border-gray-200"
                }`}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{m.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-3">{m.how}</p>
                <p className="text-sm text-gray-500 mb-3">
                  <span className="font-semibold text-gray-700">Examples:</span> {m.examples}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-emerald-700">Best for:</span> {m.good}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold text-amber-700">Watch out:</span> {m.watch}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Worked cost example */}
      <section className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">What it really costs</h2>
          <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
            Two common job searches: 3 one-hour interviews in a month, and 10 one-hour interviews over 2 months.
          </p>
          <div className="-mx-4 sm:mx-0 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px] sm:text-base bg-white">
              <thead>
                <tr className="border-b-2 border-gray-200 text-gray-900">
                  <th className="py-3 pl-4 pr-2 font-semibold">Tool and pricing model</th>
                  <th className="py-3 px-3 font-semibold">3 interviews, 1 month</th>
                  <th className="py-3 pl-3 pr-4 font-semibold">10 interviews, 2 months</th>
                </tr>
              </thead>
              <tbody>
                {costRows.map(([tool, three, ten], i) => (
                  <tr key={tool} className={`border-t border-gray-100 align-top ${i === 0 ? "bg-sky-50/70" : ""}`}>
                    <td className="py-3 pl-4 pr-3 font-semibold text-gray-900">{tool}</td>
                    <td className="py-3 px-3 text-gray-700">{three}</td>
                    <td className="py-3 pl-3 pr-4 text-gray-700">{ten}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 space-y-2 text-sm text-gray-500 leading-relaxed">
            <p>
              How we counted: a typical Ghost interview uses 50 to 60 credits, so 3 interviews fit in the $10 pack
              (200 credits) and 10 fit in the $28 pack (750 credits). ParakeetAI charges 1 credit per hour of call
              time. Monthly plans are counted as the months you&apos;d need to stay subscribed.
            </p>
            <p>
              Competitor prices are from each company&apos;s own pricing page in November 2026: Final Round AI on
              November 6, LockedIn AI on November 6 (shown to us in rupees, so dollar amounts are approximate),
              ParakeetAI on November 6, and Interview Coder in November 2026. Prices change with promotions, so check
              each site before you buy. Detailed comparisons:{" "}
              <Link href="/final-round-ai-alternative" className="underline hover:text-gray-700">Final Round AI</Link>,{" "}
              <Link href="/lockedin-ai-alternative" className="underline hover:text-gray-700">LockedIn AI</Link>,{" "}
              <Link href="/parakeet-ai-alternative" className="underline hover:text-gray-700">ParakeetAI</Link>,{" "}
              <Link href="/interview-coder-alternative" className="underline hover:text-gray-700">Interview Coder</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">Pay-as-you-go, with nothing held back</h2>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              <li>
                <strong className="text-gray-900">Coding and system design:</strong> screenshot the problem and get
                the approach, code, complexity and edge cases.
              </li>
              <li>
                <strong className="text-gray-900">Live audio:</strong> Ghost hears the interviewer&apos;s question
                and suggests an answer in seconds.
              </li>
              <li>
                <strong className="text-gray-900">Your resume and the job description:</strong> answers use your
                real experience, so they sound like you.
              </li>
              <li>
                <strong className="text-gray-900">Hidden from screen share</strong> in Zoom, Google Meet and
                Microsoft Teams, on Mac and Windows.
              </li>
              <li>
                <strong className="text-gray-900">Every feature on every pack</strong>, including the free 20
                credits.
              </li>
            </ul>
          </div>
          <Image
            src="/ghost-screenshot.png"
            alt="Ghost by Renekin AI answering a coding interview question next to a shared code editor"
            width={1600}
            height={1000}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full h-auto rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-4 sm:px-6 pb-16 sm:pb-20 pt-2">
        <FaqSection faqs={faqs} />
        <p className="max-w-3xl mx-auto mt-6 text-center text-gray-500">
          More questions? See the full{" "}
          <Link href="/faq" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
            Ghost FAQ
          </Link>
          .
        </p>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-400 to-sky-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pay only when you have an interview</h2>
          <p className="text-white/85 mb-8 max-w-lg mx-auto">
            Download Ghost, add your resume, and try it with 20 free credits. No card needed.
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
