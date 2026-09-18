"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { process } from "@/lib/content";

/**
 * How we work. The same connected-node language as the signature sequence,
 * dropped to a smaller scale: one rail, eight stops, drawn by scroll
 * position rather than revealed all at once.
 */
export function ProcessRail() {
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 78%", "end 55%"],
  });

  return (
    <div ref={railRef}>
      {reduced ? (
        <StaticRail />
      ) : (
        <>
          {/* Horizontal rail on wide screens */}
          <div className="hidden lg:block">
            <Rail progress={scrollYProgress} />
          </div>
          {/* Vertical rail below that — same language, rotated */}
          <div className="lg:hidden">
            <VerticalRail progress={scrollYProgress} />
          </div>
        </>
      )}
    </div>
  );
}

function stepWindow(i: number) {
  const step = 0.82 / process.length;
  const from = i * step;
  return [from, from + step * 1.5] as const;
}

function Rail({ progress }: { progress: MotionValue<number> }) {
  const lineScale = useTransform(progress, [0, 0.9], [0, 1], { clamp: true });

  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-[7px] h-px bg-line" aria-hidden />
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 top-[7px] h-px origin-left bg-blue"
        style={{ scaleX: lineScale }}
      />

      <ol className="relative grid grid-cols-8 gap-3">
        {process.map((p, i) => (
          <Stop key={p.step} data={p} index={i} progress={progress} />
        ))}
      </ol>
    </div>
  );
}

function Stop({
  data,
  index,
  progress,
}: {
  data: (typeof process)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const [from, to] = stepWindow(index);
  const t = useTransform(progress, [from, to], [0, 1], { clamp: true });
  const opacity = useTransform(t, [0, 0.6], [0.25, 1]);
  const dotScale = useTransform(t, [0, 0.5], [0.5, 1]);
  const last = index === process.length - 1;

  return (
    <motion.li style={{ opacity }} className="relative pt-0">
      <motion.span
        aria-hidden
        className={`block h-[15px] w-[15px] rounded-full border-2 ${
          last ? "border-ochre bg-ink" : "border-blue bg-ink"
        }`}
        style={{ scale: dotScale }}
      />
      <p className="annot tnum mt-4 text-blue">{String(index + 1).padStart(2, "0")}</p>
      <p className="mt-1 font-display text-xl leading-tight text-paper">{data.step}</p>
      <p className="mt-2 text-[0.8125rem] leading-relaxed text-paper-dim">{data.note}</p>
    </motion.li>
  );
}

function VerticalRail({ progress }: { progress: MotionValue<number> }) {
  const lineScale = useTransform(progress, [0, 0.9], [0, 1], { clamp: true });

  return (
    <div className="relative pl-7">
      <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line" aria-hidden />
      <motion.div
        aria-hidden
        className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-blue"
        style={{ scaleY: lineScale }}
      />
      <ol className="space-y-8">
        {process.map((p, i) => (
          <VStop key={p.step} data={p} index={i} progress={progress} />
        ))}
      </ol>
    </div>
  );
}

function VStop({
  data,
  index,
  progress,
}: {
  data: (typeof process)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const [from, to] = stepWindow(index);
  const t = useTransform(progress, [from, to], [0, 1], { clamp: true });
  const opacity = useTransform(t, [0, 0.6], [0.3, 1]);
  const dotScale = useTransform(t, [0, 0.5], [0.5, 1]);
  const last = index === process.length - 1;

  return (
    <motion.li style={{ opacity }} className="relative">
      <motion.span
        aria-hidden
        className={`absolute -left-7 top-1 block h-[15px] w-[15px] rounded-full border-2 ${
          last ? "border-ochre bg-ink" : "border-blue bg-ink"
        }`}
        style={{ scale: dotScale }}
      />
      <div className="flex items-baseline gap-3">
        <span className="annot tnum text-blue">{String(index + 1).padStart(2, "0")}</span>
        <p className="font-display text-xl leading-tight text-paper">{data.step}</p>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-paper-dim">{data.note}</p>
    </motion.li>
  );
}

/** Reduced motion: the whole rail, drawn and still. */
function StaticRail() {
  return (
    <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {process.map((p, i) => (
        <li key={p.step} className="relative border-t border-blue pt-4">
          <div className="flex items-baseline gap-3">
            <span className="annot tnum text-blue">{String(i + 1).padStart(2, "0")}</span>
            <p className="font-display text-xl leading-tight text-paper">{p.step}</p>
          </div>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-paper-dim">{p.note}</p>
        </li>
      ))}
    </ol>
  );
}
