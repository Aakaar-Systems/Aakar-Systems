import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactBody } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Aakaar Systems. Message us on WhatsApp, use the form, or email us — we read and answer every enquiry ourselves.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="start a project"
        lines={["Tell us what", "is leaking."]}
        lede="No pitch deck, no discovery form with fourteen fields. Describe what is slowing your business down in plain words, and we will tell you honestly whether a system is the right answer for it."
      />

      <section className="section-tight">
        <ContactBody />
      </section>
    </>
  );
}
