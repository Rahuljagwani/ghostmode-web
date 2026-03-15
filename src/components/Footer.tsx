import Link from "next/link";
import { Ghost } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <Ghost className="w-5 h-5 text-purple-400" />
              GhostMode
            </div>
            <p className="text-sm text-gray-500">
              Your invisible AI interview assistant.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
              <Link href="/download" className="hover:text-white transition">Download</Link>
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
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} GhostMode. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
