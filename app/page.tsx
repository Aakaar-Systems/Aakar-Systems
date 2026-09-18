import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { SystemScroll } from "@/components/SystemScroll";
import { SystemsTeaser } from "@/components/Systems";
import { IndiaTeaser } from "@/components/IndiaAngle";
import { CtaBand } from "@/components/CtaBand";
import { LeakCalculator } from "@/components/LeakCalculator";
import { SectionMark } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />

      {/* Their numbers, not ours. Every comparable studio leans on a worked
          example; we have no client results to quote, so the visitor supplies
          the inputs and the arithmetic is shown in full. */}
      <section className="section-tight">
        <div className="shell">
          <SectionMark index="02" label="the arithmetic" />
        </div>
        <div className="shell mt-10">
          <LeakCalculator />
        </div>
      </section>

      {/* The signature sequence. Pinned, scroll-linked, self-assembling. */}
      <SystemScroll />
      <SystemsTeaser />
      <IndiaTeaser />
      <CtaBand />
    </>
  );
}
