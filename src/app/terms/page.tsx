import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/lib/clinic";
import { pageMetadata } from "@/lib/seo";

const seo = {
  title: "Terms & Conditions · Roots & Pulp Dental Clinic",
  description:
    "Terms for using the Roots & Pulp Dental Clinic website.",
  path: "/terms/",
};

export const metadata: Metadata = pageMetadata({ ...seo, noindex: true });

export default function TermsPage() {
  return (
    <main id="content" className="page">
      <h1>Terms & Conditions</h1>
      <p>These terms are awaiting legal review and are not published as a final document.</p>
      <p>{clinic.disclaimer}</p>
      <p>
        <Link href="/">Back to the homepage</Link>
      </p>
    </main>
  );
}
