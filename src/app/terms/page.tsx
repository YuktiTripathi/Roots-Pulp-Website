import type { Metadata } from "next";
import Link from "next/link";
import { ClinicContact } from "@/components/legal/ClinicContact";
import { LegalPageLayout, type LegalSection } from "@/components/legal/LegalPageLayout";
import { pageMetadata } from "@/lib/seo";

const seo = {
  title: "Terms & Conditions · Roots & Pulp Dental Clinic, Aliganj",
  description:
    "Terms for using the Roots & Pulp Dental Clinic website, requesting appointments and understanding treatment information, charges and results.",
  path: "/terms/",
};

export const metadata: Metadata = pageMetadata(seo);

/*
 * TODO [CLINIC TO CONFIRM BEFORE PUBLICATION]:
 * - Cancellation and rescheduling rules, and whether any deposit, advance payment or refund applies.
 *   No payment or deposit is taken through this website today, so none is described below.
 * - Accepted payment methods and whether instalments are offered.
 * - Review by a qualified lawyer.
 */

const sections: LegalSection[] = [
  {
    id: "using",
    heading: "Using this website",
    body: (
      <p>
        This website is run by Roots &amp; Pulp Dental Clinic, Aliganj, Lucknow. By using it, you agree to these terms.
        Please use the website for lawful, personal purposes, and do not try to disrupt it or copy it in bulk.
      </p>
    ),
  },
  {
    id: "information",
    heading: "General information, not personal advice",
    body: (
      <>
        <p>
          The treatment pages, FAQs and articles on this website explain dental care in general terms. They are meant
          to help you understand your options and prepare questions, not to diagnose a problem or recommend treatment
          for you. Please read our <Link href="/medical-disclaimer/">Medical Disclaimer</Link>.
        </p>
        <p>
          We work to keep the information accurate and up to date, but dentistry, services and opening hours can
          change. If something matters to your decision, please check it with the clinic.
        </p>
      </>
    ),
  },
  {
    id: "appointments",
    heading: "Appointment requests and confirmation",
    body: (
      <>
        <p>
          You can request an appointment through our online booking page (provided by Kivi Health), by WhatsApp, by
          phone, or by visiting the clinic. A request made through this website or by message is not a confirmed
          appointment until the clinic confirms it with you.
        </p>
        <p>
          If you need to change or cancel an appointment, please let us know as early as you can by phone or WhatsApp,
          so that the time can be offered to another patient.
        </p>
      </>
    ),
  },
  {
    id: "treatment",
    heading: "Consultations and treatment decisions",
    body: (
      <>
        <p>
          Treatment is recommended only after a dentist has examined you and considered your medical history. Your
          dentist will explain what was found, your options, and what each involves, and treatment goes ahead only with
          your consent.
        </p>
        <p>
          Please tell us about your health, medicines and allergies, and any changes, so that your care can be planned
          safely.
        </p>
      </>
    ),
  },
  {
    id: "charges",
    heading: "Charges and estimates",
    body: (
      <>
        <p>
          The cost of treatment depends on your examination, the treatment chosen, the materials used and the number of
          visits. Any figures on this website are general guidance, not a quotation.
        </p>
        <p>
          You will be given an estimate before treatment starts. If your treatment plan needs to change, for example
          because of something found during treatment, the clinic will explain why and discuss any change in cost with
          you first.
        </p>
      </>
    ),
  },
  {
    id: "results",
    heading: "Treatment results",
    body: (
      <p>
        Everyone&apos;s teeth, gums and healing are different. Results depend on your oral health, the treatment, and
        aftercare such as brushing, follow-up visits and wearing any appliance as advised. Your dentist will explain what
        is realistic for you, but no particular result can be promised.
      </p>
    ),
  },
  {
    id: "photographs",
    heading: "Before and after photographs",
    body: (
      <p>
        Patient photographs and cases on this website are real, and are shown with the patient&apos;s permission. They
        show individual results and are not a promise that your treatment will look the same.
      </p>
    ),
  },
  {
    id: "content",
    heading: "Website content",
    body: (
      <p>
        The text, photographs, illustrations and design of this website belong to Roots &amp; Pulp Dental Clinic or are
        used with permission. You are welcome to share links to our pages. Please do not copy, republish or use the
        content or photographs for other purposes without our written permission.
      </p>
    ),
  },
  {
    id: "links",
    heading: "Links to other websites",
    body: (
      <p>
        This website links to services run by other companies, such as Kivi Health for booking, WhatsApp, Google Maps,
        Google reviews and Instagram. Those services have their own terms and privacy policies, and we are not
        responsible for their content or how they work.
      </p>
    ),
  },
  {
    id: "availability",
    heading: "Website availability",
    body: (
      <p>
        We aim to keep the website available and working, but it may sometimes be unavailable for maintenance or for
        reasons outside our control. If you cannot reach the website or the booking page, please call or WhatsApp the
        clinic.
      </p>
    ),
  },
  {
    id: "law",
    heading: "Law",
    body: (
      <p>
        These terms are governed by the laws of India. Nothing in these terms limits any right you have under Indian
        law, including consumer protection law. If a dispute cannot be resolved by talking to us, the courts in
        Lucknow, Uttar Pradesh will have jurisdiction.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. The date at the top of this page shows when they were last
        updated. How we handle personal information is explained in our <Link href="/privacy-policy/">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact the clinic",
    body: (
      <>
        <p>If you have a question about these terms, please contact:</p>
        <ClinicContact />
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      crumb="Terms & Conditions"
      title="Terms & Conditions"
      intro="These terms explain how this website, appointment requests and treatment information work at Roots & Pulp Dental Clinic. We have kept them short and in plain language."
      updated="10 October 2026"
      sections={sections}
    />
  );
}
