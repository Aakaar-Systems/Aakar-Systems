"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { whatsappHref } from "@/lib/site";
import { WhatsAppMark } from "./ui";

/**
 * "What is it actually costing you."
 *
 * Every comparable studio site leans on a worked example with numbers. We
 * have no client results to quote and will not invent any — so the numbers
 * here are the VISITOR'S OWN, and the arithmetic is shown in full so they
 * can check it. Every assumption is a control they can move, and the one
 * industry figure used (after-hours share) is labelled where it comes from.
 *
 * This is a model, not a promise, and the component says so on screen.
 */

const RECOVERY = 0.6; // share of after-hours enquiries an always-on reply keeps warm

type Field = {
  id: "enquiries" | "value" | "closeRate";
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
};

const FIELDS: Field[] = [
  {
    id: "enquiries",
    label: "Enquiries a week",
    hint: "Across WhatsApp, calls, forms and DMs.",
    min: 5,
    max: 200,
    step: 5,
  },
  {
    id: "value",
    label: "What one customer is worth",
    hint: "Roughly, on an average job.",
    min: 1000,
    max: 200000,
    step: 1000,
    prefix: "₹",
  },
  {
    id: "closeRate",
    label: "Of the ones you reach, how many buy",
    hint: "Your rough close rate.",
    min: 5,
    max: 80,
    step: 5,
    suffix: "%",
  },
];

const inr = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};

export function LeakCalculator() {
  const reduced = useReducedMotion();
  const uid = useId();
  const [v, setV] = useState({ enquiries: 40, value: 25000, closeRate: 25 });
  const [afterHours, setAfterHours] = useState(40);

  const missed = (v.enquiries * afterHours) / 100;
  const recovered = missed * RECOVERY;
  const wonPerWeek = (recovered * v.closeRate) / 100;
  const perYear = wonPerWeek * v.value * 52;

  return (
    <div className="panel overflow-hidden">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        {/* ---- the controls ---- */}
        <div className="border-b border-line p-7 md:p-9 lg:border-b-0 lg:border-r">
          <p className="annot">your numbers, not ours</p>
          <h3 className="font-display mt-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-tight text-paper">
            What is the gap costing you?
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-paper-dim">
            Move these to match your business. Nothing is sent anywhere, and every
            step of the arithmetic is shown so you can argue with it.
          </p>

          <div className="mt-8 space-y-7">
            {FIELDS.map((f) => (
              <div key={f.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor={`${uid}-${f.id}`} className="text-sm text-paper">
                    {f.label}
                  </label>
                  <span className="tnum font-display text-xl leading-none text-blue">
                    {f.prefix === "₹"
                      ? inr(v[f.id])
                      : `${v[f.id]}${f.suffix ?? ""}`}
                  </span>
                </div>
                <input
                  id={`${uid}-${f.id}`}
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={v[f.id]}
                  onChange={(e) =>
                    setV((s) => ({ ...s, [f.id]: Number(e.target.value) }))
                  }
                  className="mt-3 w-full accent-[var(--c-blue)]"
                />
                <p className="annot mt-1.5">{f.hint}</p>
              </div>
            ))}

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`${uid}-ah`} className="text-sm text-paper">
                  Share arriving outside working hours
                </label>
                <span className="tnum font-display text-xl leading-none text-ochre">
                  {afterHours}%
                </span>
              </div>
              <input
                id={`${uid}-ah`}
                type="range"
                min={10}
                max={80}
                step={5}
                value={afterHours}
                onChange={(e) => setAfterHours(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--c-ochre)]"
              />
              <p className="annot mt-1.5">
                Nights, lunch hours, Sundays. Most Indian SMBs we talk to guess 30–50%.
              </p>
            </div>
          </div>
        </div>

        {/* ---- the arithmetic, shown in full ---- */}
        <div className="bg-ink/40 p-7 md:p-9">
          <p className="annot">the working</p>

          <ol className="mt-5 space-y-4">
            {[
              {
                label: "Enquiries arriving after hours",
                calc: `${v.enquiries} × ${afterHours}%`,
                out: `${missed.toFixed(0)} a week`,
              },
              {
                label: "Kept warm by an instant reply",
                calc: `${missed.toFixed(0)} × ${RECOVERY * 100}%`,
                out: `${recovered.toFixed(0)} a week`,
                note: "The rest would have reached you anyway, or were never going to buy.",
              },
              {
                label: "Of those, the ones who buy",
                calc: `${recovered.toFixed(0)} × ${v.closeRate}%`,
                out: `${wonPerWeek.toFixed(1)} a week`,
              },
            ].map((row, i) => (
              <li key={row.label} className="border-b border-line-soft pb-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-paper">
                    <span className="annot tnum mr-2 text-paper-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {row.label}
                  </span>
                  <span className="tnum shrink-0 text-sm text-paper">{row.out}</span>
                </div>
                <p className="annot mt-1.5 pl-7">{row.calc}</p>
                {row.note && <p className="annot mt-1 pl-7 leading-relaxed">{row.note}</p>}
              </li>
            ))}
          </ol>

          <div className="mt-7">
            <p className="annot">recovered over a year</p>
            <motion.p
              key={reduced ? undefined : Math.round(perYear)}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display tnum mt-2 text-[clamp(2.5rem,1.8rem+3vw,4rem)] leading-none text-jade"
            >
              {inr(perYear)}
            </motion.p>
            <p className="mt-3 text-sm leading-relaxed text-paper-dim">
              {wonPerWeek.toFixed(1)} extra customers a week at {inr(v.value)} each.
              That is the number a lead system has to beat to be worth building.
            </p>
          </div>

          <div className="mt-7 border-t border-line pt-6">
            <p className="annot leading-relaxed">
              This is a model, not a promise. It uses your estimates and one
              assumption of ours — that an instant reply keeps about {RECOVERY * 100}% of
              after-hours enquiries warm. We have no client results to quote yet, so
              we are not going to show you any.
            </p>
            <a
              href={whatsappHref(
                "Hi Aakaar Systems — I ran the numbers on your site and I'd like to talk about a lead system.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2.5 text-jade transition-colors duration-300 hover:text-paper"
            >
              <WhatsAppMark />
              <span className="border-b border-jade/40 pb-0.5">
                Tell us if that number looks wrong
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
