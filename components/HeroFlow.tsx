"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * The hero's live demonstration.
 *
 * Four acts, played once on load, then left running:
 *   chaos  — enquiries scattered across the panel, unanswered, tilted
 *   order  — they gather into a single intake queue; the wiring draws itself
 *   flow   — each one travels through the system and comes out an outcome
 *   live   — steady state: packets moving, counter ticking
 *
 * Reduced motion gets a separate static render of the finished system,
 * which says the same thing without a single frame of animation.
 */

type Enquiry = {
  source: string;
  time: string;
  text: string;
  outcome: string;
  /** scatter position as a fraction of the panel, plus a tilt */
  sx: number;
  sy: number;
  rot: number;
};

const ENQUIRIES: Enquiry[] = [
  {
    source: "WhatsApp",
    time: "11:42 pm",
    text: "Price for 2BHK interiors?",
    outcome: "Replied in 9 seconds",
    sx: 0.46,
    sy: 0.06,
    rot: -6,
  },
  {
    source: "Missed call",
    time: "2:15 pm",
    text: "+91 98xxx xx432, no voicemail",
    outcome: "Called back, qualified",
    sx: 0.06,
    sy: 0.62,
    rot: 4,
  },
  {
    source: "Web form",
    time: "9:04 am",
    text: "Need a quote before Friday",
    outcome: "Quote sent, follow-up set",
    sx: 0.64,
    sy: 0.72,
    rot: 7,
  },
  {
    source: "Instagram",
    time: "1:30 am",
    text: "Any slot open this week?",
    outcome: "Booked for Thu, 4:30 pm",
    sx: 0.2,
    sy: 0.14,
    rot: -3,
  },
  {
    source: "WhatsApp",
    time: "6:20 am",
    text: "Is anyone there? 2nd message",
    outcome: "Answered, sent to Priya",
    sx: 0.68,
    sy: 0.28,
    rot: 5,
  },
  {
    source: "Web form",
    time: "11:58 pm",
    text: "Sending our requirements",
    outcome: "In CRM, tagged hot",
    sx: 0.28,
    sy: 0.86,
    rot: -5,
  },
];

/* Narrow panels drop to four enquiries: six slots leave barely a hair
   between chips on a phone, and the point lands just as well with four. */
const NARROW_AT = 480;
const SLOT_TOP = 0.11;
const LEFT_X = 0.035;

const layoutFor = (width: number) => {
  const narrow = width > 0 && width < NARROW_AT;
  const count = narrow ? 4 : ENQUIRIES.length;
  return {
    narrow,
    count,
    colW: narrow ? 0.32 : 0.29,
    rightX: narrow ? 0.66 : 0.675,
    step: 0.78 / (count - 1),
  };
};

type Layout = ReturnType<typeof layoutFor>;

type Phase = "chaos" | "order" | "flow" | "live";
type ChipState = "scatter" | "queued" | "resolved";
type Box = { w: number; h: number };

const Chip = memo(function Chip({
  data,
  index,
  state,
  box,
  layout,
}: {
  data: Enquiry;
  index: number;
  state: ChipState;
  box: Box;
  layout: Layout;
}) {
  const { w, h } = box;
  const slotY = (SLOT_TOP + index * layout.step) * h;
  const qx = LEFT_X * w;
  const rx = layout.rightX * w;
  const nodeX = 0.5 * w - layout.colW * w * 0.5;
  const nodeY = 0.5 * h - 16;

  const scatter = {
    x: data.sx * w,
    y: data.sy * h,
    rotate: data.rot,
    scale: 0.94,
    opacity: 0.55,
  };
  const queued = { x: qx, y: slotY, rotate: 0, scale: 1, opacity: 1 };

  /* Passing through the system: the enquiry is carried to the centre,
     compressed, and leaves the other side as an outcome. */
  const resolved = {
    x: [qx, nodeX, rx],
    y: [slotY, nodeY, slotY],
    rotate: 0,
    scale: [1, 0.78, 1],
    opacity: [1, 0.85, 1],
  };

  const target = state === "scatter" ? scatter : state === "queued" ? queued : resolved;
  const done = state === "resolved";

  return (
    <motion.div
      className="absolute left-0 top-0 select-none"
      style={{ width: `${layout.colW * 100}%` }}
      initial={scatter}
      animate={target}
      transition={
        done
          ? { duration: 1.05, ease: [0.5, 0, 0.2, 1], times: [0, 0.5, 1] }
          : { type: "spring", stiffness: 90, damping: 18, mass: 0.9 }
      }
    >
      <div
        className={`rounded-[3px] border px-2 py-1.5 backdrop-blur-[2px] transition-colors duration-500 sm:px-2.5 sm:py-2 ${
          done
            ? "border-jade/45 bg-jade/[0.07]"
            : state === "queued"
              ? "border-line bg-raised/85"
              : "border-ochre/35 bg-raised/70"
        }`}
      >
        <div className="flex items-center justify-between gap-1.5">
          <span
            className={`annot truncate text-[0.5rem] leading-none sm:text-[0.5625rem] ${
              done ? "text-jade" : "text-paper-faint"
            }`}
          >
            {done ? "handled" : data.source}
          </span>
          <span
            className={`annot shrink-0 text-[0.5rem] leading-none sm:text-[0.5625rem] ${
              done ? "text-jade" : "text-ochre"
            }`}
          >
            {done ? "done" : data.time}
          </span>
        </div>
        <p className="relative mt-1 text-[0.5625rem] leading-snug text-paper sm:text-[0.6875rem]">
          {/* The label crossfades at the midpoint, so the enquiry visibly
              becomes an outcome as it passes through the system. */}
          <motion.span
            className="block"
            animate={{ opacity: done ? [1, 0, 0] : 1 }}
            transition={{ duration: 1.05, times: [0, 0.42, 1] }}
          >
            {data.text}
          </motion.span>
          {done && (
            <motion.span
              className="absolute inset-0 block text-jade"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1] }}
              transition={{ duration: 1.05, times: [0, 0.55, 1] }}
            >
              {data.outcome}
            </motion.span>
          )}
        </p>
      </div>
    </motion.div>
  );
});

function Wiring({ phase, layout }: { phase: Phase; layout: Layout }) {
  const drawn = phase !== "chaos";
  const active = phase === "flow" || phase === "live";
  const inX = layout.colW * 100 + LEFT_X * 100;
  const outX = layout.rightX * 100;
  const slots = Array.from(
    { length: layout.count },
    (_, i) => (SLOT_TOP + i * layout.step) * 100 + 4.2,
  );

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      {slots.map((y, i) => {
        const inPath = `M ${inX} ${y} C ${inX + 5} ${y}, 40 50, 42.5 50`;
        const outPath = `M 57.5 50 C 60 50, ${outX - 5} ${y}, ${outX} ${y}`;
        return (
          <g key={i}>
            <motion.path
              d={inPath}
              fill="none"
              stroke={active ? "var(--c-blue)" : "var(--c-line)"}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: drawn ? 1 : 0,
                opacity: drawn ? (active ? 0.65 : 0.4) : 0,
              }}
              transition={{ duration: 0.7, delay: drawn ? i * 0.06 : 0 }}
            />
            <motion.path
              d={outPath}
              fill="none"
              stroke={active ? "var(--c-jade)" : "var(--c-line)"}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: drawn ? 1 : 0,
                opacity: drawn ? (active ? 0.5 : 0.3) : 0,
              }}
              transition={{ duration: 0.7, delay: drawn ? 0.3 + i * 0.06 : 0 }}
            />

            {/* Steady state: work continuously moving through the pipe. */}
            {phase === "live" && (
              <>
                <circle r="1.1" fill="var(--c-blue)">
                  <animateMotion
                    dur="2.6s"
                    begin={`${i * 0.42}s`}
                    repeatCount="indefinite"
                    path={inPath}
                  />
                </circle>
                <circle r="1.1" fill="var(--c-jade)">
                  <animateMotion
                    dur="2.6s"
                    begin={`${1.3 + i * 0.42}s`}
                    repeatCount="indefinite"
                    path={outPath}
                  />
                </circle>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function SystemNode({ phase, handled }: { phase: Phase; handled: number }) {
  const on = phase === "flow" || phase === "live";
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: phase === "chaos" ? 0.35 : 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`rounded-[3px] border px-3 py-2.5 text-center transition-colors duration-700 sm:px-4 sm:py-3 ${
          on ? "border-blue/60 bg-blue-deep/60" : "border-line bg-raised"
        }`}
      >
        <div className="font-display text-[0.9375rem] leading-none text-paper sm:text-lg">
          Aakaar
        </div>
        <div className="annot mt-1 text-[0.5rem] leading-none sm:text-[0.5625rem]">
          {on ? "system running" : "system"}
        </div>
        <div className="mt-2 flex items-center justify-center gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1 w-1 rounded-full ${on ? "bg-jade" : "bg-line"}`}
              style={
                on ? { animation: `pulse-node 1.6s ease-in-out ${i * 0.22}s infinite` } : undefined
              }
            />
          ))}
        </div>
      </div>
      <div className="annot tnum mt-2 text-center text-[0.5625rem] text-jade">
        {handled} handled
      </div>
    </motion.div>
  );
}

export function HeroFlow() {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<Box>({ w: 0, h: 0 });
  const [phase, setPhase] = useState<Phase>("chaos");
  const [resolved, setResolved] = useState(0);
  const layout = layoutFor(box.w);
  const count = layout.count;

  /* Measure the panel so chips travel on pure GPU transforms rather than
     animating layout properties. */
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("order"), 1900));
    timers.push(window.setTimeout(() => setPhase("flow"), 3300));
    for (let i = 0; i < count; i += 1) {
      timers.push(window.setTimeout(() => setResolved(i + 1), 3800 + i * 620));
    }
    timers.push(window.setTimeout(() => setPhase("live"), 3800 + count * 620 + 700));
    return () => timers.forEach(clearTimeout);
  }, [reduced, count]);

  const caption =
    phase === "chaos"
      ? `${count} enquiries, no system. Some of these are already lost.`
      : phase === "order"
        ? "Every channel lands in one intake."
        : phase === "flow"
          ? "Qualified, answered and routed without anyone touching it."
          : "Running. Every enquiry gets an answer, at any hour.";

  if (reduced) return <StaticFlow />;

  return (
    <figure className="m-0">
      <div
        ref={panelRef}
        className="drafting-grid relative aspect-[5/4] w-full overflow-hidden rounded-sm border border-line bg-raised/40 sm:aspect-[16/10]"
        role="img"
        aria-label="A demonstration: scattered, unanswered customer enquiries from WhatsApp, missed calls, web forms and Instagram gather into a single intake, pass through the Aakaar system, and come out answered, qualified and booked."
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 py-2.5">
          <span className="annot text-[0.5625rem]">
            {phase === "chaos" ? "your inbox today" : "intake"}
          </span>
          <span className="annot text-[0.5625rem]">
            {phase === "chaos" ? "unanswered" : "outcome"}
          </span>
        </div>

        <Wiring phase={phase} layout={layout} />
        <SystemNode phase={phase} handled={resolved} />

        {box.w > 0 &&
          ENQUIRIES.slice(0, layout.count).map((e, i) => (
            <Chip
              key={e.text}
              data={e}
              index={i}
              box={box}
              layout={layout}
              state={phase === "chaos" ? "scatter" : i < resolved ? "resolved" : "queued"}
            />
          ))}
      </div>

      <figcaption className="annot mt-3 flex items-center gap-2 text-[0.6875rem]" aria-live="polite">
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
            phase === "chaos" ? "bg-ochre" : "bg-jade"
          }`}
          aria-hidden
        />
        {caption}
      </figcaption>
    </figure>
  );
}

/** Reduced-motion render: the finished system, drawn once, holding still. */
function StaticFlow() {
  const shown = ENQUIRIES.slice(0, 4);
  return (
    <figure className="m-0">
      <div className="drafting-grid relative w-full rounded-sm border border-line bg-raised/40 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="space-y-2">
            <p className="annot">enquiries in</p>
            {shown.map((e) => (
              <div key={e.text} className="rounded-[3px] border border-line bg-raised px-2.5 py-2">
                <div className="flex items-center justify-between">
                  <span className="annot text-[0.5625rem]">{e.source}</span>
                  <span className="annot text-[0.5625rem] text-ochre">{e.time}</span>
                </div>
                <p className="mt-1 text-[0.6875rem] leading-snug text-paper">{e.text}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto rounded-[3px] border border-blue/60 bg-blue-deep/60 px-4 py-3 text-center">
            <div className="font-display text-lg leading-none text-paper">Aakaar</div>
            <div className="annot mt-1 text-[0.5625rem]">system</div>
          </div>

          <div className="space-y-2">
            <p className="annot">outcomes out</p>
            {shown.map((e) => (
              <div
                key={e.outcome}
                className="rounded-[3px] border border-jade/45 bg-jade/[0.07] px-2.5 py-2"
              >
                <div className="flex items-center justify-between">
                  <span className="annot text-[0.5625rem] text-jade">handled</span>
                  <span className="annot text-[0.5625rem] text-jade">done</span>
                </div>
                <p className="mt-1 text-[0.6875rem] leading-snug text-jade">{e.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="annot mt-3 text-[0.6875rem]">
        Every channel lands in one intake, and every enquiry gets an answer.
      </figcaption>
    </figure>
  );
}
