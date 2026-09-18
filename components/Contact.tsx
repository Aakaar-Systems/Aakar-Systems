"use client";

import { ContactForm } from "./ContactForm";
import { Reveal, WhatsAppMark } from "./ui";
import { site, whatsappHref } from "@/lib/site";

/**
 * WhatsApp is our actual primary channel, so it gets the primary position
 * and the larger target. The form is the considered alternative, and email
 * sits behind both.
 */
export function ContactBody() {
  return (
    <div className="shell">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-24">
        <div>
          {/* Primary channel. */}
          <Reveal kind="scale">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-[4px] border border-jade/45 bg-jade/[0.07] p-7 transition-[border-color,background-color,transform] duration-300 hover:border-jade hover:bg-jade/[0.11] md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="mt-0.5 text-2xl text-jade">
                  <WhatsAppMark />
                </span>
                <div>
                  <p className="font-display text-2xl leading-tight text-paper">
                    Message us on WhatsApp
                  </p>
                  <p className="mt-2 text-paper-dim">
                    The fastest way to reach us, and the channel most of our work runs on
                    anyway. Usually answered within the hour, IST.
                  </p>
                  <p className="annot mt-3 text-jade">opens a chat, nothing to fill in</p>
                </div>
              </div>
            </a>
          </Reveal>

          <Reveal kind="rise" delay={0.1} className="mt-8">
            <div className="rule-t pt-6">
              <p className="annot">or email, if you prefer</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block text-lg text-paper underline decoration-line underline-offset-[6px] transition-colors hover:text-blue hover:decoration-blue"
              >
                {site.email}
              </a>
            </div>
          </Reveal>

          <Reveal kind="rise" delay={0.16} className="mt-10">
            <div className="rule-t pt-6">
              <p className="annot">what happens next</p>
              <ol className="mt-4 space-y-3">
                {[
                  "We read it ourselves, usually the same day.",
                  "A short call or chat, to understand where the time and enquiries are going.",
                  "A plain-language note back: what we would build, roughly what it costs, and whether it is worth doing at all.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-paper-dim">
                    <span className="annot tnum shrink-0 text-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <Reveal kind="wipe" amount={0.1}>
          <div className="panel p-7 md:p-10">
            <p className="annot">the form, if that is easier</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
