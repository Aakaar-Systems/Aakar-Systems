import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { SystemScroll } from "@/components/SystemScroll";
import { SystemsTeaser } from "@/components/Systems";
import { IndiaTeaser } from "@/components/IndiaAngle";
import { CtaBand } from "@/components/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      {/* The signature sequence. Pinned, scroll-linked, self-assembling. */}
      <SystemScroll />
      <SystemsTeaser />
      <IndiaTeaser />
      <CtaBand />
    </>
  );
}
