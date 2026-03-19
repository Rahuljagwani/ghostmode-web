"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Brain, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Brain className="w-6 h-6 text-purple-400" />
          <span className="text-white font-bold text-xl">Renekin</span>
          <span className="text-purple-400 font-medium text-sm">AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <Link href="/#products" className="hover:text-white transition">
            Products
          </Link>
          <Link href="/pricing" className="hover:text-white transition">
            Pricing
          </Link>
          <Link href="/download" className="hover:text-white transition">
            Download
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
