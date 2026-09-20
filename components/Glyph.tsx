/**
 * Line glyphs, drawn in the same hairline language as every diagram on the
 * site — no filled icon set, nothing borrowed. They exist so a row of text
 * becomes a row of pictures, which is most of what makes a page skimmable
 * for someone reading it on a phone between other work.
 */

const PATHS: Record<string, React.ReactNode> = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  rule: (
    <>
      <rect x="2" y="8" width="20" height="8" rx="1" />
      <path d="M6 8v3M10 8v4M14 8v3M18 8v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H9l-5 4V5Z" />
      <path d="M8.5 10.5h7" />
    </>
  ),
  phone: (
    <>
      <path d="M6 3h4l1.5 4-2.5 1.5a11 11 0 0 0 6.5 6.5L17 12.5 21 14v4a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
    </>
  ),
  /* the three plain-language promises */
  sunrise: (
    <>
      <path d="M3 18h18M6.5 18a5.5 5.5 0 0 1 11 0" />
      <path d="M12 5.5V8M5.6 8.1l1.5 1.5M18.4 8.1l-1.5 1.5" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v5M15 3v5" />
      <rect x="6" y="8" width="12" height="6" rx="2" />
      <path d="M12 14v4a3 3 0 0 0 3 3h2" />
    </>
  ),
  handover: (
    <>
      <rect x="2.5" y="7" width="8" height="10" rx="1.5" />
      <circle cx="18" cy="9" r="3" />
      <path d="M14.5 20a3.5 3.5 0 0 1 7 0M10.5 12h3.5" />
    </>
  ),
};

export function Glyph({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {path}
    </svg>
  );
}
