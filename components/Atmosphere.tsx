/**
 * The page background, as a drafting sheet under a lamp.
 *
 * Four fixed layers, all non-interactive and behind the content:
 *   1. the measured grid, masked so it fades toward the sheet edges
 *   2. a cool light falling from above and a warm bounce lower right
 *   3. paper grain
 *   4. a vignette that seats the sheet on the table
 *
 * This is a server component with no state and no scroll listeners — it
 * paints once and costs nothing afterwards. The grain is a single inline
 * SVG turbulence, so it adds no network request.
 */

const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140">
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="140" height="140" filter="url(#n)"/>
    </svg>`.replace(/\s+/g, " "),
  );

export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 1 — the sheet's ruling */}
      <div className="drafting-grid grid-fade absolute inset-0" />

      {/* 2 — the lamp, and the warm bounce off the table */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 42% at 50% -8%, var(--glow-a), transparent 70%)," +
            "radial-gradient(ellipse 45% 40% at 88% 78%, var(--glow-b), transparent 72%)",
        }}
      />

      {/* 3 — paper grain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${GRAIN}")`,
          backgroundRepeat: "repeat",
          opacity: "var(--grain-opacity)",
        }}
      />

      {/* 4 — vignette, seating the sheet on the table */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 45%, transparent 55%, var(--vignette) 100%)",
        }}
      />
    </div>
  );
}
