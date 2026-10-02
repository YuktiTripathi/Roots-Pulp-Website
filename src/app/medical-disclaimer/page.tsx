import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Medical Disclaimer · Roots & Pulp Dental Clinic",
  robots: { index: false, follow: false },
};

export default function DisclaimerPage() {
  return (
    <main id="content" className="page">
      <h1>Medical Disclaimer</h1>
      <p>{clinic.disclaimer}</p>
      <p>The full disclaimer is awaiting legal review and is not published as a final document.</p>
      <p>
        <Link href="/">Back to the homepage</Link>
      </p>
    </main>
  );
}
