"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * A hairline that fills as you move down the page — the same drafting
 * line language as everything else, doing a real job on a long scroll.
 * Driven by a motion value, so it never re-renders React.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-blue/70"
      style={{ scaleX: width }}
    />
  );
}
