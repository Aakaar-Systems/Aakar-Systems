"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { stages } from "@/lib/content";
import { SectionMark } from "./ui";

/**
 * THE SIGNATURE MOMENT.
 *
 * A pinned canvas where the system draws itself, wired to scroll position
 * rather than to an on/off trigger — nodes resolve and wires extend in
 * proportion to how far you have scrolled, so you can scrub it backwards.
 *
 * Three acts, matching the spine of the whole site:
 *   capture   sources fan into one intake
 *   automate  intake is qualified and fans out into the work
 *   optimize  the work converges into measurement, which loops back
 *             into qualification — the system improving itself
 *
 * Everything is driven by motion values, so scrolling causes no React
 * re-renders. The only state that changes is the act index, three times.
 */

type NodeId =
  | "s1" | "s2" | "s3" | "s4"
  | "intake" | "qualify"
  | "crm" | "reply" | "booking" | "followup"
  | "measure";

type NodeDef = {
  id: NodeId;
  label: string;
  sub?: string;
  act: 0 | 1 | 2;
  order: number;
  tone: "source" | "hub" | "work" | "measure";
};

const NODES: NodeDef[] = [
  { id: "s1", label: "WhatsApp", act: 0, order: 0, tone: "source" },
  { id: "s2", label: "Web form", act: 0, order: 1, tone: "source" },
  { id: "s3", label: "Missed call", act: 0, order: 2, tone: "source" },
  { id: "s4", label: "Instagram", act: 0, order: 3, tone: "source" },
  { id: "intake", label: "Intake", sub: "one place, always on", act: 0, order: 4, tone: "hub" },

  { id: "qualify", label: "Qualify", sub: "intent, budget, urgency", act: 1, order: 0, tone: "hub" },
  { id: "crm", label: "CRM record", sub: "written, tagged", act: 1, order: 1, tone: "work" },
  { id: "reply", label: "Reply and quote", sub: "in your words", act: 1, order: 2, tone: "work" },
  { id: "booking", label: "Booking", sub: "real availability", act: 1, order: 3, tone: "work" },
  { id: "followup", label: "Follow-up", sub: "day 2, day 5", act: 1, order: 4, tone: "work" },

  { id: "measure", label: "Measure", sub: "what actually converted", act: 2, order: 0, tone: "measure" },
];

type EdgeDef = {
  from: NodeId;
  to: NodeId;
  act: 0 | 1 | 2;
  order: number;
  /** the optimize loop is drawn by hand — it has to travel around everything */
  loop?: boolean;
};

const EDGES: EdgeDef[] = [
  { from: "s1", to: "intake", act: 0, order: 0 },
  { from: "s2", to: "intake", act: 0, order: 1 },
  { from: "s3", to: "intake", act: 0, order: 2 },
  { from: "s4", to: "intake", act: 0, order: 3 },

  { from: "intake", to: "qualify", act: 1, order: 0 },
  { from: "qualify", to: "crm", act: 1, order: 1 },
  { from: "qualify", to: "reply", act: 1, order: 2 },
  { from: "qualify", to: "booking", act: 1, order: 3 },
  { from: "qualify", to: "followup", act: 1, order: 4 },

  { from: "crm", to: "measure", act: 2, order: 0 },
  { from: "reply", to: "measure", act: 2, order: 1 },
  { from: "booking", to: "measure", act: 2, order: 2 },
  { from: "followup", to: "measure", act: 2, order: 3 },
  { from: "measure", to: "qualify", act: 2, order: 4, loop: true },
];

/* ---------------- layout ---------------- */

type Pt = { cx: number; cy: number; w: number; h: number };
type Layout = {
  viewBox: string;
  pos: Record<NodeId, Pt>;
  font: number;
  subFont: number;
  /** horizontal flow on wide screens, vertical on narrow ones */
  axis: "x" | "y";
  loopPath: string;
};

const WIDE: Layout = {
  viewBox: "0 0 960 580",
  axis: "x",
  font: 14,
  subFont: 10,
  pos: {
    s1: { cx: 82, cy: 70, w: 128, h: 38 },
    s2: { cx: 82, cy: 175, w: 128, h: 38 },
    s3: { cx: 82, cy: 280, w: 128, h: 38 },
    s4: { cx: 82, cy: 385, w: 128, h: 38 },
    intake: { cx: 288, cy: 228, w: 148, h: 54 },
    qualify: { cx: 470, cy: 228, w: 148, h: 54 },
    crm: { cx: 672, cy: 70, w: 160, h: 54 },
    reply: { cx: 672, cy: 176, w: 160, h: 54 },
    booking: { cx: 672, cy: 282, w: 160, h: 54 },
    followup: { cx: 672, cy: 388, w: 160, h: 54 },
    measure: { cx: 872, cy: 228, w: 150, h: 54 },
  },
  // Out of Measure, down and around everything, back into Qualify.
  loopPath:
    "M 872 255 C 872 505, 760 545, 560 545 C 420 545, 470 300, 470 255",
};

const NARROW: Layout = {
  /* 380x500, not 380x600: the old canvas carried 72px of dead space at the
     bottom, and `meet` fits a portrait viewBox to the slot's HEIGHT — so the
     dead space came straight off the scale and shrank the whole diagram. */
  viewBox: "0 0 380 500",
  axis: "y",
  font: 15,
  subFont: 11,
  pos: {
    s1: { cx: 52, cy: 18, w: 88, h: 26 },
    s2: { cx: 148, cy: 18, w: 88, h: 26 },
    s3: { cx: 244, cy: 18, w: 88, h: 26 },
    s4: { cx: 332, cy: 18, w: 80, h: 26 },
    intake: { cx: 190, cy: 94, w: 152, h: 42 },
    qualify: { cx: 190, cy: 180, w: 152, h: 42 },
    crm: { cx: 100, cy: 268, w: 140, h: 42 },
    reply: { cx: 258, cy: 268, w: 140, h: 42 },
    booking: { cx: 100, cy: 348, w: 140, h: 42 },
    followup: { cx: 258, cy: 348, w: 140, h: 42 },
    measure: { cx: 190, cy: 436, w: 152, h: 42 },
  },
  loopPath:
    "M 266 436 C 356 436, 366 404, 366 320 C 366 216, 338 180, 266 180",
};

function edgePath(a: Pt, b: Pt, axis: "x" | "y") {
  if (axis === "x") {
    const x1 = a.cx + a.w / 2;
    const x2 = b.cx - b.w / 2;
    const mid = x1 + (x2 - x1) * 0.55;
    return `M ${x1} ${a.cy} C ${mid} ${a.cy}, ${x1 + (x2 - x1) * 0.45} ${b.cy}, ${x2} ${b.cy}`;
  }
  const y1 = a.cy + a.h / 2;
  const y2 = b.cy - b.h / 2;
  const mid = y1 + (y2 - y1) * 0.55;
  return `M ${a.cx} ${y1} C ${a.cx} ${mid}, ${b.cx} ${y1 + (y2 - y1) * 0.45}, ${b.cx} ${y2}`;
}

/* ---------------- scroll windows ---------------- */

/* The build finishes at 0.90, leaving the last tenth of the scroll as a
   hold on the completed system rather than racing the section's release. */
const ACTS: Array<[number, number]> = [
  [0.04, 0.28],
  [0.33, 0.58],
  [0.63, 0.90],
];

/** Each item gets its own slice of its act, so the system builds piece by piece. */
function windowFor(act: 0 | 1 | 2, order: number, count: number): [number, number] {
  const [start, end] = ACTS[act];
  const span = end - start;
  const step = (span * 0.66) / Math.max(count - 1, 1);
  const from = start + order * step;
  return [from, from + span * 0.34];
}

const countIn = (act: number, list: Array<{ act: number }>) =>
  list.filter((x) => x.act === act).length;

/* ---------------- pieces ---------------- */

const TONE = {
  source: { stroke: "var(--c-line)", fill: "var(--c-raised)", accent: "var(--c-paper-dim)" },
  hub: { stroke: "var(--c-blue)", fill: "var(--c-blue-deep)", accent: "var(--c-blue)" },
  work: { stroke: "var(--c-line)", fill: "var(--c-raised)", accent: "var(--c-paper-dim)" },
  measure: { stroke: "var(--c-ochre)", fill: "var(--c-raised)", accent: "var(--c-ochre)" },
} as const;

function DiagramNode({
  def,
  pt,
  layout,
  progress,
}: {
  def: NodeDef;
  pt: Pt;
  layout: Layout;
  progress: MotionValue<number>;
}) {
  const [from, to] = windowFor(def.act, def.order, countIn(def.act, NODES));
  const t = useTransform(progress, [from, to], [0, 1], { clamp: true });
  const opacity = useTransform(t, [0, 0.45], [0, 1]);
  const scale = useTransform(t, [0, 1], [0.9, 1]);
  const tone = TONE[def.tone];
  const showSub = def.sub && pt.h >= 40;

  return (
    <motion.g
      style={{
        opacity,
        scale,
        transformBox: "fill-box",
        transformOrigin: "center",
      }}
    >
      <rect
        x={pt.cx - pt.w / 2}
        y={pt.cy - pt.h / 2}
        width={pt.w}
        height={pt.h}
        rx="3"
        fill={tone.fill}
        stroke={tone.stroke}
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <text
        x={pt.cx}
        y={showSub ? pt.cy - 3 : pt.cy + layout.font * 0.35}
        textAnchor="middle"
        fill="var(--c-paper)"
        fontSize={layout.font}
        fontFamily="var(--font-sans)"
        fontWeight={500}
      >
        {def.label}
      </text>
      {showSub && (
        <text
          x={pt.cx}
          y={pt.cy + layout.subFont + 4}
          textAnchor="middle"
          fill={tone.accent}
          fontSize={layout.subFont}
          fontFamily="var(--font-mono)"
        >
          {def.sub}
        </text>
      )}
    </motion.g>
  );
}

function DiagramEdge({
  def,
  d,
  progress,
  built,
}: {
  def: EdgeDef;
  d: string;
  progress: MotionValue<number>;
  built: boolean;
}) {
  const [from, to] = windowFor(def.act, def.order, countIn(def.act, EDGES));
  const t = useTransform(progress, [from, to], [0, 1], { clamp: true });
  const opacity = useTransform(t, [0, 0.12], [0, 1]);

  const stroke = def.loop
    ? "var(--c-ochre)"
    : def.act === 0
      ? "var(--c-blue)"
      : def.act === 1
        ? "var(--c-blue)"
        : "var(--c-jade)";

  return (
    <g>
      {/* The feedback loop reads as a dashed guide. The dashes live on a
          separate static path: Motion implements `pathLength` by writing
          stroke-dasharray itself, so setting one here would fight it. */}
      {def.loop && (
        <motion.path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={1}
          strokeDasharray="5 4"
          vectorEffect="non-scaling-stroke"
          style={{ opacity }}
          opacity={0.32}
        />
      )}
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={def.loop ? 1 : 1.25}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: t, opacity }}
        opacity={0.75}
      />
      {/* Once a wire is drawn and the act is complete, work moves along it. */}
      {built && !def.loop && (
        <circle r="3" fill={stroke} opacity="0.9">
          <animateMotion
            dur="2.4s"
            begin={`${(def.act * 5 + def.order) * 0.28}s`}
            repeatCount="indefinite"
            path={d}
          />
        </circle>
      )}
    </g>
  );
}

/* ---------------- section ---------------- */

export function SystemScroll() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout>(WIDE);
  const [act, setAct] = useState(0);
  const [built, setBuilt] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setLayout(mq.matches ? WIDE : NARROW);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = p < ACTS[1][0] ? 0 : p < ACTS[2][0] ? 1 : 2;
    setAct((cur) => (cur === next ? cur : next));
    setBuilt((cur) => {
      const now = p > 0.88;
      return cur === now ? cur : now;
    });
  });

  if (reduced) return <StaticSystem layout={WIDE} />;

  return (
    <>
    <section
      id="system"
      ref={sectionRef}
      className="relative h-[340svh] scroll-mt-0 md:h-[420svh]"
      aria-labelledby="system-heading"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="shell flex w-full flex-1 flex-col pt-[4.5rem] pb-3 md:pt-24 md:pb-10">
          <div className="flex items-center justify-between gap-6">
            <SectionMark index="03" label="the system" />
            <ActProgress progress={scrollYProgress} act={act} />
          </div>

          <h2 id="system-heading" className="sr-only">
            The system: capture, automate, optimize
          </h2>

          {/* items-stretch, not center: the diagram column has to fill the
              pinned height or the SVG collapses to a fraction of the space. */}
          <div className="mt-4 grid flex-1 grid-rows-[auto_minmax(11rem,1fr)] gap-3 md:mt-8 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.7fr)] md:grid-rows-1 md:gap-10 md:items-stretch">
            <StageCopy act={act} />

            <div className="relative min-h-0 w-full">
              <svg
                viewBox={layout.viewBox}
                className="h-full max-h-full w-full"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="A system diagram assembling as you scroll. WhatsApp, web form, missed call and Instagram enquiries feed into a single intake. Intake feeds qualification, which fans out into a CRM record, a reply and quote, a booking, and a follow-up. All four converge into measurement, which loops back into qualification so the system keeps improving."
              >
                {EDGES.map((e) => (
                  <DiagramEdge
                    key={`${e.from}-${e.to}`}
                    def={e}
                    d={
                      e.loop
                        ? layout.loopPath
                        : edgePath(layout.pos[e.from], layout.pos[e.to], layout.axis)
                    }
                    progress={scrollYProgress}
                    built={built}
                  />
                ))}
                {NODES.map((n) => (
                  <DiagramNode
                    key={n.id}
                    def={n}
                    pt={layout.pos[n.id]}
                    layout={layout}
                    progress={scrollYProgress}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Phones get the full narrative here rather than inside the pinned
          frame, where every line of it came straight out of the diagram's
          height budget. */}
      <section className="section-tight md:hidden">
        <div className="shell space-y-10">
          {stages.map((s) => (
            <div key={s.id} className="border-t border-line pt-6">
              <div className="flex items-baseline gap-3">
                <span className="annot tnum text-blue">{s.index}</span>
                <h3 className="font-display text-2xl leading-none text-paper">{s.title}</h3>
              </div>
              <p className="mt-3 text-[1.0625rem] text-paper">{s.claim}</p>
              <p className="mt-2 text-paper-dim">{s.body}</p>
              <p className="annot mt-4 border-l border-jade pl-3 text-jade">{s.proof}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ActProgress({
  progress,
  act,
}: {
  progress: MotionValue<number>;
  act: number;
}) {
  const width = useTransform(progress, [0.03, 0.97], ["0%", "100%"], { clamp: true });
  return (
    <div className="hidden w-64 sm:block">
      <div className="flex justify-between">
        {stages.map((s, i) => (
          <span
            key={s.id}
            className={`annot transition-colors duration-300 ${
              i === act ? "text-blue" : "text-paper-faint"
            }`}
          >
            {s.title.toLowerCase()}
          </span>
        ))}
      </div>
      <div className="mt-2 h-px w-full bg-line">
        <motion.div className="h-full bg-blue" style={{ width }} />
      </div>
    </div>
  );
}

function StageCopy({ act }: { act: number }) {
  return (
    <div className="relative min-h-0 md:min-h-[19rem] md:self-center">
      {stages.map((s, i) => (
        <motion.div
          key={s.id}
          className="md:absolute md:inset-0"
          initial={false}
          animate={{
            opacity: i === act ? 1 : 0,
            y: i === act ? 0 : i < act ? -18 : 18,
            /* Hide outright once faded. Leaving a 0-opacity copy stacked on
               the live one is what produced the ghosted double headline. */
            transitionEnd: { visibility: i === act ? "visible" : "hidden" },
          }}
          transition={{
            duration: i === act ? 0.55 : 0.3,
            delay: i === act ? 0.12 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ pointerEvents: i === act ? "auto" : "none" }}
          aria-hidden={i !== act}
        >
          <div className={i === act ? "block" : "hidden md:block"}>
            <div className="flex items-baseline gap-3">
              <span className="annot tnum text-blue">{s.index}</span>
              <h3 className="font-display text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-none text-paper">
                {s.title}
              </h3>
            </div>
            <p className="mt-3 text-[1.0625rem] text-paper md:mt-5 md:text-xl">{s.claim}</p>
            <p className="mt-3 hidden text-paper-dim md:mt-4 md:block">{s.body}</p>
            <p className="annot mt-4 hidden border-l border-jade pl-3 text-jade md:mt-6 md:block">
              {s.proof}
            </p>
          </div>
        </motion.div>
      ))}
      {/* The full narrative stays in the document for assistive tech and for
          anyone who does not scroll through the pinned sequence. On phones it
          is also rendered visibly below the section — see StageNotes. */}
      <div className="sr-only">
        {stages.map((s) => (
          <div key={s.id}>
            <h3>{s.title}</h3>
            <p>{s.claim}</p>
            <p>{s.body}</p>
            <p>{s.proof}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Reduced motion: the finished system and the full narrative, no pinning. */
function StaticSystem({ layout }: { layout: Layout }) {
  return (
    <section id="system" className="scroll-mt-24 py-24 md:py-32" aria-labelledby="system-heading-static">
      <div className="shell">
        <SectionMark index="02" label="the system" />
        <h2 id="system-heading-static" className="font-display t-section mt-6 text-paper">
          Capture, automate, optimize.
        </h2>

        <div className="mt-10 overflow-x-auto rounded-sm border border-line bg-raised/40 p-4">
          <svg
            viewBox={layout.viewBox}
            className="h-auto w-full min-w-[720px]"
            role="img"
            aria-label="A system diagram. WhatsApp, web form, missed call and Instagram enquiries feed into a single intake. Intake feeds qualification, which fans out into a CRM record, a reply and quote, a booking, and a follow-up. All four converge into measurement, which loops back into qualification."
          >
            {EDGES.map((e) => (
              <path
                key={`${e.from}-${e.to}`}
                d={
                  e.loop
                    ? layout.loopPath
                    : edgePath(layout.pos[e.from], layout.pos[e.to], layout.axis)
                }
                fill="none"
                stroke={
                  e.loop ? "var(--c-ochre)" : e.act === 2 ? "var(--c-jade)" : "var(--c-blue)"
                }
                strokeWidth={e.loop ? 1 : 1.25}
                strokeDasharray={e.loop ? "5 4" : undefined}
                opacity={0.75}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {NODES.map((n) => {
              const pt = layout.pos[n.id];
              const tone = TONE[n.tone];
              return (
                <g key={n.id}>
                  <rect
                    x={pt.cx - pt.w / 2}
                    y={pt.cy - pt.h / 2}
                    width={pt.w}
                    height={pt.h}
                    rx="3"
                    fill={tone.fill}
                    stroke={tone.stroke}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <text
                    x={pt.cx}
                    y={n.sub ? pt.cy - 3 : pt.cy + layout.font * 0.35}
                    textAnchor="middle"
                    fill="var(--c-paper)"
                    fontSize={layout.font}
                    fontFamily="var(--font-sans)"
                    fontWeight={500}
                  >
                    {n.label}
                  </text>
                  {n.sub && (
                    <text
                      x={pt.cx}
                      y={pt.cy + layout.subFont + 4}
                      textAnchor="middle"
                      fill={tone.accent}
                      fontSize={layout.subFont}
                      fontFamily="var(--font-mono)"
                    >
                      {n.sub}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {stages.map((s) => (
            <div key={s.id}>
              <div className="flex items-baseline gap-3">
                <span className="annot tnum text-blue">{s.index}</span>
                <h3 className="font-display text-3xl leading-none text-paper">{s.title}</h3>
              </div>
              <p className="mt-4 text-lg text-paper">{s.claim}</p>
              <p className="mt-3 text-paper-dim">{s.body}</p>
              <p className="annot mt-4 border-l border-jade pl-3 text-jade">{s.proof}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
