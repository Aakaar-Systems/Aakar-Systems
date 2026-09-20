import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProofBody } from "@/components/Proof";
import { CtaBand } from "@/components/CtaBand";
import { AgentFloor } from "@/components/AgentFloor";
import { SectionMark } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "See what AI automation looks like across a whole business: six agents running sales, support, bookings, operations, accounts and reporting, handing work to each other. Plus concept systems you can try. No invented clients, no fabricated testimonials.",
  alternates: { canonical: "/our-work" },
};

export default function OurWorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="our work"
        lines={["Watch it run.", "Then try one", "yourself."]}
        lede="First, a whole business running on six agents that hand work to each other. Then two concept systems we built ourselves, one live on this page."
      />

      {/* The scale piece: many agents, one business, work moving between them. */}
      <section className="section-tight">
        <div className="shell mb-8">
          <SectionMark index="01" label="the whole floor" />
        </div>
        <AgentFloor />
      </section>

      <section className="section-tight">
        <div className="shell mb-10">
          <SectionMark index="02" label="try one yourself" />
        </div>
        <ProofBody />
      </section>

      <CtaBand
        title="Want one of these pointed at your business?"
        note="Tell us where enquiries are going cold and we will show you what the same system looks like with your workflow in it."
      />
    </>
  );
}
