import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StudioBody } from "@/components/Studio";
import { IndiaBody } from "@/components/IndiaAngle";
import { CtaBand } from "@/components/CtaBand";
import { SectionMark } from "@/components/ui";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Aakaar Systems is a small AI business systems studio in India, built by a founding team who chose to build together. WhatsApp-first, made for how Indian businesses actually run.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="the studio"
        lines={["We chose to", "build together."]}
        lede="Aakaar means form. Shape. The moment something formless is given structure. It is a fair description of the job, and it is the reason the studio exists in the shape it does."
      />

      <section className="section-tight">
        <StudioBody />
      </section>

      <section className="pb-8">
        <div className="shell">
          <SectionMark label="built for here" />
          <h2 className="font-display t-section mt-6 max-w-3xl text-paper">
            A Western playbook, translated, is still wrong.
          </h2>
          <p className="lede mt-6 max-w-2xl">
            Most automation advice assumes email, a long consideration cycle, and a buyer at
            a desk. None of those hold for a clinic in Nashik or a studio in Indore.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-36">
        <IndiaBody />
      </section>

      <CtaBand />
    </>
  );
}
