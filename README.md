# Aakaar Systems — marketing site

Marketing website for Aakaar Systems, an AI business systems studio in India.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion and Lenis.

---

## Running it

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

## Environment variables

Everything has a working fallback, so the site runs with no `.env.local` at all.
Set these before going live.

| Variable | Needed for | If unset |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Every WhatsApp link on the site.** Digits only, with country code, no `+` or spaces — e.g. `919876543210` | Falls back to a placeholder number that goes nowhere |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email links | `hello@aakaarsystems.com` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG tags | `https://aakaarsystems.com` |
| `RESEND_API_KEY` | Contact form delivery | Form returns an honest failure (see below) |
| `CONTACT_TO_EMAIL` | Where enquiries are sent | Same as above |
| `CONTACT_FROM_EMAIL` | Verified sender, e.g. `Aakaar Systems <hello@yourdomain.com>` | Same as above |

### The contact form does not fake success

If `RESEND_API_KEY`, `CONTACT_TO_EMAIL` or `CONTACT_FROM_EMAIL` is missing,
`POST /api/contact` returns **503 `not_configured`** and the form tells the
visitor plainly that their message was **not** delivered, pointing them at
WhatsApp and email instead. It never shows a success state for a message that
did not send.

To turn delivery on: create a [Resend](https://resend.com) account, verify a
sending domain, and set the three variables above.

The route also has a honeypot field and a best-effort in-memory rate limit
(4 requests/minute/IP). Serverless instances are not shared, so put a real
limiter in front of it (Vercel WAF, Upstash) before launch.

## Deploying to Vercel

Import the repo, add the environment variables above, deploy. No other config
needed — every page except `/api/contact` is statically prerendered.

---

## Design system

Defined once in [`app/globals.css`](app/globals.css) as CSS custom properties,
mapped into Tailwind with `@theme inline`. Dark is the default; light is a full
token set, not an afterthought. The theme is applied before first paint by
[`components/ThemeScript.tsx`](components/ThemeScript.tsx) so there is no flash.

**Concept: technical drafting.** *Aakaar* (आकार) means form or shape, so the
visual language is blueprint — hairlines, a measured grid, node-and-wire
diagrams. Line work is structural, never decorative.

| Token | Dark | Light | Role |
| --- | --- | --- | --- |
| `ink` | `#0b1113` | `#f4f2ed` | page |
| `raised` | `#121a1d` | `#fbfaf7` | elevated surface |
| `line` | `#24343a` | `#d5d2c9` | hairlines, inactive wires |
| `paper` / `paper-dim` / `paper-faint` | `#e6edef` / `#93a5ab` / `#82979e` | `#131b1e` / `#5c6b70` / `#606a6e` | text |
| `blue` | `#4c9be8` | `#1e5fa8` | cyanotype — primary accent, live wires |
| `ochre` | `#d9a441` | `#8a5e12` | sparing warmth, emphasis |
| `jade` | `#3fa98a` | `#25664f` | **state only** — automated / resolved |
| `jade-solid` / `jade-on` | `#3fa98a` / `#06201a` | `#25664f` / `#ffffff` | WhatsApp call-to-action fill and its text |

Every pairing clears WCAG AA (4.5:1) for small text in both themes. `jade` is
restricted to meaning "the system handled this" — it is never used as
decoration.

**Type:** Instrument Serif for display (one weight, on purpose) and IBM Plex
Sans / Mono for body and drafting annotations.

## Structure

```
app/
  page.tsx              home — hero, problem, the signature sequence, teasers
  what-we-build/        the five productized systems
  how-we-work/          eight-step process + FAQ
  our-work/             concept projects, incl. the live lead-qualification demo
  studio/               who we are + why India specifically
  contact/              WhatsApp, form, email
  api/contact/route.ts  form handler (zod validation, honeypot, rate limit)
  icon.tsx, opengraph-image.tsx, robots.ts, sitemap.ts
components/
  SystemScroll.tsx      the signature scroll-linked system diagram
  HeroFlow.tsx          the hero's live demonstration
  LeadDemo.tsx          interactive concept demo
  ui.tsx                Reveal / MaskLines / buttons
lib/
  content.ts            all site copy, as data
  site.ts               nav, routes, WhatsApp and contact config
```

## Motion

Scroll choreography uses Motion values rather than React state, so scrolling
causes no re-renders. Lenis smooth scroll is lazy-loaded after mount and skipped
entirely for reduced-motion users and coarse pointers.

`prefers-reduced-motion` is honoured throughout, and not by simply disabling
things: the pinned sequence collapses to a fully drawn static diagram with all
three stages of copy, and the hero renders a separate static "enquiries in →
outcomes out" panel. Both communicate the same thing without a frame of motion.

Two reveal mechanics are worth knowing about before editing
[`components/ui.tsx`](components/ui.tsx): an element that hides itself by
clipping (`MaskLines`, `Reveal kind="wipe"`) **cannot** carry its own
`whileInView` trigger, because IntersectionObserver measures the clipped area
and the threshold never fires. In both cases the trigger sits on an unclipped
wrapper that drives the clipped child through variant propagation. `Reveal`
also defaults to `amount: "some"` — a numeric threshold can never be met by an
element taller than the viewport, which silently leaves long sections hidden.

## What is deliberately not here

- **No testimonials, client logos or case study numbers.** The studio has no
  paying clients yet and we are not inventing any. The two projects on
  `/our-work` are labelled "Concept project" in the UI, and the interiors
  business in the demo is explicitly described as fictional.
- **No claim that the lead demo is a live model.** It is a scripted flow, and
  the page says so.

Social links in the footer render as "soon" placeholders until real profiles
exist — set `pending: false` and a real `href` in
[`lib/site.ts`](lib/site.ts) when they do.

## Checks

Lighthouse (mobile, production build): **Accessibility 100, Best Practices 100,
SEO 100**. LCP 2.26s and CLS 0.00 under 4× CPU throttling on Fast 4G.

```bash
npx tsc --noEmit    # typecheck
npm run build       # all six pages prerender static
```
