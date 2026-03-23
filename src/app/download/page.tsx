"use client";

import { useEffect, useState } from "react";
import { Apple, Monitor, Download, CheckCircle, Shield, AlertTriangle, Archive } from "lucide-react";

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
      "Open the app — macOS may block it the first time",
      "Sign in with your Ghost account",
    ],
  },
  windows: {
    label: "Windows",
    icon: Monitor,
    filename: "Ghost-Setup.exe",
    downloadUrl: `${DOWNLOADS_BASE}/Ghost-Setup.exe`,
    zipFilename: "Ghost-Portable.zip",
    zipUrl: `${DOWNLOADS_BASE}/Ghost-Portable.zip`,
    version: "v0.1.0",
    requirement: "Windows 10+",
    instructions: [
      "Run the downloaded .exe installer",
      'If SmartScreen warns you, click "More info" → "Run anyway"',
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

        {/* .zip alternative for Windows */}
        {primary === "windows" && (
          <div className="mt-3">
            <a
              href={(platforms.windows as typeof platforms.windows).zipUrl}
              className="text-violet-600 hover:text-violet-700 text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              <Archive className="w-4 h-4" />
              Or download portable .zip (no installer)
            </a>
          </div>
        )}

        <p className="text-gray-400 text-sm mt-3">
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

      {/* Platform-specific security bypass guide */}
      {primary === "windows" && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            Windows SmartScreen Warning
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Ghost is a new app, so Windows may show a security warning. This is normal for all new software.
            Here are two ways to install:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option A: EXE */}
            <div className="bg-white rounded-xl p-5 border border-amber-100">
              <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                <Download className="w-4 h-4 text-violet-500" />
                Option A: Installer (.exe)
              </h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="text-violet-600 font-medium shrink-0">1.</span>
                  Run <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Ghost-Setup.exe</code>
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-600 font-medium shrink-0">2.</span>
                  Click <strong>&quot;More info&quot;</strong> on the blue warning
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-600 font-medium shrink-0">3.</span>
                  Click <strong>&quot;Run anyway&quot;</strong>
                </li>
              </ol>
            </div>

            {/* Option B: ZIP */}
            <div className="bg-white rounded-xl p-5 border border-green-200">
              <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
                <Archive className="w-4 h-4 text-green-500" />
                Option B: Portable (.zip) — No warning
              </h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="text-green-600 font-medium shrink-0">1.</span>
                  Download <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Ghost-Portable.zip</code>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 font-medium shrink-0">2.</span>
                  Extract with <a href="https://7-zip.org" target="_blank" rel="noopener" className="text-violet-600 hover:underline">7-Zip</a> (free)
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 font-medium shrink-0">3.</span>
                  Run <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Ghost.exe</code> — no warnings
                </li>
              </ol>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4 flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            This warning only appears because Ghost is new. It will go away automatically as more people download the app.
          </p>
        </div>
      )}

      {primary === "macos" && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            macOS Gatekeeper Warning
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            macOS may block Ghost the first time you open it. Here&apos;s how to allow it:
          </p>

          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-sm flex items-center justify-center shrink-0 font-medium">1</span>
              <span>Try to open Ghost — macOS will block it and show a warning</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-sm flex items-center justify-center shrink-0 font-medium">2</span>
              <span>Go to <strong>System Settings → Privacy &amp; Security</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-sm flex items-center justify-center shrink-0 font-medium">3</span>
              <span>Scroll down to Security — you&apos;ll see <strong>&quot;Ghost was blocked...&quot;</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-sm flex items-center justify-center shrink-0 font-medium">4</span>
              <span>Click <strong>&quot;Open Anyway&quot;</strong> and confirm</span>
            </li>
          </ol>

          <div className="mt-4 bg-white rounded-xl p-4 border border-amber-100">
            <p className="text-xs text-gray-500 mb-2 font-medium">Alternative (Terminal):</p>
            <code className="text-xs bg-gray-100 px-3 py-1.5 rounded-lg block text-gray-700">
              xattr -d com.apple.quarantine /Applications/Ghost.app
            </code>
            <p className="text-xs text-gray-400 mt-2">
              Run this command, then open Ghost normally. This removes the quarantine flag.
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-4 flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            This is a one-time step. Once allowed, Ghost will open normally every time. This warning will be removed in a future update once our app is signed by Apple.
          </p>
        </div>
      )}

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
