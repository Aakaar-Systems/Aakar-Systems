import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProcessRail } from "@/components/Process";
import { CtaBand } from "@/components/CtaBand";
import { Engagements } from "@/components/Engagements";
import { Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "Eight steps from discovery to optimisation: how Aakaar Systems maps, designs, integrates, validates and launches a business system — and what we do after it goes live.",
  alternates: { canonical: "/how-we-work" },
};

const FAQS = [
  {
    q: "How long does a system take to build?",
    a: "Most first systems go live in three to five weeks. Discovery and mapping take the first week or so, and we would rather spend the time there than rebuild something later.",
  },
  {
    q: "What do you need from us?",
    a: "A couple of hours of your time up front, access to the tools you already use, and someone on your side who can answer questions about how the business actually runs day to day.",
  },
  {
    q: "What does it cost?",
    a: "It depends on the system and how much needs integrating. We quote a fixed price for the build after the mapping step, so you are never agreeing to an open-ended number.",
  },
  {
    q: "What happens if it gets something wrong?",
    a: "Every system has a human escalation path from day one, and we watch the first week closely. If the system is unsure, it hands over rather than guessing.",
  },
  {
    q: "Do we own it?",
    a: "Yes. Accounts, data and access stay in your name. If you stop working with us, the system keeps running.",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="how we work"
        lines={["Eight steps.", "No mystery in", "any of them."]}
        lede="Most of the risk in a project like this sits in the first two steps. We spend real time there, so that by the time anything is built you already know what it will do, what it will not, and what it costs."
      />

      <section className="section-tight">
        <div className="shell">
          <ProcessRail />
        </div>
      </section>

      <section className="section-tight">
        <Engagements />
      </section>

      <section className="pb-24 md:pb-36">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display t-section text-paper">
                The questions we always get.
              </h2>
            </div>

            <dl className="border-t border-line">
              {FAQS.map((item, i) => (
                <Reveal
                  key={item.q}
                  kind="rise"
                  delay={i * 0.04}
                  className="border-b border-line py-6"
                >
                  <dt className="font-display text-xl leading-snug text-paper md:text-2xl">
                    {item.q}
                  </dt>
                  <dd className="mt-3 max-w-2xl text-paper-dim">{item.a}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaBand
        title="Start with the first step."
        note="Discovery costs you a conversation. If we do not think a system is worth building for you, we will say so then rather than three weeks in."
      />
    </>
  );
}
