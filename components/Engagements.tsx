"use client";

import { engagements, sectors } from "@/lib/content";
import { Reveal, SectionMark } from "./ui";

/**
 * How an engagement is shaped. No prices here on purpose — we quote after
 * the mapping step, and saying that plainly beats publishing a number we
 * would have to walk back.
 */
export function Engagements() {
  return (
    <div className="shell">
      <SectionMark label="how an engagement is shaped" />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-24">
        <h2 className="font-display t-section text-paper">Three stages, in order.</h2>
        <Reveal kind="rise" className="lede max-w-lg">
          <p>
            You are never committing to the whole thing up front. Mapping stands on its
            own, and you get the map either way.
          </p>
        </Reveal>
      </div>

      <ol className="mt-16 grid gap-px overflow-hidden rounded-[4px] border border-line bg-line md:grid-cols-3">
        {engagements.map((e, i) => (
          <Reveal key={e.name} kind="settle" delay={i * 0.07} as="li">
            <div className="flex h-full flex-col bg-ink/80 p-7 backdrop-blur-sm md:p-8">
              <div className="flex items-baseline gap-3">
                <span className="annot tnum text-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl leading-tight text-paper">{e.name}</h3>
              </div>
              <p className="annot mt-2 text-ochre">{e.shape}</p>
              <p className="mt-5 text-sm leading-relaxed text-paper-dim">{e.body}</p>

              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {e.gives.map((g) => (
                  <li key={g} className="flex gap-3 text-sm text-paper">
                    <span aria-hidden className="mt-2.5 h-px w-3.5 shrink-0 bg-jade" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal kind="rise" className="mt-10">
        <p className="annot max-w-2xl leading-relaxed">
          We quote a fixed price for the build after mapping, so you are never agreeing
          to an open-ended number. If we do not think a system is worth building for
          you, we say so at mapping rather than three weeks in.
        </p>
      </Reveal>
    </div>
  );
}

/** Who we build for. Positioning, not a claim about work already done. */
export function Sectors() {
  return (
    <div className="shell">
      <SectionMark label="who we build for" />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-24">
        <h2 className="font-display t-section text-paper">
          Businesses where a missed message is a lost job.
        </h2>
        <Reveal kind="rise" className="lede max-w-lg">
          <p>
            The pattern is the same everywhere: enquiries arrive at hours nobody is
            working, and the person who replies first gets the job. These are the places
            it bites hardest.
          </p>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((s, i) => (
          <Reveal key={s.name} kind="rise" delay={i * 0.05} as="li">
            <div className="border-t border-line pt-5">
              <p className="font-display text-xl leading-tight text-paper">{s.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-paper-dim">{s.line}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal kind="rise" className="mt-12">
        <p className="annot max-w-2xl leading-relaxed">
          Not on this list? The systems are not industry-specific — if enquiries reach
          you and something has to happen next, it is the same problem.
        </p>
      </Reveal>
    </div>
  );
}
