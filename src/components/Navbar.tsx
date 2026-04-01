"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon, DashboardSquare01Icon, Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 py-3 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto h-14 flex items-center justify-between px-4 sm:px-6 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-sm">
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
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
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
                className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-sky-600 transition-colors"
              >
                <HugeiconsIcon icon={DashboardSquare01Icon} size={16} />
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="sm:hidden flex items-center text-sm text-gray-700"
              >
                <HugeiconsIcon icon={DashboardSquare01Icon} size={20} />
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                <HugeiconsIcon icon={Logout01Icon} size={16} />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-white bg-sky-500 hover:bg-sky-600 px-4 sm:px-5 py-2 rounded-full font-medium transition-colors shadow-sm"
            >
              Sign in
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center text-gray-700 hover:text-sky-600 transition-colors"
          >
            <HugeiconsIcon icon={open ? Cancel01Icon : Menu01Icon} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="md:hidden mt-2 mx-auto max-w-6xl bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-lg p-4 animate-[fadeInUp_0.2s_ease-out_both]">
          <div className="flex flex-col gap-1">
            {["Ghost", "Features", "Pricing", "Download", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Ghost" ? "/#ghost" : item === "Features" ? "/#features" : `/${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
