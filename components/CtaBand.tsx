"use client";

import Link from "next/link";
import { whatsappHref } from "@/lib/site";
import { MaskLines, Reveal, WhatsAppMark } from "./ui";

/**
 * Closing band on every page except contact. WhatsApp first, because that
 * is genuinely the channel we work on.
 */
export function CtaBand({
  title = "Tell us what is slowing you down.",
  note = "Describe the problem in plain words. We will tell you honestly whether a system is the right answer for it.",
}: {
  title?: string;
  note?: string;
}) {
  return (
    <section className="rule-t">
      <div className="shell py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <h2 className="font-display t-sub text-paper md:text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] md:leading-[1.08]">
              <MaskLines lines={[title]} />
            </h2>
            <Reveal kind="rise" className="mt-5 max-w-lg text-paper-dim">
              <p>{note}</p>
            </Reveal>
          </div>

          <Reveal kind="scale" className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-jade-solid px-6 py-3.5 text-[0.9375rem] font-medium text-jade-on transition-colors duration-200 hover:opacity-90"
            >
              <WhatsAppMark />
              Message us on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-sm border border-line px-6 py-3.5 text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:border-blue hover:text-blue"
            >
              Use the form instead
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
