"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * A day on an automated operations floor, driven by scroll.
 *
 *   08:00  work piles up unhandled around the edges of the business
 *   09:00  six agents come online and pull their area's work in
 *   13:00  the agents hand work to each other — the multi-agent part
 *   18:00  everything lands back in the business, finished
 *
 * The story is carried by the picture, not the caption: twelve pieces of work
 * visibly travel from the outer ring, to an agent, across to another agent,
 * and home again. Wires draw in proportion to scroll position, so the whole
 * thing scrubs backwards as well as forwards.
 *
 * One square viewBox serves every width — no second mobile arrangement to
 * keep in sync. Section and sticky are both measured in svh, because mixing
 * vh with svh releases the pin before the story finishes on a phone.
 *
 * Concurrent SMIL packets are deliberately capped at ten: sixteen of them
 * cost about five frames per hundred under 4x CPU throttling, and the story
 * reads exactly the same with half the spokes carrying traffic.
 *
 * HONESTY: an illustration of how the pieces fit together, not a client
 * result. The closing numbers are labelled as such on screen.
 */

const VB = 420;
const CENTER = { x: 210, y: 202 };
const RING = 146;
const NODE_W = 96;
const NODE_H = 32;

const AGENTS = [
  { id: "sales", name: "Sales", angle: -90 },
  { id: "bookings", name: "Bookings", angle: -30 },
  { id: "accounts", name: "Accounts", angle: 30 },
  { id: "insight", name: "Insight", angle: 90 },
  { id: "ops", name: "Operations", angle: 150 },
  { id: "support", name: "Support", angle: 210 },
];

const at = (angle: number, radius: number) => ({
  x: CENTER.x + radius * Math.cos((angle * Math.PI) / 180),
  y: CENTER.y + radius * Math.sin((angle * Math.PI) / 180),
});

const NODE = AGENTS.map((a) => at(a.angle, RING));

/** Who passes work to whom, once the agents start talking to each other. */
const HANDOFF: Record<number, number> = { 0: 1, 5: 4, 1: 2, 4: 3 };

const ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  home: i % 6,
  idle: at((i * 37) % 360, 182 + ((i * 13) % 26)),
  jitter: ((i * 17) % 7) - 3,
}));

const ACTS = [
  {
    time: "08:00",
    title: "Work piles up",
    note: "Enquiries, questions, bookings, invoices. All of it arrives at once, and none of it is assigned to anyone.",
  },
  {
    time: "09:00",
    title: "Six agents, six areas",
    note: "Each agent pulls in the work for its own area and starts clearing it — in parallel, not in a queue.",
  },
  {
    time: "13:00",
    title: "They hand work to each other",
    note: "A lead becomes a booking becomes an invoice, with nobody carrying it across. This is the part one chatbot cannot do.",
  },
  {
    time: "18:00",
    title: "The day closes clear",
    note: "Illustrative, not a client result — the shape of the outcome, with your own numbers still to be filled in.",
  },
];

const METRICS = [
  { label: "First reply", before: "6 hrs", after: "30 sec", fill: 0.94 },
  { label: "Handled without a human", before: "0%", after: "72%", fill: 0.72 },
  { label: "Admin hours a week", before: "46", after: "12", fill: 0.74 },
  { label: "Quotes chased", before: "40%", after: "100%", fill: 1 },
];

/** Where each act begins, as a fraction of the pinned scroll. */
const ACT_AT = [0, 0.17, 0.44, 0.71];

const TONE = {
  idle: "var(--c-ochre)",
  work: "var(--c-blue)",
  done: "var(--c-jade)",
} as const;

export function AgentFloor() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [act, setAct] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = p < ACT_AT[1] ? 0 : p < ACT_AT[2] ? 1 : p < ACT_AT[3] ? 2 : 3;
    setAct((cur) => (cur === next ? cur : next));
  });

  if (reduced) return <StaticFloor />;

  return (
    <>
      <div ref={sectionRef} className="relative h-[330svh] md:h-[360svh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="shell w-full py-20 md:py-24">
            <div className="panel overflow-hidden">
              <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
                <Caption act={act} progress={scrollYProgress} />
                <Stage act={act} progress={scrollYProgress} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Below the pin on narrow screens: the closing numbers do not fit
          inside a phone-height sticky without crowding the picture. */}
      <div className="shell lg:hidden">
        <div className="panel p-6">
          <p className="annot">
            what changed, illustrative rather than a client result
          </p>
          <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {METRICS.map((m) => (
              <div key={m.label}>
                <dt className="annot">{m.label}</dt>
                <dd className="mt-1.5 flex items-baseline gap-2.5">
                  <span className="annot text-paper-faint line-through">{m.before}</span>
                  <span aria-hidden className="h-px w-3 bg-jade" />
                  <span className="font-display tnum text-xl leading-none text-jade">
                    {m.after}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

/* ---------------- caption ---------------- */

function Caption({ act, progress }: { act: number; progress: MotionValue<number> }) {
  const current = ACTS[act];
  const done = act === 3;
  const bar = useTransform(progress, [0.03, 0.97], ["0%", "100%"], { clamp: true });

  return (
    <div className="border-b border-line p-5 sm:p-7 md:p-9 lg:border-b-0 lg:border-r">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="annot">a day on an automated floor</p>
        <div className="hidden w-28 sm:block" aria-hidden>
          <div className="h-px w-full bg-line">
            <motion.div className="h-px bg-blue" style={{ width: bar }} />
          </div>
        </div>
      </div>

      <div className="mt-4 min-h-[7.5rem] sm:min-h-[6.5rem] lg:min-h-[10rem]">
        <motion.div
          key={act}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-baseline gap-3">
            <span className="annot tnum text-ochre">{current.time}</span>
            <h2
              id="floor-heading"
              className="font-display text-[clamp(1.25rem,1.05rem+1.1vw,2rem)] leading-tight text-paper"
            >
              {current.title}
            </h2>
          </div>
          <p className="mt-2.5 max-w-md text-[0.8125rem] leading-relaxed text-paper-dim sm:text-sm md:text-base">
            {current.note}
          </p>
        </motion.div>
      </div>

      {/* Reserved space, so nothing jumps when the numbers land. */}
      <div className="mt-4 hidden min-h-[11rem] lg:block">
        <Metrics progress={progress} visible={done} />
      </div>
    </div>
  );
}

function Metrics({ progress, visible }: { progress: MotionValue<number>; visible: boolean }) {
  return (
    <motion.dl
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3.5 border-t border-line pt-5"
    >
      {METRICS.map((m, i) => (
        <MetricRow key={m.label} metric={m} progress={progress} index={i} />
      ))}
    </motion.dl>
  );
}

function MetricRow({
  metric,
  progress,
  index,
}: {
  metric: (typeof METRICS)[number];
  progress: MotionValue<number>;
  index: number;
}) {
  const from = 0.76 + index * 0.035;
  const width = useTransform(progress, [from, from + 0.12], ["0%", `${metric.fill * 100}%`], {
    clamp: true,
  });
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <dt className="annot">{metric.label}</dt>
        <dd className="flex items-baseline gap-2">
          <span className="annot text-paper-faint line-through">{metric.before}</span>
          <span className="font-display tnum text-lg leading-none text-jade">{metric.after}</span>
        </dd>
      </div>
      <div className="mt-1.5 h-px w-full bg-line">
        <motion.div className="h-px bg-jade" style={{ width }} />
      </div>
    </div>
  );
}

/* ---------------- stage ---------------- */

function Stage({ act, progress }: { act: number; progress: MotionValue<number> }) {
  /* Wires draw in proportion to scroll, so the picture scrubs. */
  const spoke = useTransform(progress, [0.19, 0.36], [0, 1], { clamp: true });
  const spokeOpacity = useTransform(progress, [0.19, 0.26], [0, 0.32], { clamp: true });
  const arc = useTransform(progress, [0.46, 0.66], [0, 1], { clamp: true });
  const arcOpacity = useTransform(progress, [0.46, 0.53], [0, 0.6], { clamp: true });
  const coreH = useTransform(progress, [0.72, 0.8], [44, 76], { clamp: true });

  const placeOf = (item: (typeof ITEMS)[number]) => {
    if (act === 0) return { ...item.idle, tone: "idle" as const };
    if (act === 1 || act === 2) {
      const target = act === 2 ? (HANDOFF[item.home] ?? item.home) : item.home;
      const n = NODE[target];
      return { x: n.x + item.jitter * 3, y: n.y + NODE_H / 2 + 10, tone: "work" as const };
    }
    const col = item.id % 6;
    const row = Math.floor(item.id / 6);
    return { x: CENTER.x - 32 + col * 13, y: CENTER.y + 26 + row * 11, tone: "done" as const };
  };

  return (
    <div className="flex min-h-0 items-center justify-center p-3 sm:p-5 md:p-6">
      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="h-auto max-h-[52svh] w-full lg:max-h-none"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="An illustration that plays as you scroll. Twelve pieces of work start unhandled around the edge of a business. Six agents — sales, bookings, accounts, insight, operations and support — pull in the work for their area, then hand it on to each other: sales to bookings, bookings to accounts, support to operations, operations to insight. By the end all twelve have returned to the business, finished."
      >
        {/* spokes: the business to each agent */}
        {NODE.map((n, i) => (
          <motion.line
            key={`spoke-${i}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={n.x}
            y2={n.y}
            stroke="var(--c-blue)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: spoke, opacity: spokeOpacity }}
          />
        ))}

        {/* handoff arcs, bowed around the hub */}
        {Object.entries(HANDOFF).map(([from, to], i) => {
          const a = NODE[Number(from)];
          const b = NODE[to];
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          const cx = CENTER.x + (mx - CENTER.x) / 0.62;
          const cy = CENTER.y + (my - CENTER.y) / 0.62;
          const d = `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
          return (
            <g key={`h-${from}`}>
              <motion.path
                d={d}
                fill="none"
                stroke="var(--c-jade)"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: arc, opacity: arcOpacity }}
              />
              {act >= 2 && (
                <circle r="3.5" fill="var(--c-jade)">
                  <animateMotion
                    dur="1.9s"
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* the business itself */}
        <motion.rect
          x={CENTER.x - 62}
          width={124}
          rx="4"
          fill="var(--c-blue-deep)"
          stroke={act === 3 ? "var(--c-jade)" : "var(--c-blue)"}
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
          y={CENTER.y - 22}
          style={{ height: coreH }}
        />
        <text
          x={CENTER.x}
          y={CENTER.y + 2}
          textAnchor="middle"
          fill="var(--c-paper)"
          fontSize="14"
          fontFamily="var(--font-sans)"
          fontWeight={500}
        >
          Your business
        </text>

        {/* the agents */}
        {AGENTS.map((a, i) => {
          const n = NODE[i];
          const live = act >= 1;
          return (
            <motion.g
              key={a.id}
              initial={false}
              animate={{ opacity: act === 0 ? 0.35 : 1, scale: 1 }}
              transition={{ duration: 0.45, delay: act === 1 ? i * 0.06 : 0 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <rect
                x={n.x - NODE_W / 2}
                y={n.y - NODE_H / 2}
                width={NODE_W}
                height={NODE_H}
                rx="3"
                fill={live ? "var(--c-raised-2)" : "var(--c-raised)"}
                stroke={
                  act === 3 ? "var(--c-jade)" : live ? "var(--c-blue)" : "var(--c-line)"
                }
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fill="var(--c-paper)"
                fontSize="13"
                fontFamily="var(--font-sans)"
              >
                {a.name}
              </text>
              <circle
                cx={n.x - NODE_W / 2 + 8}
                cy={n.y - NODE_H / 2 + 7}
                r="2.5"
                fill={
                  act === 3 ? "var(--c-jade)" : live ? "var(--c-blue)" : "var(--c-paper-faint)"
                }
                style={
                  live && act < 3
                    ? { animation: `pulse-node 1.5s ease-in-out ${i * 0.2}s infinite` }
                    : undefined
                }
              />
            </motion.g>
          );
        })}

        {/* Once the wiring exists it never stops carrying work. This is what
            makes the end state a loop rather than a frozen final frame. */}
        {act >= 1 &&
          NODE.filter((_, i) => i % 2 === 0).map((n, i) => (
            <circle key={`flow-${i}`} r="2.5" fill="var(--c-blue)" opacity="0.75">
              <animateMotion
                dur="2.6s"
                begin={`${i * 0.34}s`}
                repeatCount="indefinite"
                path={`M ${n.x} ${n.y} L ${CENTER.x} ${CENTER.y}`}
              />
            </circle>
          ))}

        {/* At rest the day is still running: new work keeps arriving from the
            outside and keeps being picked up. */}
        {act === 3 &&
          AGENTS.filter((_, i) => i % 2 === 1).map((a, k) => {
            const i = k * 2 + 1;
            const o = at(a.angle, 198);
            const n = NODE[i];
            return (
              <circle key={`in-${a.id}`} r="2.5" fill="var(--c-ochre)" opacity="0.8">
                <animateMotion
                  dur="3.2s"
                  begin={`${k * 0.8}s`}
                  repeatCount="indefinite"
                  path={`M ${o.x} ${o.y} L ${n.x} ${n.y}`}
                />
              </circle>
            );
          })}

        {/* the work — the thing you actually watch move */}
        {ITEMS.map((item) => {
          const p = placeOf(item);
          return (
            <motion.rect
              key={item.id}
              width="9"
              height="9"
              rx="1.5"
              initial={false}
              animate={{ x: p.x - 4.5, y: p.y - 4.5, fill: TONE[p.tone] }}
              transition={{
                duration: 0.95,
                delay: (item.id % 6) * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ---------------- reduced motion ---------------- */

/** The finished floor, drawn once, with the whole story as plain text. */
function StaticFloor() {
  return (
    <div className="shell">
      <div className="panel overflow-hidden">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
          <div className="border-b border-line p-7 md:p-9 lg:border-b-0 lg:border-r">
            <p className="annot">a day on an automated floor</p>
            <ol className="mt-6 space-y-6">
              {ACTS.map((a) => (
                <li key={a.time}>
                  <div className="flex items-baseline gap-3">
                    <span className="annot tnum text-ochre">{a.time}</span>
                    <h2 className="font-display text-xl leading-tight text-paper">{a.title}</h2>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-paper-dim">{a.note}</p>
                </li>
              ))}
            </ol>

            <dl className="mt-8 space-y-3 border-t border-line pt-6">
              {METRICS.map((m) => (
                <div key={m.label} className="flex items-baseline justify-between gap-3">
                  <dt className="annot">{m.label}</dt>
                  <dd className="flex items-baseline gap-2">
                    <span className="annot text-paper-faint line-through">{m.before}</span>
                    <span className="font-display tnum text-lg leading-none text-jade">
                      {m.after}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="p-6">
            <svg
              viewBox={`0 0 ${VB} ${VB}`}
              className="h-auto w-full"
              role="img"
              aria-label="Six agents — sales, bookings, accounts, insight, operations and support — arranged around a business, wired to it and to each other, with twelve pieces of finished work inside the business."
            >
              {NODE.map((n, i) => (
                <line
                  key={i}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={n.x}
                  y2={n.y}
                  stroke="var(--c-blue)"
                  strokeWidth="1"
                  opacity="0.32"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {Object.entries(HANDOFF).map(([from, to]) => {
                const a = NODE[Number(from)];
                const b = NODE[to];
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2;
                const cx = CENTER.x + (mx - CENTER.x) / 0.62;
                const cy = CENTER.y + (my - CENTER.y) / 0.62;
                return (
                  <path
                    key={from}
                    d={`M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`}
                    fill="none"
                    stroke="var(--c-jade)"
                    strokeWidth="1.25"
                    opacity="0.6"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
              <rect
                x={CENTER.x - 62}
                y={CENTER.y - 22}
                width={124}
                height={76}
                rx="4"
                fill="var(--c-blue-deep)"
                stroke="var(--c-jade)"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={CENTER.x}
                y={CENTER.y + 2}
                textAnchor="middle"
                fill="var(--c-paper)"
                fontSize="14"
                fontFamily="var(--font-sans)"
                fontWeight={500}
              >
                Your business
              </text>
              {AGENTS.map((a, i) => {
                const n = NODE[i];
                return (
                  <g key={a.id}>
                    <rect
                      x={n.x - NODE_W / 2}
                      y={n.y - NODE_H / 2}
                      width={NODE_W}
                      height={NODE_H}
                      rx="3"
                      fill="var(--c-raised-2)"
                      stroke="var(--c-jade)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <text
                      x={n.x}
                      y={n.y + 4}
                      textAnchor="middle"
                      fill="var(--c-paper)"
                      fontSize="13"
                      fontFamily="var(--font-sans)"
                    >
                      {a.name}
                    </text>
                  </g>
                );
              })}
              {ITEMS.map((item) => {
                const col = item.id % 6;
                const row = Math.floor(item.id / 6);
                return (
                  <rect
                    key={item.id}
                    x={CENTER.x - 32 + col * 13 - 4.5}
                    y={CENTER.y + 26 + row * 11 - 4.5}
                    width="9"
                    height="9"
                    rx="1.5"
                    fill="var(--c-jade)"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
