import Link from "next/link";
import Image from "next/image";
import { Ghost } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/renekin-logo.svg"
                alt="Renekin AI"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <span className="font-bold text-gray-900">Renekin AI</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              Intelligent, invisible copilot for professionals.
              <br />
              Think better. Answer faster.
            </p>
            <Link href="/#ghost" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-violet-600 transition-colors">
              <Ghost className="w-3.5 h-3.5" />
              Ghost, AI Interview Copilot
            </Link>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-3 text-sm">Product</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="/#ghost" className="hover:text-gray-900 transition-colors">Ghost</Link>
              <Link href="/#features" className="hover:text-gray-900 transition-colors">Features</Link>
              <Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
              <Link href="/download" className="hover:text-gray-900 transition-colors">Download</Link>
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-3 text-sm">Account</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="/login" className="hover:text-gray-900 transition-colors">Sign In</Link>
              <Link href="/register" className="hover:text-gray-900 transition-colors">Register</Link>
              <Link href="/dashboard" className="hover:text-gray-900 transition-colors">Dashboard</Link>
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-3 text-sm">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="/contact" className="hover:text-gray-900 transition-colors">Contact Us</Link>
              <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
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
