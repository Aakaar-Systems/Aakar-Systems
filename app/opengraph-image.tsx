import { ImageResponse } from "next/og";

export const alt = "Aakaar Systems — AI business systems studio, India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time. Same drafting language as the site: ink ground,
 * a measured grid, and a small node diagram standing in for the system.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1113",
          padding: 72,
          fontFamily: "sans-serif",
          backgroundImage:
            "linear-gradient(to right, rgba(76,155,232,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(76,155,232,0.07) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 28, height: 2, background: "#d9a441" }} />
          <div style={{ color: "#93a5ab", fontSize: 24, letterSpacing: 1 }}>
            aakaar systems — india
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#e6edef",
              fontSize: 68,
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 940,
              display: "flex",
            }}
          >
            Systems that capture leads, automate the repetitive work, and keep you open
            around the clock.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {["Capture", "Automate", "Optimize"].map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  display: "flex",
                  border: "1px solid #4c9be8",
                  background: "#16385e",
                  color: "#e6edef",
                  fontSize: 26,
                  padding: "12px 26px",
                  borderRadius: 3,
                }}
              >
                {label}
              </div>
              {i < 2 && <div style={{ width: 52, height: 1, background: "#4c9be8" }} />}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ color: "#3fa98a", fontSize: 26 }}>WhatsApp-first</div>
        </div>
      </div>
    ),
    size,
  );
}
