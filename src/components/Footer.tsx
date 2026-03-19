import Link from "next/link";
import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-white font-bold text-lg">Renekin</span>
              <span className="text-purple-400 font-medium text-sm">AI</span>
            </div>
            <p className="text-sm text-gray-500">
              Renaissance knowledge meets modern AI.
              <br />
              <span className="text-gray-600">AI tools for the real world.</span>
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Products</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/#products" className="hover:text-white transition">Ghost</Link>
              <span className="text-gray-600">More coming soon</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Account</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/login" className="hover:text-white transition">Sign In</Link>
              <Link href="/register" className="hover:text-white transition">Register</Link>
              <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Renekin AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
