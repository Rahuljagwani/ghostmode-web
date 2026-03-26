"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
import { LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 py-3 px-6">
      <div className="max-w-6xl mx-auto h-14 flex items-center justify-between px-6 rounded-full bg-white/35 backdrop-blur-xl border border-white/50 shadow-lg shadow-black/5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/renekin-logo-blue.svg"
            alt="Renekin AI"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="font-bold text-lg text-gray-900">
            Renekin AI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800">
          <Link href="/#ghost" className="hover:text-gray-950 transition-colors">
            Ghost
          </Link>
          <Link href="/#features" className="hover:text-gray-950 transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-gray-950 transition-colors">
            Pricing
          </Link>
          <Link href="/download" className="hover:text-gray-950 transition-colors">
            Download
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-gray-800 bg-white/80 hover:bg-white px-5 py-2 rounded-full font-medium transition-colors shadow-sm"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
