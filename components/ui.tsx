"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------
   Reveal — deliberately several behaviours, not one fade-up everywhere.
   Each section picks the one that suits what it is saying.
   ------------------------------------------------------------------ */

type RevealKind = "rise" | "wipe" | "mask" | "scale" | "settle";

/* One expressive easing, used at different durations. A long, soft tail is
   most of what separates a considered reveal from a default one. */
const EASE = [0.16, 1, 0.3, 1] as const;

const kinds: Record<RevealKind, Variants> = {
  /* gentle upward settle — used for body copy only */
  rise: {
    hidden: { opacity: 0, y: 22 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
  },
  /* a drafting wipe, left to right — as if being drawn onto the page */
  wipe: {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    shown: {
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: 1.15, ease: [0.65, 0, 0.35, 1] },
    },
  },
  /* headline rises out from behind its own baseline */
  mask: {
    hidden: { y: "110%" },
    shown: { y: "0%", transition: { duration: 1.15, ease: EASE } },
  },
  /* for diagrams and framed objects */
  scale: {
    hidden: { opacity: 0, scale: 0.955, y: 14 },
    shown: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
  },
  /* drops in and comes to rest, like a card laid on a table */
  settle: {
    hidden: { opacity: 0, y: -14, rotate: -0.5 },
    shown: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.85, ease: [0.34, 1.2, 0.64, 1] },
    },
  },
};

/**
 * Fold the delay into the variant instead of passing a `transition` prop:
 * a component-level transition replaces the variant's own duration and
 * easing entirely, which would flatten every reveal to the same timing.
 */
const withDelay = (kind: RevealKind, delay: number): Variants => {
  const shown = kinds[kind].shown as Record<string, unknown>;
  return {
    hidden: kinds[kind].hidden,
    shown: {
      ...shown,
      transition: { ...(shown.transition as object), delay },
    },
  };
};

/* An element clipped to zero width cannot trigger its own reveal, so the
   wipe needs a wrapper to observe from. See the note on `wipe` below. */
const passthrough: Variants = { hidden: {}, shown: {} };

/** Trigger once the element is a little way into the viewport, not at the edge. */
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

export function Reveal({
  children,
  kind = "rise",
  delay = 0,
  className,
  as = "div",
  amount = "some",
}: {
  children: ReactNode;
  kind?: RevealKind;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "h2" | "h3";
  /**
   * Defaults to "some" rather than a fraction: a numeric threshold can never
   * be met by an element taller than the viewport, which silently leaves
   * long sections stuck in their hidden state.
   */
  amount?: number | "some" | "all";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    const Plain = as as "div";
    return <Plain className={className}>{children}</Plain>;
  }

  /**
   * `wipe` hides by clipping to zero width. IntersectionObserver accounts
   * for the target's own clip, so an observer on the clipped element itself
   * measures a zero-area intersection and never fires. The trigger therefore
   * sits on an unclipped wrapper, which drives the clipped child by variant
   * propagation — the same reason MaskLines is built the way it is.
   */
  if (kind === "wipe") {
    return (
      <Tag
        className={className}
        variants={passthrough}
        initial="hidden"
        whileInView="shown"
        viewport={{ ...VIEWPORT, amount }}
      >
        <motion.div variants={withDelay("wipe", delay)}>{children}</motion.div>
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      variants={withDelay(kind, delay)}
      initial="hidden"
      whileInView="shown"
      viewport={{ ...VIEWPORT, amount }}
    >
      {children}
    </Tag>
  );
}

/**
 * Headline whose lines rise out from behind their own baseline.
 *
 * The viewport trigger must sit on the unclipped wrapper, not on the lines
 * themselves: each line starts translated fully outside its overflow-hidden
 * parent, and IntersectionObserver clips against ancestor overflow, so a
 * threshold on the line itself can never be met. The wrapper drives the
 * lines through variant propagation instead.
 */
const maskContainer = (step: number): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: step } },
});

export function MaskLines({
  lines,
  className,
  delayStep = 0.09,
}: {
  lines: ReactNode[];
  className?: string;
  delayStep?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block pb-[0.08em]">
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      variants={maskContainer(delayStep)}
      initial="hidden"
      whileInView="shown"
      viewport={{ ...VIEWPORT, amount: "some" }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={kinds.mask}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** A hairline that draws itself across, left to right. */
export function DrawnRule({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={`h-px w-full bg-line ${className}`} />;
  return (
    <motion.div
      className={`h-px w-full origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
    />
  );
}

/* ------------------------------------------------------------------
   Section marker — a drafting annotation, not a tracked-out caps eyebrow.
   ------------------------------------------------------------------ */

export function SectionMark({ index, label }: { index?: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      {index && <span className="annot tnum text-blue">{index}</span>}
      <span aria-hidden className="h-px w-8 bg-line" />
      <span className="annot">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------
   Buttons. No arrows appended — the label carries the action.
   ------------------------------------------------------------------ */

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-sm px-6 py-3.5 text-[0.9375rem] font-medium transition-[background-color,color,border-color,box-shadow] duration-200";

export function PrimaryLink({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} bg-paper text-ink hover:bg-blue hover:text-white ${className}`}
    >
      {children}
    </a>
  );
}

export function GhostLink({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} border border-line text-paper hover:border-blue hover:text-blue ${className}`}
    >
      {children}
    </a>
  );
}

/** WhatsApp glyph — our primary channel, so it gets a real mark. */
export function WhatsAppMark({ className = "h-[1.05em] w-[1.05em]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden focusable="false">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.87 9.87 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.05h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.17 8.17 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.69 8.24-8.25 8.24Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12s-.64.8-.79.97c-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.18 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}
