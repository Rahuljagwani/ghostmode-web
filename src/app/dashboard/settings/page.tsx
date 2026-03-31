"use client";

import { useAuth } from "@/lib/auth";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
      <p className="text-gray-500 text-sm mb-8">Manage your account settings.</p>

      {/* Profile */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Name</label>
            <p className="text-gray-900 font-medium">{user?.name || "\u2014"}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <p className="text-gray-900 font-medium">{user?.email || "\u2014"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
