import Link from "next/link";
import Image from "next/image";
import MockupChat from "@/components/MockupChat";
import Icon from "@/components/Icon";
import {
  ViewOffIcon,
  Mic01Icon,
  MonitorDotIcon,
  FlashIcon,
  EyeIcon,
  Shield01Icon,
  ArrowRight02Icon,
  Brain01Icon,
  Clock01Icon,
  Layers01Icon,
  Video01Icon,
  LaptopIcon,
  ViewOffSlashIcon,
  LockIcon,
  File01Icon,
  UserCheck01Icon,
} from "@hugeicons/core-free-icons";
import { Ghost } from "lucide-react";
import type { IconSvgElement } from "@hugeicons/react";

const features: { icon: IconSvgElement; title: string; desc: string; color: string; bg: string }[] = [
  {
    icon: ViewOffIcon,
    title: "Invisible on Screen Share",
    desc: "Completely undetectable on Zoom, Teams, Google Meet, and all screen recording software. No one sees it but you.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: MonitorDotIcon,
    title: "Always On Top",
    desc: "A floating overlay that stays above all windows, including fullscreen applications. Always within reach.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Mic01Icon,
    title: "Real-Time Voice Transcription",
    desc: "Captures questions and discussion automatically through speech-to-text so you never miss a word.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Brain01Icon,
    title: "Context-Aware AI Answers",
    desc: "Tailored responses based on your background documents, context files, and the live conversation.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: EyeIcon,
    title: "Screenshot Analysis",
    desc: "Analyze coding problems, slides, diagrams, or any visual content on your screen instantly.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Shield01Icon,
    title: "Stealth Mode",
    desc: "Emergency hide hotkey, process name disguise, and invisible window technology for total discretion.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const steps: { step: string; title: string; desc: string; color: string }[] = [
  {
    step: "01",
    title: "Set up your profile",
    desc: "Download Ghost, sign in, and add your background documents and relevant context for personalized answers.",
    color: "bg-sky-500",
  },
  {
    step: "02",
    title: "Join your call",
    desc: "Start your video call as normal. Ghost floats invisibly on top, completely hidden from screen share.",
    color: "bg-indigo-500",
  },
  {
    step: "03",
    title: "Get intelligent answers",
    desc: "Ask via voice, text, or screenshot. AI generates tailored, context-aware responses in seconds.",
    color: "bg-emerald-500",
  },
];

const trustPoints: { icon: IconSvgElement; title: string; desc: string; color: string; bg: string }[] = [
  {
    icon: Clock01Icon,
    title: "Built for high-pressure moments",
    desc: "Designed to help you think clearly when it matters most. Interviews, meetings, or presentations.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Brain01Icon,
    title: "AI that enhances your thinking",
    desc: "Not a replacement. An intelligent copilot that augments your natural ability.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Layers01Icon,
    title: "Minimal, distraction-free interface",
    desc: "Clean overlay that stays out of your way until you need it.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export default function Home() {
  return (
    <div className="-mt-16">
      {/* Hero — blue gradient */}
      <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.3)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.2)_0%,_transparent_50%)]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24 relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left — Text content */}
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-sm">
                Think better.
                <br />
                Answer faster.
              </h1>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/90 max-w-lg leading-relaxed">
                Meet <span className="text-white font-semibold">Ghost</span> by Renekin AI,
                an intelligent, invisible copilot that sits alongside your interviews,
                meetings, and presentations. It understands the context and delivers
                smart answers in real time, completely hidden from screen sharing.
              </p>

              <div className="mt-6 sm:mt-10">
                <Link
                  href="/download"
                  className="inline-flex items-center gap-2 bg-white text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  Get started for free
                  <Icon icon={ArrowRight02Icon} size={20} />
                </Link>
              </div>
            </div>

            {/* Right — App mockup */}
            <div className="hidden lg:flex justify-end -mt-12">
              <div className="w-[470px] min-h-[470px] bg-[#1e2d3d]/70 backdrop-blur-2xl rounded-xl shadow-2xl overflow-hidden border border-white/20 flex flex-col">
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

      {/* Social proof pills — white bg */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-800 shadow-sm animate-[fadeInUp_0.6s_ease-out_both]">
              <Icon icon={Video01Icon} size={16} className="text-blue-600" />
              Works with Zoom, Meet, Teams
            </span>
            <span className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-800 shadow-sm animate-[fadeInUp_0.6s_ease-out_0.15s_both]">
              <Icon icon={LaptopIcon} size={16} className="text-gray-700" />
              macOS &amp; Windows
            </span>
            <span className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-800 shadow-sm animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <Icon icon={ViewOffSlashIcon} size={16} className="text-sky-600" />
              Undetectable on screen share
            </span>
          </div>
        </div>
      </section>

      {/* How It Works — white bg */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-gray-500 text-center mb-16 max-w-lg mx-auto">
            Get set up in under a minute. Ghost works alongside any video call or meeting.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className={`w-12 h-12 rounded-full ${s.color} text-white font-bold text-lg flex items-center justify-center mx-auto mb-5 shadow-md`}>
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

      {/* Features Grid — blue gradient accent */}
      <section id="ghost" className="bg-gradient-to-b from-sky-50 via-sky-100 to-sky-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div id="features" className="scroll-mt-20" />
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-sky-600 mb-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-sky-200 hover:shadow-lg shadow-sm transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                  <Icon icon={f.icon} size={20} className={f.color} />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Pricing Quick — white bg */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, credit-based pricing
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Pay only for what you use. No subscriptions, no hidden fees.
              Start with 20 free credits.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-3xl mx-auto">
            {[
              { name: "Text Query", cost: "1 credit", icon: FlashIcon, color: "text-amber-600", bg: "bg-amber-50" },
              { name: "Screenshot", cost: "2 credits", icon: EyeIcon, color: "text-sky-600", bg: "bg-sky-50" },
              { name: "Voice Query", cost: "3 credits", icon: Mic01Icon, color: "text-emerald-600", bg: "bg-emerald-50" },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-xl p-4 sm:p-6 text-center border border-gray-100 hover:border-sky-200 hover:shadow-md shadow-sm transition-all"
              >
                <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon icon={item.icon} size={20} className={item.color} />
                </div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500 mt-1">{item.cost}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium text-sm transition-colors"
            >
              View all plans
              <Icon icon={ArrowRight02Icon} size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust / Positioning — light gray bg */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Designed for when it matters
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Ghost enhances your natural ability, helping you think clearer
              and articulate better in interviews, meetings, and presentations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {trustPoints.map((t) => (
              <div key={t.title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 rounded-xl ${t.bg} flex items-center justify-center mb-4`}>
                  <Icon icon={t.icon} size={20} className={t.color} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data & Privacy — white bg, required for Google OAuth verification */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your data &amp; privacy
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We believe in full transparency about how your data is used.
              Ghost is built with privacy at its core.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mb-4">
                <Icon icon={UserCheck01Icon} size={20} className="text-sky-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">What we collect</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                When you sign in, we collect your name and email address to create and manage your account.
                We use this to authenticate you and deliver the service.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                <Icon icon={LockIcon} size={20} className="text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">How we protect it</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your data is encrypted in transit and at rest. We never sell your personal information
                to third parties. AI queries are not stored beyond your active session.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
                <Icon icon={File01Icon} size={20} className="text-violet-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Your rights</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                You can request deletion of your account and all associated data at any time
                by contacting us. You remain in full control of your information.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium text-sm transition-colors"
            >
              <Icon icon={File01Icon} size={16} />
              Read our full Privacy Policy
            </Link>
            <span className="mx-3 text-gray-300">|</span>
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </section>

      {/* About Renekin — light bg */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
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
          <p className="text-gray-500 text-lg leading-relaxed">
            Renekin AI builds invisible, purpose-built AI tools that understand context,
            work silently in the background, and help professionals perform at their best.
            Ghost is our first product, with more to come.
          </p>
        </div>
      </section>

      {/* Final CTA — blue gradient */}
      <section className="bg-gradient-to-r from-sky-400 to-sky-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for your next big moment?
          </h2>
          <p className="text-white/85 mb-8 max-w-lg mx-auto">
            Start with 20 free credits. Download Ghost and get instant
            AI-powered assistance in your next interview, meeting, or presentation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 bg-white text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Start Free
              <Icon icon={ArrowRight02Icon} size={20} />
            </Link>
            <Link
              href="/pricing"
              className="text-white/90 hover:text-white font-medium text-lg transition-colors"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
