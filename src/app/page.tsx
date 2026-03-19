import Link from "next/link";
import {
  Brain,
  Ghost,
  Eye,
  EyeOff,
  Mic,
  Monitor,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  Lock,
} from "lucide-react";

const ghostFeatures = [
  {
    icon: EyeOff,
    title: "Invisible on Screen Share",
    desc: "Completely hidden from Zoom, Teams, Google Meet, and all screen recording software.",
  },
  {
    icon: Monitor,
    title: "Always On Top",
    desc: "Floating overlay stays above all windows including fullscreen apps.",
  },
  {
    icon: Mic,
    title: "Voice Transcription",
    desc: "Real-time speech-to-text captures interview questions automatically.",
  },
  {
    icon: Zap,
    title: "AI-Powered Answers",
    desc: "Tailored responses based on your resume, job description, and the interviewer's questions.",
  },
  {
    icon: Eye,
    title: "Screenshot Analysis",
    desc: "Analyze coding problems, system design diagrams, or any visual content shown during interviews.",
  },
  {
    icon: Shield,
    title: "Stealth Mode",
    desc: "Emergency hide hotkey, process disguise, and invisible window technology.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero — Renekin AI */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center relative">
          <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-sm px-4 py-1.5 rounded-full mb-8">
            <Brain className="w-4 h-4" />
            Renaissance + Kin = Renekin
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            AI Tools for
            <br />
            <span className="text-purple-400">the Real World</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto text-balance">
            Renekin AI builds intelligent tools that work alongside you.
            Your knowledgeable AI companion — like having a Renaissance polymath in your corner.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#products"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-medium text-lg transition flex items-center gap-2"
            >
              Explore Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Focused AI tools that solve real problems. No fluff, just results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ghost — Featured Product */}
          <Link
            href="#ghost"
            className="md:col-span-1 bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/40 transition group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                <Ghost className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Ghost</h3>
                <p className="text-sm text-purple-400">Invisible AI Interview Assistant</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Stealth desktop overlay that provides real-time AI assistance during interviews.
              Completely invisible during screen sharing.
            </p>
            <div className="flex items-center gap-1 text-purple-400 text-sm group-hover:gap-2 transition-all">
              Learn more <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Coming Soon Card */}
          <div className="bg-white/[0.02] border border-white/10 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-500 mb-2">More Coming Soon</h3>
            <p className="text-gray-600 text-sm">
              We&apos;re building more AI tools. Stay tuned.
            </p>
          </div>
        </div>
      </section>

      {/* Ghost Product Detail */}
      <section id="ghost" className="bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ghost className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold">Ghost</h2>
          </div>
          <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">
            Ace every interview without being seen. Built for technical interviews,
            behavioral rounds, and everything in between.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ghostFeatures.map((f) => (
              <div
                key={f.title}
                className="bg-black/40 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition"
              >
                <f.icon className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-12">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Set Up",
                  desc: "Download Ghost, sign in, and paste your resume and job description.",
                },
                {
                  step: "2",
                  title: "Join Interview",
                  desc: "Start your video call. Ghost floats invisibly on top — hidden from screen share.",
                },
                {
                  step: "3",
                  title: "Get Answers",
                  desc: "Use voice transcription or screenshots. AI generates tailored answers in real time.",
                },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {s.step}
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {s.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ghost CTA */}
          <div className="mt-16 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-medium text-lg transition flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/download"
                className="bg-white/10 hover:bg-white/15 text-white px-8 py-3.5 rounded-xl font-medium text-lg transition"
              >
                Download App
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              50 free credits on signup. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Renekin AI Philosophy */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Renekin AI?
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-4">
            <span className="text-white font-semibold">Renaissance</span> thinkers mastered many fields.{" "}
            <span className="text-white font-semibold">Kin</span> means family — someone who has your back.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Renekin AI is your knowledgeable companion — purpose-built tools
            that understand context, work invisibly, and help you perform at your best.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Join thousands using Renekin AI tools to work smarter.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-medium text-lg transition"
        >
          Create Free Account
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
