import { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

const URL = "https://renekin.com/interview-coder-alternative";

// Interview Coder prices and free-plan terms read from interviewcoder.co (pricing section and FAQ) on
// Nov 6, 2026; refund terms from interviewcoder.co/policies/refund. Recheck before editing.
export const metadata: Metadata = {
  title: { absolute: "Interview Coder Alternative (2026): Ghost vs Interview Coder" },
  description:
    "Ghost is an Interview Coder alternative for coding and technical interviews: AI help on the free plan, then $10 one-time packs instead of $299 a month.",
  keywords: [
    "Interview Coder alternative",
    "Interview Coder alternatives",
    "Ghost vs Interview Coder",
    "cheaper Interview Coder alternative",
    "Interview Coder pricing",
    "AI coding interview assistant",
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: "Interview Coder Alternative (2026): Ghost vs Interview Coder",
    description: "AI help on the free plan, no $299 subscription. Compare Ghost and Interview Coder side by side.",
    images: ["/opengraph-image"],
  },
};

const rows: [string, string, string][] = [
  ["AI help on the free plan", "Yes, 20 credits with every feature", "No. The free download can't use AI features"],
  ["Cheapest paid option", "$10 once (200 credits, about 3–4 interviews)", "$299 a month (Monthly Pro), or $799 once (Lifetime Pro)"],
  ["Pricing model", "One-time credit packs that never auto-renew", "Monthly subscription, or a one-time lifetime purchase"],
  ["Refunds", "Credits are non-refundable, but every feature can be tried free first", "No refunds on any purchase, and AI features can't be tried free"],
  ["Hidden from screen share", "Yes, on every plan including free", "Yes"],
  ["Coding problems from your screen", "Yes, screenshot a problem for approach, code and complexity", "Yes"],
  ["Hears the interviewer", "Yes, live transcription", "Yes, audio support"],
  ["Behavioral and HR rounds", "Yes, STAR answers using your resume", "Supported"],
  ["Platforms", "macOS 12+ and Windows 10+", "Mac and Windows (versions not listed)"],
];

const faqs: Faq[] = [
  {
    q: "What is the best Interview Coder alternative?",
    a: "If you want AI help in coding and technical interviews without a $299 monthly plan, Ghost by Renekin AI is a strong Interview Coder alternative. Its free plan includes AI answers, and paid use starts with a $10 one-time credit pack. It runs on macOS and Windows.",
  },
  {
    q: "How much does Interview Coder cost?",
    a: "As of November 2026, Interview Coder's website lists a free download without AI features, Monthly Pro at $299 a month with 1,000 usage credits, and Lifetime Pro at $799 one-time. Its refund policy says all sales are final. Check interviewcoder.co for current prices.",
  },
  {
    q: "Is there a free alternative to Interview Coder?",
    a: "Ghost gives every new account 20 free credits with every feature unlocked, including screenshot coding help, live transcription and staying hidden from screen share, so you can try it in a real interview before paying anything. No card is needed.",
  },
  {
    q: "Can Ghost solve coding problems like Interview Coder?",
    a: "Yes. Take a screenshot of the problem and Ghost lists the possible approaches with their complexity, then gives the optimal solution as working code with comments. It also listens to the interviewer for follow-up questions.",
  },
  {
    q: "Does Ghost offer refunds?",
    a: "Ghost credits are non-refundable, like Interview Coder's plans. The difference is that you can try first: the 20 free credits unlock every feature, so you can check Ghost works with your setup before buying. Credit packs are one-time purchases with no subscription to cancel.",
  },
  {
    q: "When is Interview Coder a better choice than Ghost?",
    a: "If you expect many technical interviews over several years and want unlimited use for a single payment, Interview Coder's $799 lifetime plan could work out cheaper in the long run, as long as you're sure it suits you, since all sales are final. For a handful of interviews, Ghost costs far less.",
  },
];

export default function InterviewCoderAlternativePage() {
  return (
    <div className="-mt-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-12 sm:pb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/85 mb-4">Interview Coder alternative</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-sm text-balance">
            Coding interview help from $10, not $299 a month.
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Ghost by Renekin AI is an Interview Coder alternative for coding and technical interviews. Its free plan
            includes AI answers, and after that you pay once for credits.
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
              Interview Coder&apos;s free download can&apos;t use its AI features; you need{" "}
              <strong className="text-gray-900">Monthly Pro at $299 a month</strong> or{" "}
              <strong className="text-gray-900">Lifetime Pro at $799</strong>, and all sales are final. Ghost
              includes AI answers on the <strong className="text-gray-900">free plan</strong>, and paid use starts at{" "}
              <strong className="text-gray-900">$10, paid once</strong>. For a handful of coding interviews, Ghost
              costs far less and lets you try everything first.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Ghost vs Interview Coder</h2>
          <div className="-mx-4 sm:mx-0 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px] sm:text-base">
              <thead>
                <tr className="border-b-2 border-gray-200 text-gray-900">
                  <th className="py-3 pl-4 pr-2 font-semibold w-[28%]" />
                  <th className="py-3 px-3 font-semibold bg-sky-50 text-sky-800">Ghost</th>
                  <th className="py-3 pl-3 pr-4 font-semibold">Interview Coder</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, ghost, interviewCoder]) => (
                  <tr key={label} className="border-t border-gray-100 align-top">
                    <td className="py-3 pl-4 pr-3 font-semibold text-gray-900">{label}</td>
                    <td className="py-3 px-3 bg-sky-50/60 text-gray-800">{ghost}</td>
                    <td className="py-3 pl-3 pr-4 text-gray-600">{interviewCoder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Interview Coder prices and plan details are from{" "}
            <a href="https://www.interviewcoder.co/" target="_blank" rel="nofollow noopener noreferrer" className="underline">
              Interview Coder&apos;s website
            </a>{" "}
            and its{" "}
            <a
              href="https://www.interviewcoder.co/policies/refund"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="underline"
            >
              refund policy
            </a>{" "}
            as of November 2026, and may change.
          </p>
        </div>
      </section>

      {/* Why switch */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Why people look for an Interview Coder alternative</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">$299 before you can try the AI</h3>
              <p className="text-gray-600 leading-relaxed">
                Interview Coder&apos;s AI features need a paid plan, and all sales are final. Ghost&apos;s credits
                aren&apos;t refundable either, but 20 free credits unlock everything, so you can check it works with
                your setup before you pay anything.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Job hunts are bursty</h3>
              <p className="text-gray-600 leading-relaxed">
                Most people have a few interviews close together, then none for months. A $299 monthly plan or a $799
                lifetime purchase is a big commitment for that. Credits you buy once and use when you need them fit far
                better.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Every round, not just coding</h3>
              <p className="text-gray-600 leading-relaxed">
                Ghost reads coding problems from a screenshot and gives the approach, complexity and code, and it also
                has answer styles for behavioral (STAR) and technical rounds that use your resume and the job
                description, so answers sound like you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost example */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">What AI help for 5 interviews costs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="text-sm font-semibold text-gray-500 mb-1">Interview Coder, Monthly Pro</p>
              <p className="text-4xl font-bold text-gray-900">$299</p>
              <p className="text-sm text-gray-500 mt-2">One month; all sales final</p>
            </div>
            <div className="rounded-2xl border-2 border-sky-400 bg-sky-50 p-6">
              <p className="text-sm font-semibold text-sky-700 mb-1">Ghost, live answers</p>
              <p className="text-4xl font-bold text-gray-900">$19</p>
              <p className="text-sm text-gray-600 mt-2">Popular pack: 450 credits, enough for about 7 interviews, paid once</p>
            </div>
          </div>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Preparing for a coding round? See how Ghost works as an{" "}
            <Link href="/ai-coding-interview-assistant" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              AI coding interview assistant
            </Link>
            , or compare more tools in our{" "}
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
            </Link>{" "}
            and{" "}
            <Link href="/cluely-alternative" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              Cluely
            </Link>{" "}
            alternative pages.
          </p>
        </div>
      </section>

      {/* When Interview Coder fits */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">When Interview Coder might suit you better</h2>
          <p className="text-gray-600 leading-relaxed">
            If you expect many technical interviews over several years and want unlimited use for one payment,
            Interview Coder&apos;s $799 lifetime plan could cost less in the long run. Because all sales are final,
            it&apos;s worth being sure it fits your setup first. If you have a handful of interviews coming up, Ghost
            costs far less and you can try every feature for free.
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Switch from Interview Coder in 2 minutes</h2>
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
