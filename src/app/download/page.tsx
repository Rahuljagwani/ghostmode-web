"use client";

import { useEffect, useState } from "react";
import { Apple, Monitor, Download, CheckCircle } from "lucide-react";

type Platform = "macos" | "windows" | "unknown";

const DOWNLOADS_BASE = process.env.NEXT_PUBLIC_DOWNLOADS_URL || "https://renekin-ghost-releases.s3.ap-south-1.amazonaws.com/downloads";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "macos";
  if (ua.includes("win")) return "windows";
  return "unknown";
}

const platforms = {
  macos: {
    label: "macOS",
    icon: Apple,
    filename: "Ghost.dmg",
    downloadUrl: `${DOWNLOADS_BASE}/Ghost.dmg`,
    version: "v0.1.0",
    requirement: "macOS 12+",
    instructions: [
      "Open the downloaded .dmg file",
      "Drag Ghost to your Applications folder",
      "Right-click the app and select Open (first time only, to bypass Gatekeeper)",
      "Sign in with your Ghost account",
    ],
  },
  windows: {
    label: "Windows",
    icon: Monitor,
    filename: "Ghost-Setup.exe",
    downloadUrl: `${DOWNLOADS_BASE}/Ghost-Setup.exe`,
    version: "v0.1.0",
    requirement: "Windows 10+",
    instructions: [
      "Run the downloaded .exe installer",
      'If Windows Defender warns you, click "More info" then "Run anyway"',
      "Follow the installation wizard",
      "Launch Ghost and sign in",
    ],
  },
};

export default function DownloadPage() {
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const primary = platform !== "unknown" ? platform : "macos";
  const secondary = primary === "macos" ? "windows" : "macos";

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Download Ghost
        </h1>
        <p className="text-gray-500 text-lg">
          Available for macOS and Windows. Free to get started.
        </p>
      </div>

      {/* Primary download */}
      <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center mb-6 shadow-sm">
        <div className="flex items-center justify-center gap-3 mb-6">
          {(() => {
            const Icon = platforms[primary].icon;
            return <Icon className="w-8 h-8 text-gray-700" />;
          })()}
          <h2 className="text-2xl font-bold text-gray-900">
            Ghost for {platforms[primary].label}
          </h2>
        </div>

        <a
          href={platforms[primary].downloadUrl}
          className="bg-violet-600 hover:bg-violet-700 text-white px-10 py-3.5 rounded-xl font-medium text-lg transition-colors inline-flex items-center gap-2 mb-4 shadow-sm"
        >
          <Download className="w-5 h-5" />
          Download {platforms[primary].filename}
        </a>

        <p className="text-gray-400 text-sm">
          {platforms[primary].version} &middot; Requires {platforms[primary].requirement}
        </p>
      </div>

      {/* Secondary download */}
      <div className="text-center mb-4">
        <p className="text-gray-500 text-sm">
          Looking for{" "}
          <button
            onClick={() => setPlatform(secondary)}
            className="text-violet-600 hover:text-violet-700 transition-colors font-medium"
          >
            {platforms[secondary].label}
          </button>
          ?
        </p>
      </div>

      <div className="text-center mb-16" />

      {/* Installation instructions */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Installation ({platforms[primary].label})
        </h3>
        <ol className="space-y-4">
          {platforms[primary].instructions.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 text-sm flex items-center justify-center shrink-0 mt-0.5 font-medium">
                {i + 1}
              </span>
              <span className="text-gray-600 text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* System requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Apple className="w-5 h-5 text-gray-400" />
            macOS Requirements
          </h4>
          <ul className="text-sm text-gray-500 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
              macOS 12 (Monterey) or later
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
              Apple Silicon or Intel processor
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
              Screen Recording permission required
            </li>
          </ul>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-gray-400" />
            Windows Requirements
          </h4>
          <ul className="text-sm text-gray-500 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
              Windows 10 (1903) or later
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
              WebView2 runtime (auto-installed)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
              64-bit processor
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
