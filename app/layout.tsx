import type { Metadata, Viewport } from "next";
import { Instrument_Serif, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Atmosphere } from "@/components/Atmosphere";
import { Footer } from "@/components/Footer";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";

/* Display: high-contrast editorial serif. One weight — it forces discipline. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

/* Workhorse + drafting annotations: one superfamily, two cuts. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — AI business systems studio, India`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "AI business systems",
    "WhatsApp automation India",
    "lead capture automation",
    "AI lead system",
    "business process automation India",
    "AI booking system",
    "SME automation India",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — AI business systems studio, India`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — AI business systems studio, India`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b1113" },
    { media: "(prefers-color-scheme: light)", color: "#f4f2ed" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  areaServed: { "@type": "Country", name: "India" },
  slogan: site.tagline,
  knowsAbout: [
    "WhatsApp Business automation",
    "AI lead qualification",
    "Business process automation",
    "CRM integration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-theme="dark"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          // Static, build-time constant — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-raised focus:px-4 focus:py-2 focus:text-paper focus:ring-1 focus:ring-line"
        >
          Skip to content
        </a>
        <Atmosphere />
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
