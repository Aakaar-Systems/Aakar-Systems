"use client";

import { useState, type FormEvent } from "react";
import { site, whatsappHref } from "@/lib/site";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "not_configured"; message: string }
  | { kind: "error"; message: string };

const FIELD =
  "w-full rounded-sm border border-line bg-ink px-3.5 py-3 text-[0.9375rem] text-paper placeholder:text-paper-faint transition-colors focus:border-blue focus:outline-none focus-visible:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending" });
    setErrors({});

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.ok) {
        form.reset();
        setStatus({ kind: "sent" });
        return;
      }

      if (json.fieldErrors) setErrors(json.fieldErrors);

      setStatus(
        json.code === "not_configured"
          ? { kind: "not_configured", message: json.message }
          : {
              kind: "error",
              message: json.message ?? "That did not go through. Please try WhatsApp.",
            },
      );
    } catch {
      setStatus({
        kind: "error",
        message:
          "We could not reach the server, so your message was not sent. Please try WhatsApp.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="rounded-sm border border-jade/50 bg-jade/[0.06] p-6">
        <p className="font-display text-2xl text-paper">That reached us.</p>
        <p className="mt-3 text-paper-dim">
          We read every one of these ourselves. Expect a reply within the working day,
          usually sooner. If it is urgent, message us on WhatsApp and it will be faster.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-5 rounded-sm border border-line px-4 py-2 text-sm text-paper transition-colors hover:border-blue hover:text-blue"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={FIELD}
            placeholder="Ananya Rao"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>

        <Field id="business" label="Business" error={errors.business}>
          <input
            id="business"
            name="business"
            type="text"
            autoComplete="organization"
            required
            className={FIELD}
            placeholder="Chhaya Interiors, Indore"
            aria-invalid={Boolean(errors.business)}
            aria-describedby={errors.business ? "business-error" : undefined}
          />
        </Field>
      </div>

      <Field
        id="contact"
        label="WhatsApp number or email"
        hint="Whichever you would rather we use."
        error={errors.contact}
      >
        <input
          id="contact"
          name="contact"
          type="text"
          autoComplete="tel"
          required
          className={FIELD}
          placeholder="+91 98765 43210"
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={errors.contact ? "contact-error" : "contact-hint"}
        />
      </Field>

      <Field
        id="problem"
        label="What is slowing you down right now?"
        hint="Plain language is fine. The messier the better, honestly."
        error={errors.problem}
      >
        <textarea
          id="problem"
          name="problem"
          rows={5}
          required
          className={`${FIELD} resize-y`}
          placeholder="We get most enquiries on WhatsApp but only reply the next morning, and I think we are losing half of them."
          aria-invalid={Boolean(errors.problem)}
          aria-describedby={errors.problem ? "problem-error" : "problem-hint"}
        />
      </Field>

      {/* Honeypot. Hidden from people, visible to naive bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center rounded-sm bg-paper px-6 py-3.5 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending" : "Send this over"}
        </button>
        <p className="annot">We reply to every enquiry ourselves.</p>
      </div>

      {(status.kind === "not_configured" || status.kind === "error") && (
        <div
          role="alert"
          className="rounded-sm border border-ochre/50 bg-ochre/[0.07] p-4 text-sm"
        >
          <p className="font-medium text-ochre">Your message was not delivered.</p>
          <p className="mt-1.5 text-paper-dim">{status.message}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-jade underline underline-offset-4"
            >
              Message us on WhatsApp
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-blue underline underline-offset-4"
            >
              {site.email}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-paper">
        {label}
      </label>
      {hint && !error && (
        <p id={`${id}-hint`} className="annot mt-1">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="annot mt-1.5 text-ochre">
          {error}
        </p>
      )}
    </div>
  );
}
