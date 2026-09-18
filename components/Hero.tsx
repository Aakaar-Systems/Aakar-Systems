"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroFlow } from "./HeroFlow";
import { MaskLines, WhatsAppMark } from "./ui";
import { whatsappHref } from "@/lib/site";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      {/* Drafting margin rule — the left edge of the sheet. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[max(1.25rem,calc(50%-39rem+2.5rem))] hidden w-px bg-line opacity-60 lg:block"
      />

      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <span aria-hidden className="h-px w-6 bg-ochre" />
              <span className="annot text-paper-dim">
                आकार — form, shape, the thing given structure
              </span>
            </motion.div>

            <h1 className="font-display t-hero mt-6 text-paper">
              <MaskLines
                lines={[
                  "We build systems that",
                  <span key="capture">
                    <span className="text-blue">capture</span> leads,
                  </span>,
                  <span key="automate">
                    <span className="text-blue">automate</span> the
                  </span>,
                  "repetitive work, and",
                  <span key="open">
                    keep you <span className="italic text-ochre">open</span> around
                  </span>,
                  "the clock.",
                ]}
              />
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reduced ? 0 : 0.65 }}
              className="lede mt-7 max-w-xl"
            >
              Aakaar Systems is an AI business systems studio in India. We find where your
              business is losing enquiries, burning hours on repeat work, or answering too
              slowly, and we build the system that fixes it.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reduced ? 0 : 0.78 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-jade-solid px-6 py-3.5 text-[0.9375rem] font-medium text-jade-on transition-colors duration-200 hover:opacity-90"
              >
                <WhatsAppMark />
                Start on WhatsApp
              </a>
              <a
                href="#problem"
                className="inline-flex items-center justify-center rounded-sm border border-line px-6 py-3.5 text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:border-blue hover:text-blue"
              >
                See what breaks first
              </a>
            </motion.div>

            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: reduced ? 0 : 0.95 }}
              className="annot mt-5"
            >
              Usually a reply within the hour, IST.
            </motion.p>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: reduced ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroFlow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
