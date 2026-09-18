"use client";

import { site, socials, whatsappHref } from "@/lib/site";
import { WhatsAppMark } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="rule-t">
      <div className="shell py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
          <div>
            <p className="font-display text-3xl leading-none text-paper">
              Aakaar<span className="text-blue">.</span>
            </p>
            <p className="mt-4 max-w-xs text-paper-dim">{site.tagline}</p>
            <p className="annot mt-6">आकार — form, shape, manifestation</p>
          </div>

          <div>
            <p className="annot">reach us</p>
            <ul className="mt-2">
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[2.5rem] items-center gap-2 text-paper transition-colors hover:text-jade"
                >
                  <WhatsAppMark className="h-[0.95em] w-[0.95em]" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-[2.5rem] items-center text-paper transition-colors hover:text-blue"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a href="#contact" className="inline-flex min-h-[2.5rem] items-center text-paper transition-colors hover:text-blue">
                  Start a project
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="annot">elsewhere</p>
            <ul className="mt-2">
              {socials.map((s) => (
                <li key={s.label}>
                  {s.pending ? (
                    <span className="inline-flex items-baseline gap-2 text-paper-faint">
                      {s.label}
                      <span className="annot text-[0.625rem]">soon</span>
                    </span>
                  ) : (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[2.5rem] items-center text-paper transition-colors hover:text-blue"
                    >
                      {s.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="annot">
            © {year} {site.name}. Built in India.
          </p>
          <p className="annot">
            No client logos or testimonials here yet — we will add them when they are real.
          </p>
        </div>
      </div>
    </footer>
  );
}
