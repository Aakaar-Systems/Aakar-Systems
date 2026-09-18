"use client";

import type { ReactNode } from "react";
import { MaskLines, Reveal } from "./ui";

/**
 * The top of every interior page. Same drafting annotation, same serif
 * headline, same hairline — so moving between pages feels like turning
 * a sheet rather than landing somewhere else.
 */
export function PageHeader({
  eyebrow,
  lines,
  lede,
  aside,
}: {
  eyebrow: string;
  lines: ReactNode[];
  lede: string;
  aside?: ReactNode;
}) {
  return (
    <header className="relative pt-32 md:pt-44">
      <div className="shell">
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-px w-6 bg-ochre" />
          <span className="annot">{eyebrow}</span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
          <h1 className="font-display t-hero text-paper">
            <MaskLines lines={lines} />
          </h1>
          <Reveal kind="rise" delay={0.15} className="lede max-w-xl lg:pb-2">
            <p>{lede}</p>
          </Reveal>
        </div>

        {aside && <div className="mt-10">{aside}</div>}

        <div className="mt-16 h-px w-full bg-line md:mt-24" />
      </div>
    </header>
  );
}
