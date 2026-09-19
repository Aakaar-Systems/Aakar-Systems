/**
 * A progressive blur strip under the fixed header. Content softens as it
 * slides beneath the bar rather than colliding with it — the same trick the
 * reference site uses, but masked so it fades out instead of ending on a
 * hard edge. Non-interactive, and it sits between the page and the header.
 */
export function TopScrim() {
  return (
    <div
      aria-hidden
      className="top-scrim pointer-events-none fixed inset-x-0 top-0 z-40 h-24 md:h-28"
    />
  );
}
