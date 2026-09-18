"use client";

import { Reveal, SectionMark } from "./ui";
import { indiaStats } from "@/lib/content";

/**
 * Why a studio built here works differently. Framed as a contrast between
 * the imported playbook and what actually happens in an Indian business,
 * so it reads as local knowledge rather than a "we serve India" line.
 */

const CONTRASTS = [
  {
    imported: "Email drip sequence, five touches",
    here: "WhatsApp thread, replies within the hour",
    note: "98% of WhatsApp messages get opened. Email sits near twenty.",
  },
  {
    imported: "Book a demo, we will get back to you",
    here: "Answer the price question immediately, then book",
    note: "Price is the first question here, not the last. Dodging it loses the lead.",
  },
  {
    imported: "Self-serve signup, no human in the loop",
    here: "Automated until it matters, then a named person",
    note: "Trust is built by a person. The system exists to get them to the right ten conversations.",
  },
  {
    imported: "Desktop-first dashboard for the owner",
    here: "The owner runs it from their phone, between other work",
    note: "If it needs a laptop and a login, it will not get used on a Tuesday afternoon.",
  },
];

export function IndiaBody() {
  return (
    <div className="shell">
      {/* Two columns, one hairline between them. Not a card grid. */}
      <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 border-b border-line pb-3 md:grid">
        <p className="annot">the imported playbook</p>
        <p className="annot text-jade">what we build instead</p>
      </div>

      <ul>
        {CONTRASTS.map((row, i) => (
          <Reveal key={row.here} kind="wipe" delay={i * 0.05} as="li" amount={0.5}>
            <div className="grid gap-5 border-b border-line py-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14">
              <div className="flex items-start gap-3">
                <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-line" />
                <p className="text-paper-faint line-through decoration-line decoration-1">
                  {row.imported}
                </p>
              </div>
              <div>
                <div className="flex items-start gap-3">
                  <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-jade" />
                  <p className="text-[1.0625rem] text-paper">{row.here}</p>
                </div>
                <p className="annot mt-2 pl-7 leading-relaxed">{row.note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal kind="rise" className="mt-20">
        <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-14">
          <p className="font-display text-[clamp(2.5rem,1.6rem+4vw,4.5rem)] leading-none tracking-tight text-ochre">
            Tier&nbsp;2
          </p>
          <div className="max-w-2xl">
            <p className="t-sub font-display text-paper">
              The fastest AI adoption in India right now is not in the metros.
            </p>
            <p className="mt-4 text-paper-dim">
              It is in the cities where a business owner is running operations, sales and
              staffing at the same time, and where an hour saved is genuinely an hour back.
              That is who we build for. If you are in Pune or Bengaluru we will gladly work
              with you too, but the studio was not designed around a metro-startup crowd.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-20 grid gap-x-12 gap-y-12 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-4">
        {indiaStats.map((stat, i) => (
          <Reveal key={stat.label} kind="rise" delay={i * 0.06}>
            <p className="font-display text-3xl leading-none text-paper md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-paper">{stat.label}</p>
            <p className="annot mt-2 leading-relaxed">{stat.note}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/** Home page teaser: one line of positioning, then through to the studio page. */
export function IndiaTeaser() {
  return (
    <section className="section">
      <div className="shell">
        <SectionMark index="05" label="built for here" />
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <div>
            <h2 className="font-display t-section text-paper">
              WhatsApp is not a channel here. It is the shop counter.
            </h2>
          </div>
          <div>
            <p className="lede">
              India is the largest WhatsApp market on earth, and 97% of small businesses
              here already run on it. Most automation advice assumes email, a long
              consideration cycle and a buyer at a desk. None of that holds for a clinic in
              Nashik or a studio in Indore, so we do not build as though it does.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[indiaStats[0], indiaStats[2], indiaStats[3]].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl leading-none text-blue">{s.value}</p>
                  <p className="mt-2 text-sm leading-snug text-paper-dim">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
