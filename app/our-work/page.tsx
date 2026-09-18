import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProofBody } from "@/components/Proof";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Concept systems built in-house to demonstrate the approach: a working AI Lead System you can try, and an AI Booking System for a clinic. No invented clients, no fabricated testimonials.",
  alternates: { canonical: "/our-work" },
};

export default function OurWorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="our work"
        lines={["Try it yourself.", "It takes about", "twenty seconds."]}
        lede="We are a new studio, so what follows are concept systems we built ourselves rather than client case studies. The first one is live on this page. Answer it the way a customer would."
      />

      <section className="py-16 md:py-24">
        <ProofBody />
      </section>

      <CtaBand
        title="Want one of these pointed at your business?"
        note="Tell us where enquiries are going cold and we will show you what the same system looks like with your workflow in it."
      />
    </>
  );
}
