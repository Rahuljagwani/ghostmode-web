import Link from "next/link";
import Image from "next/image";
import {
  Ghost,
  EyeOff,
  Mic,
  Monitor,
  Zap,
  Eye,
  Shield,
  ArrowRight,
  ChevronRight,
  Brain,
  Clock,
  Layers,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: EyeOff,
    title: "Invisible on Screen Share",
    desc: "Completely undetectable on Zoom, Teams, Google Meet, and all screen recording software. No one sees it but you.",
  },
  {
    icon: Monitor,
    title: "Always On Top",
    desc: "A floating overlay that stays above all windows, including fullscreen applications. Always within reach.",
  },
  {
    icon: Mic,
    title: "Real-Time Voice Transcription",
    desc: "Captures questions and discussion automatically through speech-to-text so you never miss a word.",
  },
  {
    icon: Brain,
    title: "Context-Aware AI Answers",
    desc: "Tailored responses based on your background documents, context files, and the live conversation.",
  },
  {
    icon: Eye,
    title: "Screenshot Analysis",
    desc: "Analyze coding problems, slides, diagrams, or any visual content on your screen instantly.",
  },
  {
    icon: Shield,
    title: "Stealth Mode",
    desc: "Emergency hide hotkey, process name disguise, and invisible window technology for total discretion.",
  },
];

const steps = [
  {
    step: "01",
    title: "Set up your profile",
    desc: "Download Ghost, sign in, and add your background documents and relevant context for personalized answers.",
  },
  {
    step: "02",
    title: "Join your call",
    desc: "Start your video call as normal. Ghost floats invisibly on top, completely hidden from screen share.",
  },
  {
    step: "03",
    title: "Get intelligent answers",
    desc: "Ask via voice, text, or screenshot. AI generates tailored, context-aware responses in seconds.",
  },
];

const trustPoints = [
  {
    icon: Clock,
    title: "Built for high-pressure moments",
    desc: "Designed to help you think clearly when it matters most. Interviews, meetings, or presentations.",
  },
  {
    icon: Brain,
    title: "AI that enhances your thinking",
    desc: "Not a replacement. An intelligent copilot that augments your natural ability.",
  },
  {
    icon: Layers,
    title: "Minimal, distraction-free interface",
    desc: "Clean overlay that stays out of your way until you need it.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50/60 via-white to-white" />
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-24 text-center relative">
          {/* <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 text-sm px-4 py-1.5 rounded-full mb-8 font-medium">
            <Image
              src="/renekin-logo.svg"
              alt="Renekin AI"
              width={16}
              height={16}
              className="rounded-sm"
            />
            Intelligent Copilot for Professionals
          </div> */}

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            Think better.
            <br />
            <span className="text-violet-600">Answer faster.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Meet <span className="text-gray-700 font-medium">Ghost</span> by Renekin AI,
            an intelligent, invisible copilot that sits alongside your interviews,
            meetings, and presentations. It understands the context and delivers
            smart answers in real time, completely hidden from screen sharing.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3.5 rounded-xl font-medium text-lg transition-colors shadow-sm flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/download"
              className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3.5 rounded-xl font-medium text-lg transition-colors border border-gray-200 shadow-sm"
            >
              Download App
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            20 free credits on signup. No credit card required.
          </p>
        </div>
      </section>

      {/* Social proof / trust bar */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              Works with Zoom, Meet, Teams
            </span>
            <span className="hidden sm:inline text-gray-200">|</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              macOS &amp; Windows
            </span>
            <span className="hidden sm:inline text-gray-200">|</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
              Undetectable on screen share
            </span>
          </div>
        </div>
      </section>

      {/* Ghost Product / Features Grid */}
      <section id="ghost" className="max-w-5xl mx-auto px-6 py-24">
        <div id="features" className="scroll-mt-20" />
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-violet-600 mb-4">
            <Ghost className="w-6 h-6" />
            <span className="text-sm font-semibold tracking-wide uppercase">Ghost</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your intelligent, invisible copilot
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Real-time AI assistance that stays invisible. Built for interviews,
            team meetings, client calls, presentations, and every high-pressure moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-violet-200 hover:shadow-md hover:shadow-violet-50/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-4 group-hover:bg-violet-100 transition-colors">
                <f.icon className="w-5 h-5 text-violet-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-lg mx-auto">
            Get set up in under a minute. Ghost works alongside any video call or meeting.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-violet-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-5">
                  {s.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {s.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Pricing Quick */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, credit-based pricing
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Pay only for what you use. No subscriptions, no hidden fees.
            Start with 20 free credits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {[
            { name: "Text Query", cost: "1 credit", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
            { name: "Screenshot", cost: "2 credits", icon: Eye, color: "text-blue-500", bg: "bg-blue-50" },
            { name: "Voice Query", cost: "3 credits", icon: Mic, color: "text-green-500", bg: "bg-green-50" },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:border-gray-200 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center mx-auto mb-3`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500 mt-1">{item.cost}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-violet-600 hover:text-violet-700 font-medium text-sm transition-colors"
          >
            View all plans
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Trust / Positioning */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Designed for when it matters
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Ghost enhances your natural ability, helping you think clearer
              and articulate better in interviews, meetings, and presentations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustPoints.map((t) => (
              <div key={t.title} className="bg-white border border-gray-100 rounded-xl p-6">
                <t.icon className="w-6 h-6 text-violet-500 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">{t.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Renekin */}
      <section>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <Image
            src="/renekin-logo.svg"
            alt="Renekin AI"
            width={56}
            height={56}
            className="mx-auto mb-6 rounded-xl"
          />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About Renekin AI
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-2">
            <span className="text-gray-900 font-semibold">Renaissance</span> knowledge meets modern AI.
          </p>
          <p className="text-gray-500 text-lg leading-relaxed">
            Renekin AI builds invisible, purpose-built AI tools that understand context,
            work silently in the background, and help professionals perform at their best.
            Ghost is our first product, with more to come.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-violet-50/50 border-t border-violet-100/50">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready for your next big moment?
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Start with 20 free credits. Download Ghost and get instant
            AI-powered assistance in your next interview, meeting, or presentation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3.5 rounded-xl font-medium text-lg transition-colors shadow-sm"
            >
              Start Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="text-violet-600 hover:text-violet-700 font-medium text-lg transition-colors"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
