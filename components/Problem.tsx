"use client";

import { motion, useReducedMotion } from "motion/react";
import { problemCosts } from "@/lib/content";
import { MaskLines, Reveal, SectionMark } from "./ui";

/**
 * The tension, before any solution. Presented as a log of leaks with
 * timestamps rather than feature cards — it should read like evidence.
 */
export function Problem() {
  const reduced = useReducedMotion();

  return (
    <section id="problem" className="section relative scroll-mt-24">
      <div className="shell">
        <SectionMark index="01" label="the problem" />

        <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-24">
          <div>
            <h2 className="font-display t-section text-paper">
              <MaskLines
                lines={[
                  "Nothing is broken.",
                  <span key="exactly">
                    That is <span className="italic text-ochre">exactly</span> the
                  </span>,
                  "problem.",
                ]}
              />
            </h2>
            <Reveal kind="rise" className="lede mt-8 max-w-lg">
              <p>
                Nothing fails loudly enough to fix. The loss is spread thin across a
                hundred small gaps.
              </p>
            </Reveal>
            <Reveal kind="rise" delay={0.08} className="mt-7 max-w-lg">
              <p className="text-paper-dim">
                One week, in four moments.
              </p>
            </Reveal>
          </div>

          {/* The ledger. Each entry wipes in from the left, like a line
              being ruled onto a page. */}
          <ol className="relative">
            <div aria-hidden className="absolute left-0 top-0 h-full w-px bg-line" />
            {problemCosts.map((cost, i) => (
              <motion.li
                key={cost.line}
                className="relative pb-10 pl-6 last:pb-0 md:pl-8"
                initial={reduced ? false : { opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.55rem] h-px w-3 bg-ochre md:w-4"
                />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="annot tnum text-ochre">{cost.time}</span>
                  <span className="annot">{cost.channel}</span>
                </div>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-paper md:text-lg">
                  {cost.line}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* One stat, given room to land. Not a data dump. */}
        <Reveal kind="wipe" className="mt-24 md:mt-36">
          <div className="rule-t rule-b py-14 md:py-20">
            <div className="grid gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-20">
              <p className="font-display text-[clamp(3.5rem,2rem+7vw,7rem)] leading-none tracking-tight text-blue">
                98<span className="text-[0.45em] align-super">%</span>
              </p>
              <div className="max-w-xl">
                <p className="t-sub font-display text-paper">
                  of WhatsApp messages get opened. Email sits near twenty.
                </p>
                <p className="mt-5 text-paper-dim">
                  If your follow-up lives in an email nobody opens, the problem was never
                  the follow-up. It was the pipe.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
