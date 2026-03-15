"use client";

import { useEffect, useState } from "react";
import { Apple, Monitor, Download } from "lucide-react";

type Platform = "macos" | "windows" | "unknown";

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
    filename: "GhostMode.dmg",
    instructions: [
      "Open the downloaded .dmg file",
      "Drag GhostMode to your Applications folder",
      "Right-click the app and select Open (first time only, to bypass Gatekeeper)",
      "Sign in with your GhostMode account",
    ],
  },
  windows: {
    label: "Windows",
    icon: Monitor,
    filename: "GhostMode-Setup.exe",
    instructions: [
      "Run the downloaded .exe installer",
      'If Windows Defender warns you, click "More info" then "Run anyway"',
      "Follow the installation wizard",
      "Launch GhostMode and sign in",
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Download GhostMode
        </h1>
        <p className="text-gray-400 text-lg">
          Available for macOS and Windows. Linux coming soon.
        </p>
      </div>

      {/* Primary download */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          {(() => {
            const Icon = platforms[primary].icon;
            return <Icon className="w-8 h-8 text-purple-400" />;
          })()}
          <h2 className="text-2xl font-bold">
            GhostMode for {platforms[primary].label}
          </h2>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium text-lg transition inline-flex items-center gap-2 mb-4">
          <Download className="w-5 h-5" />
          Download {platforms[primary].filename}
        </button>

        <p className="text-gray-500 text-sm">
          v0.1.0 &middot; Requires {primary === "macos" ? "macOS 12+" : "Windows 10+"}
        </p>
      </div>

      {/* Secondary download */}
      <div className="text-center mb-16">
        <p className="text-gray-400 text-sm">
          Looking for{" "}
          <button
            onClick={() => setPlatform(secondary)}
            className="text-purple-400 hover:text-purple-300 transition underline"
          >
            {platforms[secondary].label}
          </button>
          ?
        </p>
      </div>

      {/* Installation instructions */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-semibold mb-6">
          Installation Instructions ({platforms[primary].label})
        </h3>
        <ol className="space-y-4">
          {platforms[primary].instructions.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-purple-600/20 text-purple-400 text-sm flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-gray-300">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* System requirements */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Apple className="w-5 h-5 text-gray-400" />
            macOS Requirements
          </h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>macOS 12 (Monterey) or later</li>
            <li>Apple Silicon or Intel processor</li>
            <li>Screen Recording permission required</li>
          </ul>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-gray-400" />
            Windows Requirements
          </h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Windows 10 (1903) or later</li>
            <li>WebView2 runtime (auto-installed)</li>
            <li>64-bit processor</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
