"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
import { LogOut, LayoutDashboard, Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 py-3 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto h-14 flex items-center justify-between px-4 sm:px-6 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-lg shadow-black/5">
        <Link href="/" className="flex items-center gap-2">
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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-900">
          <Link href="/#ghost" className="hover:text-sky-600 transition-colors">
            Ghost
          </Link>
          <Link href="/#features" className="hover:text-sky-600 transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-sky-600 transition-colors">
            Pricing
          </Link>
          <Link href="/download" className="hover:text-sky-600 transition-colors">
            Download
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-sky-600 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="sm:hidden flex items-center text-sm text-gray-900"
              >
                <LayoutDashboard className="w-5 h-5" />
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-gray-800 bg-white/80 hover:bg-white px-4 sm:px-5 py-2 rounded-full font-medium transition-colors shadow-sm"
            >
              Sign in
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center text-gray-900 hover:text-sky-600 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="md:hidden mt-2 mx-auto max-w-6xl bg-white/80 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg p-4 animate-[fadeInUp_0.2s_ease-out_both]">
          <div className="flex flex-col gap-1">
            <Link
              href="/#ghost"
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-900 hover:bg-sky-50 hover:text-sky-600 transition-colors"
            >
              Ghost
            </Link>
            <Link
              href="/#features"
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-900 hover:bg-sky-50 hover:text-sky-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-900 hover:bg-sky-50 hover:text-sky-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/download"
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-900 hover:bg-sky-50 hover:text-sky-600 transition-colors"
            >
              Download
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-900 hover:bg-sky-50 hover:text-sky-600 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
