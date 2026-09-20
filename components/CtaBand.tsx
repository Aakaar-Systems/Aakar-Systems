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
  note = "Describe it in plain words. We will say honestly whether a system is the answer.",
}: {
  title?: string;
  note?: string;
}) {
  return (
    <section className="rule-t">
      <div className="shell section-tight">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
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
              className="inline-flex items-center justify-center gap-2.5 rounded-[3px] bg-jade-solid px-7 py-4 text-[0.9375rem] font-medium text-jade-on shadow-[0_8px_24px_-12px_var(--c-jade)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-12px_var(--c-jade)] hover:brightness-110"
            >
              <WhatsAppMark />
              Message us on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[3px] border border-line bg-raised/40 px-7 py-4 text-[0.9375rem] font-medium text-paper transition-[border-color,color,background-color,box-shadow] duration-300 hover:border-blue/70 hover:bg-raised hover:text-blue hover:shadow-[0_0_0_1px_var(--c-blue-deep)]"
            >
              Use the form instead
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
