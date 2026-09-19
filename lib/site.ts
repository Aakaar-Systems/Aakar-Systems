export const site = {
  name: "Aakaar Systems",
  wordmark: "Aakaar",
  tagline: "We give your business problem a working, intelligent form.",
  description:
    "Aakaar Systems is an AI business systems studio in India. We build systems that capture every enquiry, automate repetitive work, and keep your business responding around the clock — WhatsApp-first, built for Indian businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aakaarsystems.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@aakaarsystems.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919000000000",
  locale: "en_IN",
} as const;

export const whatsappHref = (message?: string) => {
  const text = encodeURIComponent(
    message ?? "Hi Aakaar Systems — I'd like to talk about a system for my business.",
  );
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
};

/** Placeholder social handles. Swapped for live profiles before launch. */
export const socials = [
  { label: "LinkedIn", href: "#", pending: true },
  { label: "Instagram", href: "#", pending: true },
  { label: "GitHub", href: "#", pending: true },
] as const;

export const nav = [
  { label: "What we build", href: "/what-we-build" },
  { label: "How we work", href: "/how-we-work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Our work", href: "/our-work" },
  { label: "Studio", href: "/studio" },
  { label: "Contact", href: "/contact" },
] as const;

/** Every page, for the sitemap. */
export const routes = [
  "/",
  "/what-we-build",
  "/how-we-work",
  "/pricing",
  "/our-work",
  "/studio",
  "/contact",
] as const;
