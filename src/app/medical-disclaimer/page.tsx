import type { Metadata } from "next";
import Link from "next/link";
import { ClinicContact } from "@/components/legal/ClinicContact";
import { LegalPageLayout, type LegalSection } from "@/components/legal/LegalPageLayout";
import { pageMetadata } from "@/lib/seo";

const seo = {
  title: "Medical Disclaimer · Roots & Pulp Dental Clinic, Aliganj",
  description:
    "The dental information on the Roots & Pulp Dental Clinic website is general education and does not replace an examination by a qualified dentist.",
  path: "/medical-disclaimer/",
};

export const metadata: Metadata = pageMetadata(seo);

const sections: LegalSection[] = [
  {
    id: "education",
    heading: "General dental information",
    body: (
      <p>
        The information on this website, including treatment pages, FAQs, illustrations and patient cases, is written to
        help you understand dental care in general. It is a starting point for questions, not advice about your own
        teeth.
      </p>
    ),
  },
  {
    id: "examination",
    heading: "It does not replace an examination",
    body: (
      <>
        <p>
          A dental problem can only be properly understood when a dentist examines you, and sometimes takes an X-ray.
          Two people with the same symptom may need very different care.
        </p>
        <p>
          Whether a treatment suits you depends on your examination, your medical history, your medicines and what
          matters to you. Your treatment plan is decided with you, at the clinic.
        </p>
      </>
    ),
  },
  {
    id: "results",
    heading: "Before and after photographs",
    body: (
      <p>
        The patient cases on this website are real and shared with permission. They show what was possible for that
        person. Your own result may differ, and your dentist will talk you through what to expect.
      </p>
    ),
  },
  {
    id: "enquiries",
    heading: "Online messages and enquiries",
    body: (
      <p>
        Messages sent through this website, WhatsApp or phone help us arrange your visit. Replying to an enquiry is not
        a diagnosis, and a dentist and patient relationship begins when you are seen and assessed at the clinic.
      </p>
    ),
  },
  {
    id: "urgent",
    heading: "If you have an urgent problem",
    body: (
      <>
        <p>
          If you have dental pain, a broken tooth or swelling, please do not wait or rely on information online. Call or
          WhatsApp the clinic so that you can be seen as soon as possible.
        </p>
      </>
    ),
  },
  {
    id: "advice",
    heading: "Getting personal advice",
    body: (
      <>
        <p>
          For guidance about your own teeth and gums, please see a qualified dentist. You can{" "}
          <Link href="/contact/">contact Roots &amp; Pulp</Link> to arrange an examination, or speak to your own dentist.
        </p>
        <p>
          See also our <Link href="/terms/">Terms &amp; Conditions</Link> and{" "}
          <Link href="/privacy-policy/">Privacy Policy</Link>.
        </p>
        <ClinicContact />
      </>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      crumb="Medical Disclaimer"
      title="Medical Disclaimer"
      sections={sections}
    />
  );
}
