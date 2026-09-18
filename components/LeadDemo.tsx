"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { WhatsAppMark } from "./ui";

/**
 * Concept demo: an AI Lead System qualifying an enquiry.
 *
 * This is a scripted simulation, not a live model — it is labelled as such
 * in the UI. It exists to show the shape of the thing: an enquiry arrives,
 * gets qualified in a few turns, and leaves behind a structured record that
 * a human can act on.
 */

type Field = "intent" | "budget" | "timeline";

type Step = {
  field: Field;
  ask: string;
  options: { label: string; value: string; weight: number }[];
};

const SCRIPT: Step[] = [
  {
    field: "intent",
    ask: "Hi, thanks for messaging Chhaya Interiors. What are you looking to get done?",
    options: [
      { label: "Full 2BHK interiors", value: "Full 2BHK interiors", weight: 3 },
      { label: "Just a modular kitchen", value: "Modular kitchen", weight: 2 },
      { label: "Office renovation", value: "Office renovation", weight: 3 },
    ],
  },
  {
    field: "budget",
    ask: "Got it. Roughly what budget range are you working with?",
    options: [
      { label: "Under 5 lakh", value: "Under ₹5L", weight: 1 },
      { label: "5 to 12 lakh", value: "₹5L – ₹12L", weight: 2 },
      { label: "Above 12 lakh", value: "Above ₹12L", weight: 3 },
    ],
  },
  {
    field: "timeline",
    ask: "And when would you want work to start?",
    options: [
      { label: "This month", value: "This month", weight: 3 },
      { label: "In 2 to 3 months", value: "2 – 3 months", weight: 2 },
      { label: "Still exploring", value: "Exploring", weight: 1 },
    ],
  },
];

type Msg = { from: "bot" | "user"; text: string };

const LABELS: Record<Field, string> = {
  intent: "Intent",
  budget: "Budget",
  timeline: "Timeline",
};

export function LeadDemo() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: SCRIPT[0].ask }]);
  const [record, setRecord] = useState<Partial<Record<Field, string>>>({});
  const [score, setScore] = useState(0);
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Keep the latest message in view without yanking the whole page.
  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [msgs, typing, reduced]);

  const done = step >= SCRIPT.length;

  const choose = (opt: Step["options"][number]) => {
    const field = SCRIPT[step].field;
    setMsgs((m) => [...m, { from: "user", text: opt.label }]);
    setRecord((r) => ({ ...r, [field]: opt.value }));
    setScore((s) => s + opt.weight);

    const next = step + 1;
    setTyping(true);

    const delay = reduced ? 0 : 750;
    timers.current.push(
      window.setTimeout(() => {
        setTyping(false);
        setMsgs((m) => [
          ...m,
          {
            from: "bot",
            text:
              next < SCRIPT.length
                ? SCRIPT[next].ask
                : "Noted, all of it. Rohan will message you here within the hour with a ballpark figure and two reference layouts.",
          },
        ]);
        setStep(next);
      }, delay),
    );
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTyping(false);
    setStep(0);
    setRecord({});
    setScore(0);
    setMsgs([{ from: "bot", text: SCRIPT[0].ask }]);
  };

  const temperature = score >= 8 ? "Hot" : score >= 6 ? "Warm" : "Nurture";
  const tempColor =
    temperature === "Hot" ? "text-jade" : temperature === "Warm" ? "text-ochre" : "text-paper-dim";
  const route =
    temperature === "Hot"
      ? "Rohan, now"
      : temperature === "Warm"
        ? "Sales queue, today"
        : "Drip sequence";

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-5">
      {/* --- the conversation --- */}
      <div className="flex flex-col overflow-hidden rounded-sm border border-line bg-raised">
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
          <span className="text-jade">
            <WhatsAppMark />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-paper">Chhaya Interiors</p>
            <p className="annot text-[0.625rem] leading-tight">
              answering automatically, 11:47 pm
            </p>
          </div>
          <span className="annot flex items-center gap-1.5 text-[0.625rem] text-jade">
            <span className="h-1.5 w-1.5 rounded-full bg-jade" aria-hidden />
            online
          </span>
        </div>

        <div
          ref={logRef}
          className="h-[19rem] space-y-2.5 overflow-y-auto px-4 py-4"
          role="log"
          aria-live="polite"
          aria-label="Simulated enquiry conversation"
        >
          {msgs.map((m, i) => (
            <motion.div
              key={`${i}-${m.text}`}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <p
                className={`max-w-[85%] rounded-sm px-3 py-2 text-[0.8125rem] leading-relaxed ${
                  m.from === "user"
                    ? "bg-jade/15 text-paper"
                    : "border border-line bg-ink text-paper"
                }`}
              >
                {m.text}
              </p>
            </motion.div>
          ))}

          {typing && (
            <div className="flex justify-start" aria-hidden>
              <span className="flex gap-1 rounded-sm border border-line bg-ink px-3 py-2.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1 w-1 rounded-full bg-paper-faint"
                    style={{ animation: `pulse-node 1.1s ease-in-out ${i * 0.15}s infinite` }}
                  />
                ))}
              </span>
            </div>
          )}
        </div>

        <div className="border-t border-line p-3">
          {done ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="annot text-jade">Qualified in 3 turns, no human involved.</p>
              <button
                type="button"
                onClick={reset}
                className="rounded-sm border border-line px-3 py-1.5 text-[0.8125rem] text-paper transition-colors hover:border-blue hover:text-blue"
              >
                Run it again
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {SCRIPT[step].options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => choose(opt)}
                  disabled={typing}
                  className="rounded-sm border border-line px-3 py-1.5 text-[0.8125rem] text-paper transition-colors hover:border-jade hover:text-jade disabled:opacity-40"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- what the system wrote down --- */}
      <div className="rounded-sm border border-line bg-raised/50 p-4">
        <p className="annot">lead record, written as you answer</p>

        <dl className="mt-4 space-y-3">
          {(Object.keys(LABELS) as Field[]).map((f) => (
            <div key={f} className="border-b border-line-soft pb-3">
              <dt className="annot text-[0.6875rem]">{LABELS[f]}</dt>
              <dd className="mt-1 text-sm text-paper">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={record[f] ?? "empty"}
                    initial={reduced ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className={record[f] ? "text-paper" : "text-paper-faint"}
                  >
                    {record[f] ?? "waiting"}
                  </motion.span>
                </AnimatePresence>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="annot text-[0.6875rem]">Score</p>
            <p className={`mt-1 font-display text-2xl leading-none ${tempColor}`}>
              {score > 0 ? temperature : "—"}
            </p>
            <div className="mt-2 h-px w-full bg-line">
              <motion.div
                className={`h-px ${score >= 8 ? "bg-jade" : score >= 6 ? "bg-ochre" : "bg-blue"}`}
                initial={false}
                animate={{ width: `${Math.round((score / 9) * 100)}%` }}
                transition={{ duration: reduced ? 0 : 0.4 }}
              />
            </div>
          </div>
          <div>
            <p className="annot text-[0.6875rem]">Routed to</p>
            <p className="mt-1 text-sm text-paper">{done ? route : "—"}</p>
          </div>
        </div>

        <AnimatePresence>
          {done && (
            <motion.p
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="annot mt-4 overflow-hidden border-l border-jade pl-3 text-jade"
            >
              In a live build this record lands in your CRM, and Rohan gets a WhatsApp
              notification with the full transcript attached.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
