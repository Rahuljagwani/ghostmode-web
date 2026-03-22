"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Ghost, CheckCircle, XCircle } from "lucide-react";

export default function AuthSuccessPage() {
  return (
    <Suspense>
      <AuthSuccessContent />
    </Suspense>
  );
}

function AuthSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const statusParam = searchParams.get("status");
    const messageParam = searchParams.get("message");
    const source = searchParams.get("source");

    if (token) {
      localStorage.setItem("renekin_token", token);
      setStatus("ok");
      setMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } else if (statusParam === "ok" && source === "desktop") {
      setStatus("ok");
      setMessage("Login successful! You can close this tab and return to Ghost.");
    } else if (statusParam === "error") {
      setStatus("error");
      setMessage(messageParam || "Login failed. Please try again.");
    } else {
      setStatus("error");
      setMessage("Invalid callback. Please try again.");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 bg-gray-50">
      <div className="w-full max-w-sm text-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <Ghost className="w-10 h-10 text-violet-600 mx-auto mb-6" />

          {status === "loading" && (
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
              <p className="text-gray-500 text-sm">Processing...</p>
            </div>
          )}

          {status === "ok" && (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle className="w-12 h-12 text-green-500" />
              <h1 className="text-xl font-bold text-gray-900">Login Successful!</h1>
              <p className="text-gray-500 text-sm">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-3">
              <XCircle className="w-12 h-12 text-red-500" />
              <h1 className="text-xl font-bold text-gray-900">Login Failed</h1>
              <p className="text-gray-500 text-sm">{message}</p>
              <button
                onClick={() => router.push("/login")}
                className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
