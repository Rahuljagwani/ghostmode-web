"use client";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

function InnerButton({ onError }: { onError: (msg: string) => void }) {
  const { googleLogin } = useAuth();

  return (
    <GoogleLogin
      onSuccess={async (resp) => {
        if (resp.credential) {
          try {
            await googleLogin(resp.credential);
          } catch {
            onError("Google sign-in failed. Please try again.");
          }
        }
      }}
      onError={() => onError("Google sign-in failed.")}
      theme="filled_black"
      size="large"
      width="100%"
      text="continue_with"
    />
  );
}

export default function GoogleSignInButton() {
  const [error, setError] = useState("");

  if (!GOOGLE_CLIENT_ID) return null;

  return (
    <div>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <InnerButton onError={setError} />
      </GoogleOAuthProvider>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
}
