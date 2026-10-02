import type { Metadata } from "next";
import { ContactConnect } from "@/components/contact/ContactConnect";
import { ContactHelp } from "@/components/contact/ContactHelp";
import { ContactHero } from "@/components/contact/ContactHero";
import { PlanVisit } from "@/components/contact/PlanVisit";
import { VisitJourney } from "@/components/contact/VisitJourney";
import { clinic } from "@/lib/clinic";
import { contactPageJsonLd } from "@/lib/schema";
import { jsonLd, pageMetadata } from "@/lib/seo";
import "./contact.css";

const description = `${clinic.streetAddress}, ${clinic.locality}. Clinic timings, phone, WhatsApp and directions to Roots & Pulp Dental Clinic. Open 7 days.`;

export const metadata: Metadata = pageMetadata({
  title: "Contact & Directions · Roots & Pulp Dental Clinic, Aliganj",
  description,
  path: "/contact/",
});

export default function ContactPage() {
  const schema = contactPageJsonLd(description);

  return (
    <main id="content" className="contact-page motion-page">
      <ContactHero />
      <ContactConnect />
      <PlanVisit />
      <VisitJourney />
      <ContactHelp />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </main>
  );
}
