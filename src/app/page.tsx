import Link from "next/link";
import Image from "next/image";
import MockupChat from "@/components/MockupChat";
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
  Video,
  Laptop,
  EyeClosed,
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
    <div className="-mt-16">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,223,140,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(100,190,235,0.2)_0%,_transparent_50%)]" />

        <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text content */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.08]">
                Think better
                <br />
                Answer faster
              </h1>

              <p className="mt-6 text-lg text-gray-700 max-w-lg leading-relaxed">
                Meet <span className="text-gray-900 font-semibold">Ghost</span> by Renekin AI,
                an intelligent, invisible copilot that sits alongside your interviews,
                meetings, and presentations. It understands the context and delivers
                smart answers in real time, completely hidden from screen sharing.
              </p>

              <div className="mt-10">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  Get started for free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right — App mockup */}
            <div className="hidden lg:flex justify-end -mt-12">
              <div className="w-[470px] min-h-[470px] bg-[#1e2d3d]/55 backdrop-blur-2xl rounded-xl shadow-2xl overflow-hidden border border-white/15 flex flex-col">
                {/* Mockup title bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#4fc3f7] text-xs font-semibold">Ghost</span>
                    <span className="text-white/40 text-[10px]">by renekin ai</span>
                  </div>
                  <div className="bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    9839 cr
                  </div>
                </div>

                {/* Animated chat — cycles through 3 scenarios */}
                <div className="flex-1 flex flex-col justify-end">
                  <MockupChat />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof pills */}
      <section>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-sm border border-white/50 rounded-full px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm animate-[fadeInUp_0.6s_ease-out_both]">
              <Video className="w-4 h-4 text-blue-600" />
              Works with Zoom, Meet, Teams
            </span>
            <span className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-sm border border-white/50 rounded-full px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm animate-[fadeInUp_0.6s_ease-out_0.15s_both]">
              <Laptop className="w-4 h-4 text-gray-700" />
              macOS &amp; Windows
            </span>
            <span className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-sm border border-white/50 rounded-full px-5 py-2.5 text-sm font-medium text-gray-800 shadow-sm animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <EyeClosed className="w-4 h-4 text-violet-600" />
              Undetectable on screen share
            </span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="ghost">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div id="features" className="scroll-mt-20" />
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-gray-900 mb-4">
              <Ghost className="w-6 h-6" />
              <span className="text-sm font-semibold tracking-wide uppercase">Ghost</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your intelligent, invisible copilot
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-lg">
              Real-time AI assistance that stays invisible. Built for interviews,
              team meetings, client calls, presentations, and every high-pressure moment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white/35 backdrop-blur-md border border-white/50 rounded-2xl p-6 hover:bg-white/45 hover:border-white/60 shadow-lg transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center mb-4 group-hover:bg-white/40 transition-colors">
                  <f.icon className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-lg mx-auto">
            Get set up in under a minute. Ghost works alongside any video call or meeting.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm text-gray-800 font-bold text-lg flex items-center justify-center mx-auto mb-5 border border-white/40">
                  {s.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {s.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Pricing Quick */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, credit-based pricing
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Pay only for what you use. No subscriptions, no hidden fees.
              Start with 20 free credits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { name: "Text Query", cost: "1 credit", icon: Zap, color: "text-amber-600" },
              { name: "Screenshot", cost: "2 credits", icon: Eye, color: "text-gray-700" },
              { name: "Voice Query", cost: "3 credits", icon: Mic, color: "text-emerald-600" },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-white/35 backdrop-blur-md border border-white/50 rounded-xl p-6 text-center hover:bg-white/45 shadow-lg transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/30 flex items-center justify-center mx-auto mb-3">
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
              className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              View all plans
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust / Positioning */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Designed for when it matters
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Ghost enhances your natural ability, helping you think clearer
              and articulate better in interviews, meetings, and presentations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustPoints.map((t) => (
              <div key={t.title} className="bg-white/35 backdrop-blur-md border border-white/50 rounded-xl p-6 shadow-lg">
                <t.icon className="w-6 h-6 text-gray-700 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">{t.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Renekin */}
      <section>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <Image
            src="/renekin-logo-blue.svg"
            alt="Renekin AI"
            width={56}
            height={56}
            className="mx-auto mb-6 rounded-xl"
          />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About Renekin AI
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-2">
            <span className="text-gray-900 font-semibold">Renaissance</span> knowledge meets modern AI.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Renekin AI builds invisible, purpose-built AI tools that understand context,
            work silently in the background, and help professionals perform at their best.
            Ghost is our first product, with more to come.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready for your next big moment?
          </h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Start with 20 free credits. Download Ghost and get instant
            AI-powered assistance in your next interview, meeting, or presentation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Start Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-gray-900 font-medium text-lg transition-colors"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
