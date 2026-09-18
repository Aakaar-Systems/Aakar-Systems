"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { nav, whatsappHref } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";
import { WhatsAppMark } from "./ui";
import { ScrollProgress } from "./ScrollProgress";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-ink/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link href="/" className="group flex items-baseline gap-2 py-2">
          <span className="font-display text-[1.375rem] leading-none text-paper">Aakaar</span>
          <span className="annot text-paper-faint transition-colors group-hover:text-blue">
            systems
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-[2.75rem] items-center text-[0.875rem] transition-colors ${
                  active ? "text-paper" : "text-paper-dim hover:text-paper"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId={reduced ? undefined : "nav-active"}
                    className="absolute bottom-2 left-0 h-px w-full bg-blue"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-[3px] border border-line bg-raised/40 px-4 py-2.5 text-[0.875rem] text-paper transition-[border-color,color,background-color] duration-300 hover:border-jade/70 hover:bg-jade/[0.08] hover:text-jade sm:inline-flex"
          >
            <WhatsAppMark />
            Talk to us
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-[3px] border border-line bg-raised/40 text-paper transition-colors duration-300 hover:border-line-bright lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden focusable="false">
              <path
                d={open ? "M5 5l10 10M15 5L5 15" : "M3 6h14M3 14h14"}
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      {scrolled && <ScrollProgress />}

      {open && (
        <motion.div
          id="mobile-nav"
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="border-t border-line bg-ink lg:hidden"
        >
          <nav aria-label="Primary, mobile" className="shell flex flex-col py-2">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 border-b border-line-soft py-3.5 transition-colors ${
                    active ? "text-paper" : "text-paper-dim hover:text-paper"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-px w-4 ${active ? "bg-blue" : "bg-line"}`}
                  />
                  {item.label}
                </Link>
              );
            })}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 py-3.5 text-jade"
            >
              <WhatsAppMark />
              Message us on WhatsApp
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
