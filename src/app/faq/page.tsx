import { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

const URL = "https://renekin.com/faq";

// Short, direct answers (one or two sentences) so search engines and AI assistants can quote them as they are.
// Every fact here must match the page it comes from: pricing/page.tsx (packs, credit costs, refunds, payment),
// terms/page.tsx (credits don't expire), privacy/page.tsx (screenshots and voice not stored), and
// marketing/directories/LISTING-COPY.md "Verified claims" (screen-share stealth). Update both together.
export const metadata: Metadata = {
  title: { absolute: "Ghost AI Interview Assistant FAQ: Pricing, Stealth and Features" },
  description:
    "Quick answers about Ghost by Renekin AI: pricing with no subscription, credits per question, staying hidden from screen share, platforms, features and privacy.",
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: "Ghost AI Interview Assistant FAQ",
    description: "Quick answers on pricing, screen-share stealth, features and privacy.",
    images: ["/opengraph-image"],
  },
};

interface Qa {
  q: string;
  a: string;
}

const groups: { id: string; title: string; items: Qa[] }[] = [
  {
    id: "basics",
    title: "The basics",
    items: [
      {
        q: "What is Ghost?",
        a: "Ghost by Renekin AI is a desktop AI copilot for job interviews and meetings. It hears the question, reads your screen and suggests an answer in seconds.",
      },
      {
        q: "Which interviews does Ghost help with?",
        a: "Coding, system design, technical, behavioral (STAR) and HR interviews. It also works in everyday meetings.",
      },
      {
        q: "Does Ghost work on Mac and Windows?",
        a: "Yes. Ghost runs on macOS 12 or later and Windows 10 or later. There is no phone app.",
      },
      {
        q: "Which meeting apps does Ghost work with?",
        a: "Zoom, Google Meet and Microsoft Teams, and any other app, because Ghost floats on top of every window.",
      },
      {
        q: "Who makes Ghost?",
        a: "Renekin AI, a small software team. You can reach us at socials@renekin.com.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing and credits",
    items: [
      {
        q: "Is Ghost free?",
        a: "You start free. Every new account gets 20 credits with every feature unlocked, and no card is needed.",
      },
      {
        q: "How much does Ghost cost?",
        a: "Credit packs are $10 for 200 credits, $19 for 450 and $28 for 750, each paid once.",
      },
      {
        q: "Does Ghost have a subscription?",
        a: "No. You buy credits once and nothing renews, so there is nothing to cancel.",
      },
      {
        q: "How many credits does a question use?",
        a: "1 credit for a text question, 2 for a screenshot and 3 for a voice question.",
      },
      {
        q: "How many credits does one interview use?",
        a: "About 50 to 60 credits for a typical interview, roughly $2 to $3.",
      },
      {
        q: "Do Ghost credits expire?",
        a: "No. Unused credits stay in your account.",
      },
      {
        q: "Can I get a refund?",
        a: "Credits are non-refundable unless required by law, so try Ghost with the 20 free credits before buying.",
      },
      {
        q: "How can I pay?",
        a: "International customers pay by card through Stripe. Customers in India pay in rupees through Razorpay, with UPI, cards or net banking.",
      },
    ],
  },
  {
    id: "stealth",
    title: "Screen sharing",
    items: [
      {
        q: "Can the interviewer see Ghost when I share my screen?",
        a: "No. Ghost's window is excluded from screen capture on macOS and Windows, so it doesn't appear in Zoom, Google Meet or Microsoft Teams screen shares.",
      },
      {
        q: "Is Ghost hidden when I share my entire screen?",
        a: "Yes. Ghost stays hidden whether you share one window or your entire screen, on both Mac and Windows.",
      },
      {
        q: "Does Ghost show up in screen recordings?",
        a: "No. Screen recordings skip Ghost's window for the same reason screen shares do.",
      },
      {
        q: "Is screen-share stealth only on paid plans?",
        a: "No. It's included on every pack, including the free 20 credits.",
      },
      {
        q: "Is it allowed to use Ghost in an interview?",
        a: "That depends on the employer. Check each interview's rules, since some companies don't allow AI help.",
      },
    ],
  },
  {
    id: "features",
    title: "Features",
    items: [
      {
        q: "Can Ghost solve coding problems from a screenshot?",
        a: "Yes. Take a screenshot and Ghost returns the approach, code, time and space complexity, and edge cases.",
      },
      {
        q: "Which programming languages does Ghost support?",
        a: "Any mainstream language, including Python, Java, C++, JavaScript, TypeScript, Go, C# and Kotlin.",
      },
      {
        q: "Does Ghost use my resume?",
        a: "Yes. Add your resume and the job description, and Ghost tailors answers to your real experience.",
      },
      {
        q: "Can Ghost help with system design interviews?",
        a: "Yes. It outlines the components, data flow, trade-offs and scaling plan you can talk through.",
      },
      {
        q: "Does Ghost have on-screen notes?",
        a: "Yes. Notes are free, use no credits, stay on your device and are hidden from screen share like the rest of Ghost.",
      },
      {
        q: "What are Ghost's keyboard shortcuts?",
        a: "Alt+S takes a screenshot, Alt+R records a voice question, Alt+H shows or hides Ghost, and Alt+N opens notes. On a Mac, Alt is the Option key.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    items: [
      {
        q: "Does Ghost store my screenshots or voice?",
        a: "No. They are sent to our server only to answer your question and are not stored after the answer is generated.",
      },
      {
        q: "Which AI model does Ghost use?",
        a: "Ghost uses Anthropic's Claude models to generate answers.",
      },
      {
        q: "Where is my resume kept?",
        a: "On your computer. Ghost sends it along with your questions so answers match your background.",
      },
    ],
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((g) =>
      g.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      }))
    ),
  };

  return (
    <div className="-mt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-12 sm:pb-14 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-sm">
            Ghost FAQ
          </h1>
          <p className="mt-5 text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Short answers about pricing, screen sharing, features and privacy.
          </p>
          <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="FAQ sections">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="rounded-full bg-white/25 border border-white/40 px-4 py-1.5 text-sm font-medium text-white hover:bg-white/35 transition-colors"
              >
                {g.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">
          {groups.map((g) => (
            <div key={g.id} id={g.id} className="scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{g.title}</h2>
              <dl className="divide-y divide-gray-200 border-y border-gray-200">
                {g.items.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{f.q}</h3>
                    </dt>
                    <dd className="mt-1.5 text-gray-600 leading-relaxed">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <p className="text-gray-600 leading-relaxed">
            Comparing tools? See{" "}
            <Link href="/ai-interview-assistant-no-subscription" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              how AI interview assistants charge
            </Link>
            , the full{" "}
            <Link href="/pricing" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              pricing page
            </Link>
            , or our comparisons with{" "}
            <Link href="/cluely-alternative" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              Cluely
            </Link>{" "}
            and{" "}
            <Link href="/final-round-ai-alternative" className="text-sky-600 underline underline-offset-2 hover:text-sky-700">
              Final Round AI
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-r from-sky-400 to-sky-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Try Ghost with 20 free credits</h2>
          <p className="text-white/85 mb-8 max-w-lg mx-auto">No card, no subscription. macOS and Windows.</p>
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
