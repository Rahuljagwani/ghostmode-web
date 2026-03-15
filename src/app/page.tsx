import Link from "next/link";
import {
  Ghost,
  Eye,
  EyeOff,
  Mic,
  Monitor,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: EyeOff,
    title: "Invisible on Screen Share",
    desc: "GhostMode is completely hidden from Zoom, Teams, Google Meet, and all screen recording software.",
  },
  {
    icon: Monitor,
    title: "Always On Top",
    desc: "Floating overlay stays above all windows including fullscreen apps. Never lose sight of your assistant.",
  },
  {
    icon: Mic,
    title: "Voice Transcription",
    desc: "Real-time speech-to-text captures interview questions automatically. Just listen and let GhostMode do the rest.",
  },
  {
    icon: Zap,
    title: "AI-Powered Answers",
    desc: "Claude AI generates tailored responses based on your resume, the job description, and the interviewer's questions.",
  },
  {
    icon: Eye,
    title: "Screenshot Analysis",
    desc: "Capture your screen to analyze coding problems, system design diagrams, or any visual content shown during interviews.",
  },
  {
    icon: Shield,
    title: "Stealth Mode",
    desc: "Emergency hide hotkey, process disguise, and invisible window technology keep you undetectable.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center relative">
          <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-sm px-4 py-1.5 rounded-full mb-8">
            <Ghost className="w-4 h-4" />
            Invisible AI Interview Assistant
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Ace Every Interview
            <br />
            <span className="text-purple-400">Without Being Seen</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto text-balance">
            GhostMode is a stealth desktop overlay that provides real-time AI
            assistance during interviews. Completely invisible during screen
            sharing.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Everything You Need
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">
          Built for technical interviews, behavioral rounds, and everything in
          between.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition"
            >
              <f.icon className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Set Up",
                desc: "Download GhostMode, sign in, and paste your resume and job description.",
              },
              {
                step: "2",
                title: "Join Interview",
                desc: "Start your video call. GhostMode floats invisibly on top — hidden from screen share.",
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
                <h3 className="text-xl font-semibold text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Land Your Dream Job?
        </h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Join thousands of candidates using GhostMode to ace their technical
          interviews.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-medium text-lg transition"
        >
          Start Free Trial
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
