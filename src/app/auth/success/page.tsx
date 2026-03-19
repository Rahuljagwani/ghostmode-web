"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Ghost, CheckCircle, XCircle } from "lucide-react";

export default function AuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login: _login } = useAuth();
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const statusParam = searchParams.get("status");
    const messageParam = searchParams.get("message");
    const source = searchParams.get("source");

    if (token) {
      // Web flow: save token and redirect to dashboard
      localStorage.setItem("ghostmode_token", token);
      setStatus("ok");
      setMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } else if (statusParam === "ok" && source === "desktop") {
      // Desktop flow: just show success message
      setStatus("ok");
      setMessage("Login successful! You can close this tab and return to GhostMode.");
    } else if (statusParam === "error") {
      setStatus("error");
      setMessage(messageParam || "Login failed. Please try again.");
    } else {
      setStatus("error");
      setMessage("Invalid callback. Please try again.");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <Ghost className="w-10 h-10 text-purple-400 mx-auto mb-6" />

        {status === "loading" && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
            <p className="text-gray-400 text-sm">Processing...</p>
          </div>
        )}

        {status === "ok" && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="w-12 h-12 text-green-400" />
            <h1 className="text-xl font-bold text-white">Login Successful!</h1>
            <p className="text-gray-400 text-sm">{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-3">
            <XCircle className="w-12 h-12 text-red-400" />
            <h1 className="text-xl font-bold text-white">Login Failed</h1>
            <p className="text-gray-400 text-sm">{message}</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
