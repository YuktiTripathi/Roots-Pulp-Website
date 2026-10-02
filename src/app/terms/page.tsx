import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Terms & Conditions · Roots & Pulp Dental Clinic",
  robots: { index: false, follow: false },
};

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
