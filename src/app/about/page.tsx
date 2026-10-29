import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import { InstagramIcon, YoutubeIcon, Linkedin01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { SOCIAL_LINKS } from "@/lib/social";

const URL = "https://renekin.com/about";

export const metadata: Metadata = {
  title: "About Us: The Team Behind Ghost",
  description:
    "Renekin AI builds Ghost, a real-time AI copilot for interviews and meetings. Learn what we build, how we price it, and how to reach us.",
  alternates: { canonical: URL },
  openGraph: { url: URL, title: "About Renekin AI", images: ["/opengraph-image"] },
};

const SOCIAL_ICONS = { Instagram: InstagramIcon, YouTube: YoutubeIcon, LinkedIn: Linkedin01Icon };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: URL,
  name: "About Renekin AI",
  mainEntity: {
    "@type": "Organization",
    "@id": "https://renekin.com/#organization",
    name: "Renekin AI",
    url: "https://renekin.com",
    logo: "https://renekin.com/renekin-logo-blue.svg",
    email: "socials@renekin.com",
    slogan: "Renaissance knowledge meets modern AI.",
    publishingPrinciples: "https://renekin.com/how-we-write",
    sameAs: SOCIAL_LINKS.map((l) => l.href),
  },
};

const principles: [string, string][] = [
  [
    "Pay for what you use",
    "Job hunts are bursty, so Ghost uses one-time credit packs instead of a subscription. Nothing renews automatically, and every new account starts with 20 free credits.",
  ],
  [
    "Help you think, not replace you",
    "Ghost gives you structure and key points in the moment. You still answer in your own words, from your own experience.",
  ],
  [
    "Out of your way",
    "A small floating window that stays on top, hidden from screen share, and disappears with one hotkey when you need it to.",
  ],
  [
    "Clear about your data",
    "Screenshots and audio recordings are processed in real time and never stored. Our privacy policy explains exactly what we keep and why.",
  ],
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-14">
          <Image src="/renekin-logo-blue.svg" alt="Renekin AI" width={64} height={64} className="mx-auto mb-6 rounded-2xl" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Renekin AI</h1>
          <p className="text-gray-500 text-lg">Renaissance knowledge meets modern AI.</p>
        </div>

        <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
          <p>
            Renekin AI builds focused AI tools for the moments that matter most at work: the interview you&apos;ve
            prepared weeks for, the client call that decides a deal, the presentation where someone asks the question
            you didn&apos;t expect.
          </p>
          <p>
            Our first product is <strong className="text-gray-900">Ghost</strong>, a real-time AI copilot for
            interviews and meetings. Ghost listens to the conversation, reads what&apos;s on your screen, and suggests
            clear, structured answers in seconds. It runs on macOS and Windows and stays hidden from screen share in
            Zoom, Google Meet and Microsoft Teams.
          </p>
          <p>
            We&apos;re a small, independent team, and we read every message that comes in. If you have feedback, an
            idea, or want to partner with us, we&apos;d love to hear from you.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-14 mb-6">What we believe</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map(([title, desc]) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-14 mb-6">Explore Ghost</h2>
        <ul className="space-y-2 text-lg">
          <li>
            <Link href="/ai-interview-assistant" className="text-sky-600 hover:text-sky-700 underline underline-offset-2">
              AI interview assistant
            </Link>
          </li>
          <li>
            <Link href="/ai-coding-interview-assistant" className="text-sky-600 hover:text-sky-700 underline underline-offset-2">
              AI coding interview assistant
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="text-sky-600 hover:text-sky-700 underline underline-offset-2">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-sky-600 hover:text-sky-700 underline underline-offset-2">
              Blog
            </Link>
          </li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-14 mb-6">Get in touch</h2>
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
          <a href="mailto:socials@renekin.com" className="flex items-center gap-3 text-gray-700 hover:text-sky-600 transition-colors">
            <Icon icon={Mail01Icon} size={20} />
            socials@renekin.com
          </a>
          {SOCIAL_LINKS.map((l) => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 hover:text-sky-600 transition-colors"
            >
              <Icon icon={SOCIAL_ICONS[l.name]} size={20} />
              Renekin AI on {l.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
