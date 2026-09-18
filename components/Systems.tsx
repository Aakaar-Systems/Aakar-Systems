"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { systems } from "@/lib/content";
import { Reveal, SectionMark } from "./ui";

/**
 * The five productized systems, set as a spec index rather than a row of
 * identical cards. Opening a row is a deliberate act by the visitor, so the
 * detail and its wiring are revealed in response to them — not a hover-lift
 * applied uniformly to everything.
 */
export function SystemsList() {
  const [open, setOpen] = useState<string>(systems[0].id);
  const reduced = useReducedMotion();

  return (
    <ul className="border-t border-line">
      {systems.map((s, i) => {
        const isOpen = open === s.id;
        return (
          <li key={s.id} className="border-b border-line">
            <h2>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? "" : s.id)}
                aria-expanded={isOpen}
                aria-controls={`system-${s.id}`}
                className="group flex w-full items-start gap-4 py-7 text-left md:gap-8 md:py-9"
              >
                <span
                  className={`annot tnum mt-2 shrink-0 transition-colors duration-300 ${
                    isOpen ? "text-blue" : "text-paper-faint group-hover:text-blue"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-baseline md:gap-8">
                  <span
                    className={`block font-display text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] leading-tight transition-colors duration-300 ${
                      isOpen ? "text-paper" : "text-paper group-hover:text-blue"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="mt-1.5 block text-[0.9375rem] text-ochre md:mt-0">
                    {s.outcome}
                  </span>
                </span>

                {/* A plus that becomes a minus — the only state this control
                    needs to communicate. */}
                <span
                  aria-hidden
                  className="relative mt-3 h-3 w-3 shrink-0 text-paper-faint transition-colors duration-300 group-hover:text-blue"
                >
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                  <span
                    className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h2>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`system-${s.id}`}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-10 pl-[2.75rem] pr-2 md:pl-[4.25rem]">
                    <p className="max-w-2xl text-paper-dim">{s.body}</p>

                    {/* The same node-and-wire language, at the smallest scale. */}
                    <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2">
                      {s.inputs.map((input, k) => (
                        <motion.span
                          key={input}
                          initial={reduced ? false : { opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.12 + k * 0.05, duration: 0.3 }}
                          className="flex items-center gap-2"
                        >
                          <span className="annot rounded-[2px] border border-line bg-raised px-2 py-1 text-[0.6875rem] text-paper-dim">
                            {input}
                          </span>
                          {k < s.inputs.length - 1 && (
                            <span aria-hidden className="h-px w-3 bg-line" />
                          )}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

/** Home page: the five systems in brief, linking through to the full page. */
export function SystemsTeaser() {
  return (
    <section className="section scroll-mt-24">
      <div className="shell">
        <SectionMark index="04" label="what we build" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-24">
          <h2 className="font-display t-section text-paper">Five systems.</h2>
          <Reveal kind="rise" className="lede max-w-lg">
            <p>
              We do not sell hours or a bundle of services. Each of these is a defined
              system with a defined outcome, built onto the tools you already use.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((s, i) => (
            <Reveal key={s.id} kind="settle" delay={i * 0.05} as="li">
              <Link
                href="/what-we-build"
                className="group relative flex h-full flex-col justify-between gap-8 bg-ink/80 p-7 backdrop-blur-sm transition-[background-color] duration-300 hover:bg-raised md:p-8"
              >
                <div>
                  <span className="annot tnum text-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-display text-[1.625rem] leading-tight text-paper transition-colors duration-300 group-hover:text-blue">
                    {s.name}
                  </p>
                </div>
                <p className="text-[0.9375rem] leading-relaxed text-ochre">{s.outcome}</p>
              </Link>
            </Reveal>
          ))}

          <Reveal kind="settle" delay={0.3} as="li">
            <Link
              href="/what-we-build"
              className="group flex h-full flex-col justify-end gap-3 bg-raised/60 p-7 backdrop-blur-sm transition-[background-color] duration-300 hover:bg-raised md:p-8"
            >
              <p className="font-display text-[1.625rem] leading-tight text-paper transition-colors duration-300 group-hover:text-blue">
                See what each one does
              </p>
              <p className="annot text-blue">what we build</p>
            </Link>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
