"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroFlow } from "./HeroFlow";
import { MaskLines, WhatsAppMark } from "./ui";
import { whatsappHref } from "@/lib/site";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative pt-32 pb-8 md:pt-44 md:pb-20">
      {/* Drafting margin rule — the left edge of the sheet. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[max(1.5rem,calc(50%-40rem+3rem))] hidden w-px bg-line/70 lg:block"
      />

      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
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
              className="lede mt-8 max-w-xl"
            >
              An AI business systems studio in India. We find where enquiries leak, and
              build the system that stops it.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: reduced ? 0 : 0.78 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-[3px] bg-jade-solid px-7 py-4 text-[0.9375rem] font-medium text-jade-on shadow-[0_8px_24px_-12px_var(--c-jade)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-12px_var(--c-jade)] hover:brightness-110"
              >
                <WhatsAppMark />
                Start on WhatsApp
              </a>
              <a
                href="#problem"
                className="inline-flex items-center justify-center rounded-[3px] border border-line bg-raised/40 px-7 py-4 text-[0.9375rem] font-medium text-paper transition-[border-color,color,background-color,box-shadow] duration-300 hover:border-blue/70 hover:bg-raised hover:text-blue hover:shadow-[0_0_0_1px_var(--c-blue-deep)]"
              >
                See what breaks first
              </a>
            </motion.div>

            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: reduced ? 0 : 0.95 }}
              className="annot mt-6"
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
