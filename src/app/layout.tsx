import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PostHogProvider } from "@/providers/PostHogProvider";

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
const siteDescription =
  "Renekin AI builds intelligent, invisible copilot tools for high-pressure professional moments. Ghost, our flagship product, delivers real-time answers during interviews, meetings, and presentations — completely hidden from screen sharing.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Renekin AI | Intelligent Copilot for Interviews & Meetings",
    template: "%s | Renekin AI",
  },
  description: siteDescription,
  keywords: [
    "AI interview assistant",
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
    title: "Renekin AI | Intelligent Copilot for Interviews & Meetings",
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Renekin AI — Ghost Interview Copilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renekin AI | Intelligent Copilot for Interviews & Meetings",
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
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
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        {/* Google Analytics GA4 */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 min-h-screen`}
      >
        <PostHogProvider>
          <AuthProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
          </AuthProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
