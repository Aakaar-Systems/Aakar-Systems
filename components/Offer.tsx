"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { connectedLayers, digitalFoundation, pricing, retainer } from "@/lib/services";
import { whatsappHref } from "@/lib/site";
import { Reveal, SectionMark, WhatsAppMark } from "./ui";

/**
 * Web, design, content and growth — as one strip of included layers rather
 * than four more headline services. Hovering or focusing a layer reveals what
 * is in it; nothing is a separate deep dive.
 */
export function ConnectedLayers() {
  const [open, setOpen] = useState<string | null>(null);
  const reduced = useReducedMotion();

  return (
    <div className="shell">
      <div className="panel overflow-hidden">
        <div className="border-b border-line p-7 md:p-9">
          <p className="annot">included, not sold separately</p>
          <h2 className="font-display mt-3 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-tight text-paper">
            You are never buying a website separately.
          </h2>
          <p className="mt-3 max-w-2xl text-paper-dim">
            Every system needs a place to live, a way to look, something to say and a way
            to prove it worked. That work is part of the build, not a second invoice.
          </p>
        </div>

        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {connectedLayers.map((layer) => {
            const isOpen = open === layer.name;
            return (
              <li key={layer.name} className="bg-raised">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : layer.name)}
                  aria-expanded={isOpen}
                  className="group flex w-full flex-col items-start gap-2 p-6 text-left transition-colors duration-300 hover:bg-raised-2 md:p-7"
                >
                  <span className="flex w-full items-center justify-between gap-3">
                    <span className="font-display text-xl leading-none text-paper transition-colors duration-300 group-hover:text-blue">
                      {layer.name}
                    </span>
                    <span
                      aria-hidden
                      className={`annot text-blue transition-transform duration-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    >
                      ›
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-paper-dim">{layer.line}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 px-6 pb-6 md:px-7 md:pb-7">
                        {layer.items.map((item) => (
                          <li key={item} className="annot flex gap-2.5 leading-relaxed">
                            <span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-jade" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** The retainer, as its own beat after the systems — not a sixth system. */
export function Retainer() {
  return (
    <div className="shell">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <SectionMark label="after launch" />
          <h2 className="font-display t-section mt-6 text-paper">{retainer.name}</h2>
          <Reveal kind="rise" className="lede mt-6 max-w-md">
            <p>{retainer.line}</p>
          </Reveal>
        </div>

        <Reveal kind="wipe">
          <ul className="grid gap-x-10 gap-y-3 border-t border-line pt-8 sm:grid-cols-2">
            {retainer.items.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] text-paper">
                <span aria-hidden className="mt-3 h-px w-3.5 shrink-0 bg-jade" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Tier({
  tier,
  compact = false,
}: {
  tier: {
    name: string;
    range: string;
    from: string;
    timeline: string;
    best: string;
    includes: readonly string[];
    example?: string;
    featured?: boolean;
  };
  compact?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col p-7 md:p-8 ${
        tier.featured ? "bg-raised-2" : "bg-ink/80"
      } backdrop-blur-sm`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl leading-none text-paper">{tier.name}</h3>
        {tier.featured && <span className="annot text-ochre">most common</span>}
      </div>

      <p className={`font-display mt-4 leading-none ${compact ? "text-2xl" : "text-3xl"} text-blue`}>
        {tier.range}
      </p>
      <p className="annot mt-2">starting at {tier.from}</p>

      <p className="mt-5 text-sm leading-relaxed text-paper-dim">{tier.best}</p>
      <p className="annot mt-3 text-ochre">{tier.timeline}</p>

      <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
        {tier.includes.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-paper">
            <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-jade" />
            {item}
          </li>
        ))}
      </ul>

      {tier.example && (
        <p className="annot mt-auto pt-6 leading-relaxed">
          <span className="text-paper-dim">Example. </span>
          {tier.example}
        </p>
      )}
    </div>
  );
}

/** Price anchors for the systems. Ranges, never fixed numbers. */
export function Pricing() {
  return (
    <div className="shell">
      {/* The visible heading lives in the page header — repeating it here read
          as padding. The h2 stays for document structure, so the tier h3s are
          not orphaned in the heading order. */}
      <h2 className="sr-only">System pricing tiers</h2>
      <div className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line lg:grid-cols-3">
        {pricing.map((t, i) => (
          <Reveal key={t.name} kind="settle" delay={i * 0.06}>
            <Tier tier={t} />
          </Reveal>
        ))}
      </div>

      <Reveal kind="rise" className="mt-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="annot max-w-xl leading-relaxed">
            The final price depends on your workflow. These are honest starting anchors
            from a studio with no delivery history yet, and we would rather revise them up
            later than quote you something we cannot hold to.
          </p>
          <a
            href={whatsappHref(
              "Hi Aakaar Systems — I'd like a free audit call to work out what my build would cost.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-[3px] bg-jade-solid px-6 py-3.5 text-[0.9375rem] font-medium text-jade-on shadow-[0_8px_24px_-12px_var(--c-jade)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            <WhatsAppMark />
            Book a free audit call
          </a>
        </div>
      </Reveal>
    </div>
  );
}

/**
 * Digital Foundation — step one, deliberately lighter in weight than the
 * systems above it. Presenting these as equal options would reintroduce the
 * "we do everything" problem the whole positioning is built to avoid.
 */
export function DigitalFoundation() {
  return (
    <div className="shell">
      <div className="rule-t pt-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <SectionMark label="not ready for automation yet?" />
            <h2 className="font-display mt-6 text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] leading-tight text-paper">
              Start here instead.
            </h2>
          </div>
          <Reveal kind="rise">
            <p className="text-paper-dim">{digitalFoundation.intro}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line md:grid-cols-3">
          {digitalFoundation.tiers.map((t, i) => (
            <Reveal key={t.name} kind="rise" delay={i * 0.06}>
              <Tier tier={t} compact />
            </Reveal>
          ))}
        </div>

        <Reveal kind="rise" className="mt-8">
          <p className="annot max-w-2xl leading-relaxed">
            This is simpler work and it is priced that way. Once you are online and
            enquiries are actually arriving, the systems above become worth talking about.
            Not before.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

/**
 * The doorway to pricing from the offer page. Shows the three anchors as
 * bare numbers only — the full tiers, the entry-level Digital Foundation
 * tier and the caveats all live on /pricing.
 */
export function PricingTeaser() {
  return (
    <div className="shell">
      <div className="panel overflow-hidden">
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="border-b border-line p-7 md:border-b-0 md:border-r md:p-9">
            <p className="annot">what it costs</p>
            <h2 className="font-display mt-3 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-tight text-paper">
              You should not have to book a call to find out.
            </h2>
            <p className="mt-4 text-paper-dim">
              Real anchors, published. The final number depends on your workflow, and we
              quote it properly after mapping.
            </p>
            <Link
              href="/pricing"
              className="group mt-7 inline-flex items-center gap-2.5 text-blue transition-colors duration-300 hover:text-paper"
            >
              <span className="border-b border-blue/40 pb-0.5 transition-colors duration-300 group-hover:border-paper">
                See the full pricing
              </span>
            </Link>
          </div>

          <ul className="grid gap-px bg-line sm:grid-cols-3">
            {pricing.map((t) => (
              <li key={t.name} className="bg-ink/70 p-6 md:p-7">
                <p className="font-display text-xl leading-none text-paper">{t.name}</p>
                <p className="font-display mt-4 text-2xl leading-none text-blue">{t.from}</p>
                <p className="annot mt-2">starting at</p>
                <p className="mt-4 text-sm leading-relaxed text-paper-dim">{t.best}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-line px-7 py-5 md:px-9">
          <p className="annot leading-relaxed">
            Not ready for a system yet? There is a Digital Foundation tier from ₹3,000 for
            getting a business online in the first place.{" "}
            <Link href="/pricing" className="text-blue underline underline-offset-4">
              See pricing
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
