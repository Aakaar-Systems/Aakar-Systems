import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SystemsList } from "@/components/Systems";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/ui";
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
        lede="We do not sell hours or a bundle of services. Each of these is a defined system with a defined outcome, built onto the tools you already use. Open any one to see how it is wired."
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

      {/* Plain-language explainer, for anyone who does not work in software. */}
      <section className="pb-24 md:pb-36">
        <div className="shell">
          <Reveal kind="wipe">
            <div className="panel p-7 md:p-10">
              <p className="annot">in plain words</p>
              <div className="mt-5 grid gap-8 md:grid-cols-3 md:gap-12">
                <div>
                  <p className="font-display text-xl text-paper">
                    You do not need to understand the technology.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                    That is our job. You need to know what changes on a Monday morning:
                    fewer missed enquiries, fewer repeated answers, less chasing.
                  </p>
                </div>
                <div>
                  <p className="font-display text-xl text-paper">
                    Nothing you use gets thrown away.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                    We build onto your existing WhatsApp number, your calendar, your
                    spreadsheet or CRM. There is no new platform to learn or rent.
                  </p>
                </div>
                <div>
                  <p className="font-display text-xl text-paper">
                    A person is always reachable.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                    The system handles the repetitive part and steps aside the moment a
                    real conversation is needed. Customers are never trapped talking to
                    software.
                  </p>
                </div>
              </div>
            </div>
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
