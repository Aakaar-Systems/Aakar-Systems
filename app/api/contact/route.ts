import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Payload = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(120),
  business: z.string().trim().min(2, "Please tell us your business name.").max(160),
  contact: z
    .string()
    .trim()
    .min(6, "We need a WhatsApp number or email to reply on.")
    .max(160),
  problem: z
    .string()
    .trim()
    .min(15, "A sentence or two is enough, but we do need a little detail.")
    .max(2000),
  /**
   * Honeypot — real people leave this empty. Deliberately NOT validated to
   * be empty: a schema error would tell a bot the field matters, and would
   * show a confusing message to anyone whose browser autofilled it. It is
   * accepted here and acted on after parsing.
   */
  website: z.string().max(400).optional(),
});

/**
 * Best-effort rate limit. Serverless instances are not shared, so this
 * stops casual repeat submissions rather than a determined abuser. Put a
 * real limiter in front of this (Vercel WAF, Upstash) before launch.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 4;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, code: "rate_limited", message: "That is a few too many in a row. Give it a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "bad_request", message: "We could not read that submission." },
      { status: 400 },
    );
  }

  const parsed = Payload.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, code: "invalid", message: "Some details need a second look.", fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot filled — accept silently so bots learn nothing, send nothing.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  /**
   * No mail provider configured. We do NOT pretend the message went
   * through — the form says so plainly and points at WhatsApp instead.
   */
  if (!apiKey || !to || !from) {
    console.warn(
      "[contact] Submission received but no mail provider is configured. " +
        "Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.",
    );
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        message:
          "This form is not connected to a mailbox yet, so your message was not delivered. Please message us on WhatsApp or email us directly.",
      },
      { status: 503 },
    );
  }

  const { name, business, contact, problem } = parsed.data;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: contact.includes("@") ? contact : undefined,
      subject: `New enquiry — ${business}`,
      text: [
        `Name: ${name}`,
        `Business: ${business}`,
        `Reply on: ${contact}`,
        "",
        "What is slowing them down:",
        problem,
        "",
        `Received: ${new Date().toISOString()}`,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return NextResponse.json(
        {
          ok: false,
          code: "send_failed",
          message:
            "We could not send that just now, so it did not reach us. Please try WhatsApp instead.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected failure:", err);
    return NextResponse.json(
      {
        ok: false,
        code: "send_failed",
        message:
          "Something went wrong on our side and the message did not reach us. Please try WhatsApp instead.",
      },
      { status: 502 },
    );
  }
}
