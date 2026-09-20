import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { DigitalFoundation, Pricing } from "@/components/Offer";
import { Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Honest price anchors for AI business systems in India. Builds from ₹15,000, complete systems from ₹40,000, optimization retainers from ₹8,000 a month, and a Digital Foundation tier from ₹3,000 for businesses getting online for the first time.",
  alternates: { canonical: "/pricing" },
};

const NOTES = [
  {
    q: "Why ranges instead of a fixed price?",
    a: "The honest answer depends on your workflow. A fixed number published before we have seen your business is a promise we might have to walk back.",
  },
  {
    q: "When do I get a real number?",
    a: "After mapping. It costs you a conversation, the map is yours either way, and it ends with a fixed quote.",
  },
  {
    q: "Is the retainer compulsory?",
    a: "No. The system is yours and runs without us. The retainer exists because a system nobody tunes drifts by month three.",
  },
  {
    q: "What if my budget is under all of this?",
    a: "Say so. Digital Foundation above may be the right first step, or we will tell you to spend the money elsewhere for now.",
  },
  {
    q: "Will these prices change?",
    a: "Probably upward. These are conservative anchors from a studio with no delivery history yet.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="pricing"
        lines={["What it costs,", "before you", "have to ask."]}
        lede="You should not have to book a call to find out whether we are in your league. Real ranges we would quote, with the final number set after mapping."
      />

      <section className="section-tight">
        <Pricing />
      </section>

      <section className="section-tight">
        <DigitalFoundation />
      </section>

      {/* The questions a price list always raises, answered here rather than
          left for the call. */}
      <section className="pb-24 md:pb-36">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display t-section text-paper">
                Before you ask.
              </h2>
            </div>

            <dl className="border-t border-line">
              {NOTES.map((n, i) => (
                <Reveal
                  key={n.q}
                  kind="rise"
                  delay={i * 0.04}
                  className="border-b border-line py-6"
                >
                  <dt className="font-display text-xl leading-snug text-paper md:text-2xl">
                    {n.q}
                  </dt>
                  <dd className="mt-3 max-w-2xl text-paper-dim">{n.a}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaBand
        title="Tell us the budget you actually have."
        note="We would rather scope something real to your number than quote you a wish. If it does not add up, we will say so."
      />
    </>
  );
}
