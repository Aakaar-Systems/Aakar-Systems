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
                Aakaar started with a small group of us who could have taken separate
                freelance work and done fine at it. We did not want to build landing pages
                in isolation. We wanted to build the thing underneath — the system a
                business actually runs on.
              </p>
              <p>
                So the studio is set up for that. We take a small number of projects at a
                time, we do the discovery properly, and we stay on after launch because a
                system that nobody tunes stops being useful by about month three.
              </p>
              <p>
                We are early. We are honest about that, which is why there are no client
                logos on this page and no invented testimonials. What we can show you is
                the work itself, the way we think, and systems we have built to prove the
                approach holds up.
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
                It is a fair description of the job. You arrive with a problem that is real
                but shapeless — enquiries going cold somewhere, a team stretched thin, no
                clear picture of what is actually working. We give it a form you can point
                at, operate, and improve.
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
              note: "So the discovery is real and the follow-through is real.",
            },
            {
              title: "Built on what you run",
              note: "Your CRM, your calendar, your WhatsApp number. Not a platform you rent from us.",
            },
            {
              title: "You own the system",
              note: "Accounts, data and access stay in your name from day one.",
            },
            {
              title: "We stay after launch",
              note: "A monthly read of the numbers, then a change to the system.",
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
