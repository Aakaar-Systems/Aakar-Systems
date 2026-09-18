import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon: a single node with two wires into it — the smallest possible
 * version of the diagram the whole site is built around.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1113",
          borderRadius: 4,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path
            d="M6 9 C 11 9, 11 16, 14 16 M6 23 C 11 23, 11 16, 14 16 M18 16 H 26"
            stroke="#4c9be8"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="3.6" fill="#d9a441" />
        </svg>
      </div>
    ),
    size,
  );
}
