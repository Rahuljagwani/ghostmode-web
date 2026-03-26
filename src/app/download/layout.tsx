import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Ghost",
  description:
    "Download Ghost for macOS and Windows. An invisible AI interview copilot that helps you ace interviews, meetings, and presentations — hidden from screen sharing.",
  alternates: { canonical: "https://renekin.com/download" },
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
