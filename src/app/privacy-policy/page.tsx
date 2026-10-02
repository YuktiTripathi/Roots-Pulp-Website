import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Privacy Policy · Roots & Pulp Dental Clinic",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main id="content" className="page">
      <h1>Privacy Policy</h1>
      <p>This policy is awaiting legal review and is not published as a final document.</p>
      <p>{clinic.disclaimer}</p>
      <p>
        <Link href="/">Back to the homepage</Link>
      </p>
    </main>
  );
}
