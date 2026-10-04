import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Ghost by Renekin AI, the real-time AI interview copilot";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/renekin-logo-blue.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 55%, #0369a1 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={72} height={72} alt="" style={{ borderRadius: 16 }} />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>Ghost by Renekin AI</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>
            AI Interview Copilot
          </div>
          <div style={{ display: "flex", fontSize: 34, opacity: 0.92, lineHeight: 1.3, maxWidth: 960 }}>
            Real-time answers in interviews and meetings, hidden from screen share.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 26, fontWeight: 600 }}>
          {["macOS & Windows", "20 free credits", "No subscription"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.18)",
                border: "2px solid rgba(255,255,255,0.35)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
