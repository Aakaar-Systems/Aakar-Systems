"use client";

import { LeadDemo } from "./LeadDemo";
import { Reveal } from "./ui";

/**
 * Proof. We have no paying clients yet, so there are no case studies,
 * no logos and no testimonials on this site — only concept systems we
 * built ourselves, labelled plainly as such.
 */
export function ProofBody() {
  return (
    <div className="shell">
      {/* The honesty label sits above the demo, not in small print under it. */}
      <Reveal kind="scale" amount={0.1}>
        <div className="panel p-5 md:p-8">
          <div className="mb-6 border-b border-line pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="annot rounded-[2px] border border-ochre px-2 py-1 text-[0.6875rem] text-ochre">
                Concept project
              </span>
              <h2 className="font-display text-xl text-paper md:text-2xl">
                AI Lead System, interiors studio
              </h2>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper-dim">
              Built by us, not commissioned. Chhaya Interiors is fictional and the flow
              is scripted, so this is the shape of the system, not a live model.
            </p>
          </div>

          <LeadDemo />
        </div>
      </Reveal>

      {/* A second concept, described rather than embedded. */}
      <Reveal kind="wipe" className="mt-20 md:mt-28">
        <div className="rule-t pt-14 md:pt-16">
          <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="annot rounded-[2px] border border-ochre px-2 py-1 text-[0.6875rem] text-ochre">
                  Concept project
                </span>
                <h2 className="font-display text-xl text-paper md:text-2xl">
                  AI Booking System, dental clinic
                </h2>
              </div>
              <p className="annot mt-4">Built in-house. Not a commissioned client project.</p>
            </div>

            <div>
              <p className="text-paper-dim">
                A WhatsApp-first booking flow for a two-chair clinic. Real availability
                only, and reschedules happen in the same thread.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Reads real calendar availability, not a static form",
                  "Holds the slot for ten minutes, then releases it",
                  "Reminder the night before, reschedule in one reply",
                  "Front desk sees only the exceptions",
                ].map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-paper">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-jade" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Said plainly, because it matters more than anything else on this page. */}
      <Reveal kind="rise" className="mt-16 md:mt-20">
        <div className="panel p-7 md:p-10">
          <p className="annot">a note on proof</p>
          <p className="mt-3 max-w-3xl text-paper">
            No paying clients yet, so no logos, no case study numbers and no
            testimonials anywhere on this site. When real client work exists it will
            appear here with their name on it.
          </p>
        </div>
      </Reveal>

      {/*
        Testimonials are deliberately absent. When real ones exist, they go here.
      */}
    </div>
  );
}
