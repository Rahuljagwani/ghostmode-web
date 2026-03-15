"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import { Loader2, Check } from "lucide-react";

export default function SettingsPage() {
  const { user, refreshProfile } = useAuth();
  const [byokEnabled, setByokEnabled] = useState(user?.is_byok_enabled ?? false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleByok = async () => {
    setSaving(true);
    try {
      const next = !byokEnabled;
      await apiFetch(`/credits/byok?enabled=${next}`, { method: "PATCH" });
      setByokEnabled(next);
      setSaved(true);
      await refreshProfile();
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-gray-400 text-sm mb-8">Manage your account settings.</p>

      {/* Profile */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <p className="text-white">{user?.name || "—"}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <p className="text-white">{user?.email || "—"}</p>
          </div>
        </div>
      </div>

      {/* BYOK */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">Bring Your Own Key (BYOK)</h2>
        <p className="text-gray-400 text-sm mb-4">
          When enabled, the desktop app uses your own Claude API key instead of
          consuming credits. You pay Anthropic directly.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleByok}
            disabled={saving}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              byokEnabled ? "bg-purple-600" : "bg-white/10"
            }`}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                byokEnabled ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-sm text-gray-300">
            {byokEnabled ? "Enabled" : "Disabled"}
          </span>
          {saving && <Loader2 className="w-4 h-4 animate-spin text-gray-500" />}
          {saved && <Check className="w-4 h-4 text-green-400" />}
        </div>
      </div>
    </div>
  );
}
