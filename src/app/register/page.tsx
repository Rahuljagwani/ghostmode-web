"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { Ghost } from "lucide-react";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromApp = searchParams.get("from") === "app";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const userData = await register(email, password, name);
      if (fromApp) {
        setRegistered(true);
      } else if (!userData.is_email_verified) {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (registered && fromApp) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-200 shadow-sm">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={48} className="text-emerald-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Account created!</h1>
            <p className="text-gray-500 text-sm mb-6">
              Check your email for a verification code, then sign in from the Ghost app.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900">
              <span className="font-medium">{email}</span>
            </div>
            <p className="text-gray-400 text-xs mt-4">You can close this tab now.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-200 shadow-sm">
          <div className="text-center mb-8">
            <Ghost className="w-10 h-10 text-sky-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="text-gray-500 text-sm mt-1">Start with 20 free credits. No card required.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5 font-medium">Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 transition"
                placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5 font-medium">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 transition"
                placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5 font-medium">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 transition"
                placeholder="Min. 6 characters" />
            </div>

            {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-50 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
              {loading && <HugeiconsIcon icon={Loading03Icon} size={16} className="animate-spin" />}
              Create Account
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <GoogleSignInButton />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-sky-600 font-medium hover:text-sky-700 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
