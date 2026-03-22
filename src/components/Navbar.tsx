"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
import { LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/renekin-logo.svg"
            alt="Renekin AI"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-bold text-lg text-gray-900">Renekin AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          <Link href="/#ghost" className="hover:text-gray-900 transition-colors">
            Ghost
          </Link>
          <Link href="/#features" className="hover:text-gray-900 transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-gray-900 transition-colors">
            Pricing
          </Link>
          <Link href="/download" className="hover:text-gray-900 transition-colors">
            Download
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
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
