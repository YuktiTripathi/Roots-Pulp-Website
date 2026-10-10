import type { Metadata } from "next";
import Link from "next/link";
import { ClinicContact } from "@/components/legal/ClinicContact";
import { LegalPageLayout, type LegalSection } from "@/components/legal/LegalPageLayout";
import { pageMetadata } from "@/lib/seo";

const seo = {
  title: "Privacy Policy · Roots & Pulp Dental Clinic, Aliganj",
  description:
    "How Roots & Pulp Dental Clinic in Aliganj, Lucknow handles personal and health information shared through its website, WhatsApp, phone and appointment booking.",
  path: "/privacy-policy/",
};

export const metadata: Metadata = pageMetadata(seo);

/*
 * Written from how the website actually works (checked in this codebase):
 * - The contact and appointment forms do not send or store anything. They build a message in the visitor's
 *   browser and open WhatsApp, where the visitor chooses whether to send it.
 * - Online booking happens on Kivi Health's own page (kivihealth.com), not on this website.
 * - There are no analytics, advertising or tracking scripts, and the site sets no cookies of its own.
 * - Google Maps is embedded (Contact page: loads only after a click; Home page: loads as you scroll to it).
 * - A script font is loaded from fonts.cdnfonts.com. Google review text is fetched by the server, not the visitor.
 *
 * TODO [CLINIC TO CONFIRM BEFORE PUBLICATION]:
 * - A privacy contact email or named person for requests (only phone and WhatsApp are given below).
 * - How long patient records, X-rays and WhatsApp chats are kept, and how paper and digital records are secured.
 * - Whether any other software (practice management, lab, payment) receives patient data.
 * - Review by a qualified lawyer, including the Digital Personal Data Protection Act, 2023 and its Rules as they
 *   come into force.
 */

const sections: LegalSection[] = [
  {
    id: "about",
    heading: "About this policy",
    body: (
      <>
        <p>
          This policy explains what personal information Roots &amp; Pulp Dental Clinic (&ldquo;the clinic&rdquo;,
          &ldquo;we&rdquo;) receives through this website and related channels, why we use it, and the choices you
          have. It covers this website, appointment requests, and messages or calls you make to the clinic.
        </p>
        <p>
          Care you receive inside the clinic, including your dental records, is also handled confidentially, as
          described in the sections on health information below.
        </p>
      </>
    ),
  },
  {
    id: "website",
    heading: "What this website collects",
    body: (
      <>
        <p>
          You can read every page of this website without giving us any personal information. The website does not
          ask you to create an account, does not use analytics or advertising trackers, and does not set its own
          cookies.
        </p>
        <p>
          Like any website, the hosting service that delivers these pages processes basic technical information, such
          as your IP address, browser type and the pages requested, so that the site can load and stay secure. We do
          not use this information to identify you.
        </p>
      </>
    ),
  },
  {
    id: "enquiries",
    heading: "Appointment requests, forms, WhatsApp and phone calls",
    body: (
      <>
        <p>
          The enquiry and appointment forms on this website do not send or save your details on our website. When you
          fill one in, it prepares a message in your own browser and opens WhatsApp, where you can review it and
          decide whether to send it to the clinic.
        </p>
        <p>When you contact us by WhatsApp or phone, we may receive:</p>
        <ul>
          <li>your name and phone number</li>
          <li>your preferred day and time, and the reason for your visit</li>
          <li>anything else you choose to tell us about your dental concern</li>
        </ul>
        <p>
          Online booking is provided by Kivi Health on its own website. Details you enter there are collected by Kivi
          Health under its own privacy policy, and shared with the clinic so that we can manage your appointment.
        </p>
      </>
    ),
  },
  {
    id: "health",
    heading: "Health information",
    body: (
      <>
        <p>
          Dental care needs some health information. When you visit, we may record your medical history, current
          medicines, allergies, examination findings, X-rays, clinical photographs and treatment notes.
        </p>
        <p>
          This information is kept confidential and is used to examine you, plan and provide treatment, and look after
          your safety. It is seen only by the people involved in your care.
        </p>
        <p>
          Please share only what is needed when you message us. You are welcome to keep detailed health matters for
          your visit.
        </p>
      </>
    ),
  },
  {
    id: "use",
    heading: "How we use your information",
    body: (
      <>
        <p>We use the information you give us to:</p>
        <ul>
          <li>reply to your enquiry and arrange, confirm or change appointments</li>
          <li>examine you, explain your options and provide treatment you agree to</li>
          <li>send reminders or follow-up messages about your care</li>
          <li>keep the clinical records a dental practice is expected to keep</li>
          <li>meet legal and regulatory requirements</li>
        </ul>
        <p>We do not sell your information, and we do not use it for advertising.</p>
      </>
    ),
  },
  {
    id: "photographs",
    heading: "Clinical photographs and patient stories",
    body: (
      <p>
        Before and after photographs, patient photographs and reviews appear on this website only with the
        patient&apos;s permission. If you are shown on the website and would like something removed, contact the clinic
        and we will take it down.
      </p>
    ),
  },
  {
    id: "third-parties",
    heading: "Services run by other companies",
    body: (
      <>
        <p>Some features of this website are provided by other companies, which have their own privacy policies:</p>
        <ul>
          <li>
            <strong>Kivi Health</strong>, for online appointment booking.
          </li>
          <li>
            <strong>WhatsApp</strong>, for messages you choose to send us.
          </li>
          <li>
            <strong>Google Maps</strong>, for the clinic map. On the Contact page the map loads only when you choose to
            open it. When a map loads, Google may receive information such as your IP address and may set its own
            cookies.
          </li>
          <li>
            <strong>Google reviews</strong>. Review text is retrieved by our server from Google, so viewing it does not
            share your information with Google. Links to our Google profile open Google&apos;s own website.
          </li>
          <li>
            <strong>Instagram</strong>, if you follow the link to our Instagram page.
          </li>
          <li>
            <strong>Font and hosting providers</strong>, which deliver the website and one of its fonts and may receive
            technical information such as your IP address.
          </li>
        </ul>
        <p>When you leave this website through one of these links, the other company&apos;s policy applies.</p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "When we share information",
    body: (
      <>
        <p>We share personal information only when it is needed, for example:</p>
        <ul>
          <li>with a dental laboratory or specialist involved in your treatment</li>
          <li>with someone you have asked us to share it with</li>
          <li>when the law requires it, or to protect someone&apos;s health or safety in an emergency</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    heading: "Keeping information safe and how long we keep it",
    body: (
      <>
        <p>
          We take reasonable care to protect personal information from loss, misuse and unauthorised access, and we
          limit access to people who need it for your care or for running the clinic.
        </p>
        <p>
          We keep information only for as long as it is needed for your care, for our records, or to meet legal
          requirements, and then delete or securely dispose of it.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    heading: "Your choices and rights",
    body: (
      <>
        <p>
          You can ask us what personal information we hold about you, ask us to correct it, or ask us to delete
          information we no longer need to keep. Where you have given consent, for example for a photograph to be used
          on this website, you can withdraw it at any time.
        </p>
        <p>
          Indian law, including the Digital Personal Data Protection Act, 2023, gives individuals rights over their
          personal data. To make a request or raise a concern, contact the clinic using the details below and we will
          respond as soon as we reasonably can. Some records may need to be kept for a period even after a request, for
          clinical or legal reasons, and we will explain if that applies.
        </p>
      </>
    ),
  },
  {
    id: "children",
    heading: "Children",
    body: (
      <p>
        We see children of all ages. Appointments and messages about a child should come from a parent or guardian,
        who also gives consent for the child&apos;s treatment and any information shared with us.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        We may update this policy when our services or the law change. The date at the top of this page shows when it
        was last updated. You can also read our <Link href="/terms/">Terms &amp; Conditions</Link> and{" "}
        <Link href="/medical-disclaimer/">Medical Disclaimer</Link>.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact the clinic",
    body: (
      <>
        <p>For any question about this policy or your information, please contact:</p>
        <ClinicContact />
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      crumb="Privacy Policy"
      title="Privacy Policy"
      intro="Your privacy matters to us."
      updated="10 October 2026"
      sections={sections}
    />
  );
}
