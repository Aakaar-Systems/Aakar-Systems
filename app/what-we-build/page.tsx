import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SystemsList } from "@/components/Systems";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/ui";
import { Glyph } from "@/components/Glyph";
import { Sectors } from "@/components/Engagements";
import { ConnectedLayers, PricingTeaser, Retainer } from "@/components/Offer";

export const metadata: Metadata = {
  title: "What we build",
  description:
    "Five AI systems with defined outcomes — Lead, Customer, Booking, Operations and Growth — built onto the tools your business already uses. Web, design, content and growth work included. Pricing from ₹15,000.",
  alternates: { canonical: "/what-we-build" },
};

/**
 * Ordered as a funnel, not a menu:
 *   the five systems (the offer)  →  what comes included  →  what happens
 *   after launch  →  a doorway to pricing  →  who it is for.
 */
export default function WhatWeBuildPage() {
  return (
    <>
      <PageHeader
        eyebrow="what we build"
        lines={["Five systems.", "Each one does", "a specific job."]}
        lede="Not hours, not a bundle of services. Each one is a defined system with a defined outcome. Open any to see how it is wired."
      />

      <section className="section-tight">
        <div className="shell">
          <SystemsList />
        </div>
      </section>

      {/* Web / design / content / growth as one strip of included layers,
          never as four more headline services. */}
      <section className="section-tight">
        <ConnectedLayers />
      </section>

      <section className="section-tight">
        <Retainer />
      </section>

      {/* Price anchors live on their own page; this is just the doorway. */}
      <section className="section-tight">
        <PricingTeaser />
      </section>

      <section className="section-tight">
        <Sectors />
      </section>

      {/* Three promises, as pictures with one line each. */}
      <section className="pb-24 md:pb-36">
        <div className="shell">
          <Reveal kind="wipe">
            <ul className="panel grid gap-10 p-7 md:grid-cols-3 md:gap-12 md:p-10">
              {[
                {
                  glyph: "sunrise",
                  title: "You do not need to understand it",
                  line: "You need to know what changes on a Monday morning.",
                },
                {
                  glyph: "plug",
                  title: "Nothing you use gets thrown away",
                  line: "Your WhatsApp number, your calendar, your CRM.",
                },
                {
                  glyph: "handover",
                  title: "A person is always reachable",
                  line: "The system steps aside the moment it should.",
                },
              ].map((item) => (
                <li key={item.title}>
                  <span className="text-blue">
                    <Glyph name={item.glyph} className="h-7 w-7" />
                  </span>
                  <p className="mt-4 font-display text-xl leading-tight text-paper">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-paper-dim">{item.line}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Not sure which one you need?"
        note="Most businesses need one of these, not five. Tell us what is going wrong and we will point at the one that fixes it — or tell you that none of them do."
      />
    </>
  );
}
