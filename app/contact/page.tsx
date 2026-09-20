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
        lede="No pitch deck, no form with fourteen fields. Tell us what is slowing you down, and we will say honestly whether a system is the answer."
      />

      <section className="section-tight">
        <ContactBody />
      </section>
    </>
  );
}
