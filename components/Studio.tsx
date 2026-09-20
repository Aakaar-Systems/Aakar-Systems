"use client";

import { Reveal } from "./ui";

/** Short by design. The work should carry more weight than the biography. */
export function StudioBody() {
  return (
    <div className="shell">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-24">
          <div>
            <Reveal kind="rise" className="max-w-xl space-y-5 text-paper-dim">
              <p className="text-[1.0625rem] leading-relaxed text-paper">
                We could have taken separate freelance work and done fine at it. We wanted
                to build the thing underneath instead — the system a business runs on.
              </p>
              <p>
                So we take few projects at a time, do the discovery properly, and stay on
                after launch.
              </p>
              <p>
                We are early, and honest about it. No client logos here, no invented
                testimonials — only work we built ourselves.
              </p>
            </Reveal>
          </div>

          {/* What the name actually means, set as a drafting note. */}
          <Reveal kind="wipe" className="lg:pt-4">
            <div className="panel p-7 md:p-10">
              <p className="font-display text-5xl leading-none text-paper md:text-6xl">आकार</p>
              <p className="annot mt-4">aa·kaar &nbsp;·&nbsp; noun</p>
              <p className="mt-3 text-paper">
                Form. Shape. The moment something formless is given structure.
              </p>
              <div className="my-6 h-px w-full bg-line" />
              <p className="text-paper-dim">
                A fair description of the job. You arrive with something real but shapeless.
                We give it a form you can point at and operate.
              </p>
              <p className="mt-6 border-l border-ochre pl-4 font-display text-xl leading-snug text-paper">
                We give your business problem a working, intelligent form.
              </p>
            </div>
          </Reveal>
        </div>

        {/* How we prefer to work, stated plainly. */}
        <div className="mt-24 grid gap-x-12 gap-y-12 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Few projects at a time",
              note: "So discovery and follow-through are real.",
            },
            {
              title: "Built on what you run",
              note: "Your CRM, calendar and number. Not a platform you rent.",
            },
            {
              title: "You own the system",
              note: "Accounts and data stay in your name.",
            },
            {
              title: "We stay after launch",
              note: "A monthly read, then a change.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} kind="settle" delay={i * 0.06}>
              <p className="font-display text-xl leading-tight text-paper">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-paper-dim">{item.note}</p>
            </Reveal>
          ))}
      </div>
    </div>
  );
}
