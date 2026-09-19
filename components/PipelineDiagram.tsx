"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Pipeline } from "@/lib/services";

/**
 * A system's architecture, drawn from its pipeline data.
 *
 * Columns are laid out automatically and every node in a column wires to every
 * node in the next, so adding a step to the data adds it to the drawing. Same
 * node-and-wire language as the signature sequence, at component scale.
 *
 * Draws once on enter rather than being scroll-linked: this sits inside an
 * accordion the visitor opened deliberately, so the reveal belongs to that
 * action, not to their scroll position.
 */

const COL_W = 150;
const COL_GAP = 58;
const NODE_H = 34;
const NODE_GAP = 12;
const PAD_Y = 14;

export function PipelineDiagram({
  pipeline,
  label,
  active = true,
}: {
  pipeline: Pipeline;
  label: string;
  active?: boolean;
}) {
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  const cols = pipeline.length;
  const tallest = Math.max(...pipeline.map((c) => c.length));
  const width = cols * COL_W + (cols - 1) * COL_GAP;
  const height = tallest * NODE_H + (tallest - 1) * NODE_GAP + PAD_Y * 2;

  const posOf = (ci: number, ni: number) => {
    const col = pipeline[ci];
    const blockH = col.length * NODE_H + (col.length - 1) * NODE_GAP;
    const top = (height - blockH) / 2 + ni * (NODE_H + NODE_GAP);
    return { x: ci * (COL_W + COL_GAP), y: top, cx: ci * (COL_W + COL_GAP) + COL_W / 2, cy: top + NODE_H / 2 };
  };

  /* Every node feeds every node in the next column. */
  const edges: { d: string; key: string; order: number }[] = [];
  for (let c = 0; c < cols - 1; c++) {
    pipeline[c].forEach((_, i) => {
      pipeline[c + 1].forEach((__, j) => {
        const a = posOf(c, i);
        const b = posOf(c + 1, j);
        const x1 = a.x + COL_W;
        const x2 = b.x;
        const mid = x1 + (x2 - x1) * 0.5;
        edges.push({
          key: `${c}-${i}-${j}`,
          order: c,
          d: `M ${x1} ${a.cy} C ${mid} ${a.cy}, ${mid} ${b.cy}, ${x2} ${b.cy}`,
        });
      });
    });
  }

  const tone = (ci: number) =>
    ci === 0
      ? { stroke: "var(--c-line-bright)", fill: "var(--c-raised-2)", text: "var(--c-paper-dim)" }
      : ci === cols - 1
        ? { stroke: "var(--c-ochre)", fill: "var(--c-raised)", text: "var(--c-ochre)" }
        : ci === 1
          ? { stroke: "var(--c-blue)", fill: "var(--c-blue-deep)", text: "var(--c-paper)" }
          : { stroke: "var(--c-jade)", fill: "var(--c-raised)", text: "var(--c-paper)" };

  return (
    <div>
    <div className="-mx-1 overflow-x-auto pb-2">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full min-w-[34rem]"
        role="img"
        aria-label={`${label} architecture: ${pipeline
          .map((c) => c.join(" and "))
          .join(", then ")}.`}
      >
        {edges.map((e) => (
          <motion.path
            key={e.key}
            d={e.d}
            fill="none"
            stroke="var(--c-blue)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            opacity={0.45}
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={active ? { pathLength: 1, opacity: 0.45 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + e.order * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        {/* Work moving through the pipeline, once it is drawn. */}
        {active && !reduced &&
          edges
            .filter((e) => e.key.endsWith("-0"))
            .map((e) => (
              <circle key={`p-${e.key}`} r="2.5" fill="var(--c-blue)" opacity="0.85">
                <animateMotion
                  dur="2.8s"
                  begin={`${0.7 + e.order * 0.45}s`}
                  repeatCount="indefinite"
                  path={e.d}
                />
              </circle>
            ))}

        {pipeline.map((col, ci) =>
          col.map((node, ni) => {
            const p = posOf(ci, ni);
            const t = tone(ci);
            return (
              <motion.g
                key={`${uid}-${ci}-${ni}`}
                initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: ci * 0.1 + ni * 0.04 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <rect
                  x={p.x}
                  y={p.y}
                  width={COL_W}
                  height={NODE_H}
                  rx="3"
                  fill={t.fill}
                  stroke={t.stroke}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={p.cx}
                  y={p.cy + 4}
                  textAnchor="middle"
                  fill={t.text}
                  fontSize="13"
                  fontFamily="var(--font-sans)"
                  fontWeight={ci === 1 ? 500 : 400}
                >
                  {node}
                </text>
              </motion.g>
            );
          }),
        )}
      </svg>
    </div>
      {/* The diagram is wider than a phone on purpose — five columns at a
          legible size will not fit. Say that it scrolls rather than letting
          it look cut off. */}
      <p className="annot mt-1 sm:hidden">drag the diagram sideways to follow the flow</p>
    </div>
  );
}
