import type { Metadata } from "next";
import { ContactConnect } from "@/components/contact/ContactConnect";
import { ContactHelp } from "@/components/contact/ContactHelp";
import { ContactHero } from "@/components/contact/ContactHero";
import { PlanVisit } from "@/components/contact/PlanVisit";
import { VisitJourney } from "@/components/contact/VisitJourney";
import { siteUrl } from "@/lib/clinic";
import { contactPageJsonLd } from "@/lib/schema";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact & Directions · Roots & Pulp Dental Clinic, Aliganj",
  description: "ED-362, Sector-Q, Aliganj, Lucknow. Clinic timings, phone, WhatsApp and directions. Open 7 days.",
  alternates: siteUrl ? { canonical: "/contact/" } : undefined,
};

export default function ContactPage() {
  const schema = contactPageJsonLd();

  return (
    <main id="content" className="contact-page motion-page">
      <ContactHero />
      <ContactConnect />
      <PlanVisit />
      <VisitJourney />
      <ContactHelp />
      {schema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ) : null}
    </main>
  );
}
