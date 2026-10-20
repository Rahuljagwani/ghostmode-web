import { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

const URL = "https://renekin.com/cluely-alternative";

export const metadata: Metadata = {
  title: { absolute: "Best Cluely Alternative (2026): Ghost vs Cluely" },
  description:
    "Ghost is a Cluely alternative for interviews that hides from screen share on every plan, including free, with one-time credit packs instead of a subscription.",
  keywords: [
    "Cluely alternative",
    "Cluely alternatives",
    "Ghost vs Cluely",
    "cheaper Cluely alternative",
    "Cluely undetectable alternative",
    "AI interview assistant",
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: "Best Cluely Alternative (2026): Ghost vs Cluely",
    description: "Hidden from screen share on every plan, no subscription. Compare Ghost and Cluely side by side.",
    images: ["/opengraph-image"],
  },
};

const rows: [string, string, string][] = [
  ["Hidden from screen share", "Yes, on every plan including free", "Only on Pro + Undetectability ($149.99/mo)"],
  ["Pricing model", "One-time credit packs, no subscription", "Monthly subscription"],
  ["Cheapest paid option", "$10 for 200 credits (about 3–4 interviews)", "$19.99/mo (Pro, not hidden)"],
  ["Free to try", "20 credits, every feature unlocked", "Starter: limited responses, not hidden"],
  ["Built for", "Interviews: behavioral, technical and coding rounds", "Meetings and general assistance"],
  ["Reads your screen", "Yes, screenshot coding problems, slides and diagrams", "Yes"],
  ["Hears the other person", "Yes, live transcription", "Yes, meeting notetaking"],
  ["Uses your resume and job description", "Yes", "Custom instructions and file uploads"],
  ["Platforms", "macOS 12+ and Windows 10+", "Mac (see Cluely's site for other platforms)"],
];

const faqs: Faq[] = [
  {
    q: "What is the best Cluely alternative?",
    a: "For interviews, Ghost by Renekin AI is a strong Cluely alternative. It hides from screen share on every plan, including the free one, and uses one-time credit packs from $10 instead of a monthly subscription. It runs on macOS and Windows.",
  },
  {
    q: "Is there a cheaper alternative to Cluely?",
    a: "Yes. Cluely only hides from screen share on its Pro + Undetectability plan at $149.99 a month. Ghost hides from screen share on every plan, and its largest credit pack works out to about $2 per interview.",
  },
  {
    q: "Is Ghost hidden from screen share like Cluely?",
    a: "Yes. Ghost's window is excluded from screen capture on macOS and Windows, so it doesn't appear when you share your screen in Zoom, Google Meet or Microsoft Teams, or in screen recordings. This is included on every plan.",
  },
  {
    q: "Does Ghost need a subscription?",
    a: "No. You buy credits once and use them when you need them: 1 credit for a text question, 2 for a screenshot and 3 for a voice question. Every new account starts with 20 free credits.",
  },
  {
    q: "When is Cluely a better choice than Ghost?",
    a: "If you mainly want an always-on meeting notetaker with unlimited usage every day, Cluely's Pro plan may suit you better. If you need help in interviews and want to stay hidden from screen share without paying $149.99 a month, Ghost is the better fit.",
  },
  {
    q: "Can I try Ghost for free?",
    a: "Yes. Download Ghost for macOS or Windows and sign up to get 20 free credits with every feature unlocked, including screen-share stealth. No card is needed.",
  },
];

export default function CluelyAlternativePage() {
  return (
    <div className="-mt-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-12 sm:pb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/85 mb-4">Cluely alternative</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-sm text-balance">
            Hidden from screen share. No $149.99 plan required.
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Ghost by Renekin AI is a Cluely alternative built for interviews. It stays hidden from screen share on
            every plan, including free, and you pay once for credits instead of a monthly subscription.
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
              Cluely hides from screen share only on its{" "}
              <strong className="text-gray-900">Pro + Undetectability plan at $149.99 a month</strong>. Ghost hides
              from screen share on <strong className="text-gray-900">every plan</strong>, costs about{" "}
              <strong className="text-gray-900">$2 per interview</strong> on its largest pack, and never auto-renews.
              If you need help in interviews rather than an all-day meeting notetaker, Ghost is the cheaper, more
              focused choice.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Ghost vs Cluely</h2>
          <div className="-mx-4 sm:mx-0 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px] sm:text-base">
              <thead>
                <tr className="border-b-2 border-gray-200 text-gray-900">
                  <th className="py-3 pl-4 pr-2 font-semibold w-[28%]" />
                  <th className="py-3 px-3 font-semibold bg-sky-50 text-sky-800">Ghost</th>
                  <th className="py-3 pl-3 pr-4 font-semibold">Cluely</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, ghost, cluely]) => (
                  <tr key={label} className="border-t border-gray-100 align-top">
                    <td className="py-3 pl-4 pr-3 font-semibold text-gray-900">{label}</td>
                    <td className="py-3 px-3 bg-sky-50/60 text-gray-800">{ghost}</td>
                    <td className="py-3 pl-3 pr-4 text-gray-600">{cluely}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Cluely prices are from{" "}
            <a href="https://cluely.com/pricing" target="_blank" rel="nofollow noopener noreferrer" className="underline">
              Cluely&apos;s pricing page
            </a>{" "}
            as of October 2026 (monthly billing) and may change.
          </p>
        </div>
      </section>

      {/* Why switch */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Why people look for a Cluely alternative</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Staying hidden shouldn&apos;t cost $130 extra</h3>
              <p className="text-gray-600 leading-relaxed">
                For an interview copilot, staying out of view on a shared screen is the core feature. With Cluely
                it&apos;s the difference between $19.99 and $149.99 a month. With Ghost it&apos;s included on every
                plan.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Job hunts are bursty</h3>
              <p className="text-gray-600 leading-relaxed">
                Most people interview a few times, then not at all for months. Credits you buy once fit that far
                better than a subscription that keeps renewing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Built for interviews, not just meetings</h3>
              <p className="text-gray-600 leading-relaxed">
                Ghost has answer styles for behavioral (STAR), technical and coding rounds, reads coding problems from a
                screenshot, and uses your resume and the job description so answers sound like you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost example */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">What 5 interviews in a month cost</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 p-6">
              <p className="text-sm font-semibold text-gray-500 mb-1">Cluely, hidden from screen share</p>
              <p className="text-4xl font-bold text-gray-900">$149.99</p>
              <p className="text-sm text-gray-500 mt-2">Pro + Undetectability, one month</p>
            </div>
            <div className="rounded-2xl border-2 border-sky-400 bg-sky-50 p-6">
              <p className="text-sm font-semibold text-sky-700 mb-1">Ghost, hidden from screen share</p>
              <p className="text-4xl font-bold text-gray-900">$19</p>
              <p className="text-sm text-gray-600 mt-2">Popular pack: 450 credits, enough for about 7 interviews</p>
            </div>
          </div>
          <p className="mt-6 text-gray-600 leading-relaxed">
            Want the full picture? See our{" "}
            <Link href="/blog/best-ai-interview-copilot" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              comparison of 6 AI interview copilots
            </Link>{" "}
            or how Ghost works as an{" "}
            <Link href="/ai-interview-assistant" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              AI interview assistant
            </Link>
            .
          </p>
        </div>
      </section>

      {/* When Cluely fits */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">When Cluely might suit you better</h2>
          <p className="text-gray-600 leading-relaxed">
            If you want an always-on meeting notetaker and use AI help all day, every day, a flat monthly plan can make
            sense. If you need help in interviews and want to stay hidden from screen share without a $149.99 plan,
            Ghost is built for that.
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Switch from Cluely in 2 minutes</h2>
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
