import Link from "next/link";
import Image from "next/image";
import { Ghost } from "lucide-react";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import Icon from "@/components/Icon";
import { InstagramIcon, YoutubeIcon, Linkedin01Icon } from "@hugeicons/core-free-icons";
import { SOCIAL_LINKS } from "@/lib/social";
import { FREE_TOOLS } from "@/lib/freeTools";

const SOCIAL_ICONS = { Instagram: InstagramIcon, YouTube: YoutubeIcon, LinkedIn: Linkedin01Icon };

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/renekin-logo-blue.svg"
                alt="Renekin AI"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <span className="font-bold text-gray-900">Renekin AI</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              Intelligent, invisible copilot for professionals.
            </p>
            <Link href="/#ghost" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-sky-600 transition-colors">
              <Ghost className="w-3.5 h-3.5" />
              Ghost, AI Interview Copilot
            </Link>
            <div className="flex items-center gap-3 mt-4">
              {SOCIAL_LINKS.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Renekin AI on ${l.name}`}
                  className="text-gray-400 hover:text-sky-600 transition-colors"
                >
                  <Icon icon={SOCIAL_ICONS[l.name]} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-3 text-sm">Product</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="/#ghost" className="hover:text-sky-600 transition-colors">Ghost</Link>
              <Link href="/#features" className="hover:text-sky-600 transition-colors">Features</Link>
              <Link href="/ai-interview-assistant" className="hover:text-sky-600 transition-colors">AI Interview Assistant</Link>
              <Link href="/ai-coding-interview-assistant" className="hover:text-sky-600 transition-colors">AI Coding Interview Assistant</Link>
              <Link href="/cluely-alternative" className="hover:text-sky-600 transition-colors">Cluely Alternative</Link>
              <Link href="/pricing" className="hover:text-sky-600 transition-colors">Pricing</Link>
              <Link href="/download" className="hover:text-sky-600 transition-colors">Download</Link>
              <Link href="/blog" className="hover:text-sky-600 transition-colors">Blog</Link>
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-3 text-sm">Free tools</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              {FREE_TOOLS.map((t) => (
                <Link key={t.href} href={t.href} className="hover:text-sky-600 transition-colors">
                  {t.name.replace(/"/g, "")}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-3 text-sm">Account</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="/login" className="hover:text-sky-600 transition-colors">Sign In</Link>
              <Link href="/register" className="hover:text-sky-600 transition-colors">Register</Link>
              <Link href="/dashboard" className="hover:text-sky-600 transition-colors">Dashboard</Link>
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-3 text-sm">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="/about" className="hover:text-sky-600 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-sky-600 transition-colors">Contact Us</Link>
              <Link href="/privacy" className="hover:text-sky-600 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-600 transition-colors">Terms of Service</Link>
              <CookieSettingsLink />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <span>&copy; {new Date().getFullYear()} Renekin AI. All rights reserved.</span>
          <span>Renaissance knowledge meets modern AI.</span>
        </div>
      </div>
    </footer>
  );
}
