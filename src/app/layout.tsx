import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PostHogProvider } from "@/providers/PostHogProvider";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";
import ReferralCapture from "@/components/ReferralCapture";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://renekin.com";
const siteName = "Renekin AI";
const siteTitle = "AI Interview Copilot & Assistant | Ghost by Renekin AI";
const siteDescription =
  "Ghost is a real-time AI interview copilot for coding, technical and HR interviews. Live answers on Mac and Windows, hidden from screen share. 20 free credits.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Renekin AI",
  },
  description: siteDescription,
  keywords: [
    "AI interview copilot",
    "AI interview assistant",
    "real-time interview assistant",
    "AI coding interview assistant",
    "interview copilot",
    "real-time interview help",
    "invisible AI assistant",
    "screen sharing safe",
    "Ghost AI",
    "Renekin AI",
    "meeting assistant",
    "behavioral interview prep",
    "technical interview help",
    "coding interview assistant",
  ],
  authors: [{ name: "Renekin AI", url: siteUrl }],
  creator: "Renekin AI",
  publisher: "Renekin AI",
  icons: {
    icon: "/favicon.svg",
    apple: "/renekin-logo-blue.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 min-h-screen`}
      >
        <PostHogProvider>
          <AuthProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
          </AuthProvider>
          <Analytics />
          <CookieBanner />
          <Suspense fallback={null}>
            <ReferralCapture />
          </Suspense>
        </PostHogProvider>
      </body>
    </html>
  );
}
