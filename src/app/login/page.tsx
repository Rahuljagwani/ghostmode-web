"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";
// TODO: Uncomment after Google OAuth verification
// import GoogleSignInButton from "@/components/GoogleSignInButton";
import { Ghost, Loader2 } from "lucide-react";

const ERROR_MESSAGES: Record<string, string> = {
  google_failed: "Google sign-in failed. Please try again.",
  session_expired: "Session expired. Please try again.",
  token_exchange_failed: "Authentication failed. Please try again.",
  no_token: "Could not complete sign-in. Please try again.",
  invalid_token: "Invalid authentication. Please try again.",
};

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(ERROR_MESSAGES[errorParam] || "Login failed. Please try again.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userData = await login(email, password);
      if (!userData.is_email_verified) {
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

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 bg-gray-50/50">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <Ghost className="w-10 h-10 text-violet-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to your Ghost account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5 font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1.5 font-medium">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
                placeholder="Your password"
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign In
            </button>
          </form>

          {/* TODO: Uncomment after Google OAuth verification
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-400">
                or continue with
              </span>
            </div>
          </div>

          <GoogleSignInButton />
          */}
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-violet-600 hover:text-violet-700 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
