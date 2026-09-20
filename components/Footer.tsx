"use client";

import Link from "next/link";
import { nav, site, socials, whatsappHref } from "@/lib/site";
import { SocialMark, WhatsAppMark } from "./ui";

/** Underline that grows from the left on hover, rather than a colour flip. */
const LINK =
  "group inline-flex min-h-[2.375rem] items-center gap-2.5 transition-colors duration-300";
const UNDERLINE =
  "relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="shell relative py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
          <div>
            <p className="font-display text-[clamp(2.25rem,1.6rem+2.2vw,3.25rem)] leading-none text-paper">
              Aakaar<span className="text-blue">.</span>
            </p>
            <p className="mt-6 max-w-xs text-paper-dim">{site.tagline}</p>
            <p className="annot mt-6">आकार — form, shape, manifestation</p>

            {/* Marks, not link text: the wordmark should be the only words here. */}
            <ul className="mt-8 flex items-center gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  {s.pending ? (
                    <span
                      role="img"
                      title={`${s.label} — coming soon`}
                      aria-label={`${s.label}, coming soon`}
                      className="grid h-10 w-10 place-items-center rounded-[3px] border border-line text-paper-faint"
                    >
                      <SocialMark name={s.label} />
                    </span>
                  ) : (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-[3px] border border-line text-paper-dim transition-[color,border-color,background-color] duration-300 hover:border-blue/70 hover:bg-blue/[0.08] hover:text-blue"
                    >
                      <SocialMark name={s.label} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="annot">reach us</p>
            <ul className="mt-4">
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${LINK} text-paper hover:text-jade`}
                >
                  <WhatsAppMark className="h-[0.95em] w-[0.95em]" />
                  <span className={UNDERLINE}>WhatsApp</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={`${LINK} text-paper hover:text-blue`}>
                  <span className={UNDERLINE}>{site.email}</span>
                </a>
              </li>
              <li>
                <Link href="/contact" className={`${LINK} text-paper hover:text-blue`}>
                  <span className={UNDERLINE}>Start a project</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="annot">pages</p>
            <ul className="mt-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`${LINK} text-paper-dim hover:text-paper`}>
                    <span className={UNDERLINE}>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="annot">
            © {year} {site.name}. Built in India.
          </p>
          <p className="annot">
            No client logos or testimonials here yet — we will add them when they are real.
          </p>
        </div>
      </div>

      {/* The wordmark as a watermark on the bottom edge of the sheet, clipped
          by the footer so the page reads as running out rather than stopping.
          Drawn as SVG rather than a <p>: at 4% opacity it is decoration, and
          as real text it would (correctly) be flagged for contrast. */}
      <svg
        aria-hidden
        focusable="false"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none text-paper opacity-[0.05]"
        viewBox="0 0 1000 150"
        preserveAspectRatio="xMidYMax meet"
      >
        <text
          x="500"
          y="140"
          textAnchor="middle"
          fill="currentColor"
          fontSize="170"
          fontFamily="var(--font-display)"
        >
          Aakaar
        </text>
      </svg>
    </footer>
  );
}
