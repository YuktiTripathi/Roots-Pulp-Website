import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/lib/clinic";
import { pageMetadata } from "@/lib/seo";

const seo = {
  title: "Privacy Policy · Roots & Pulp Dental Clinic",
  description:
    "How Roots & Pulp Dental Clinic handles the personal information you share with us.",
  path: "/privacy-policy/",
};

export const metadata: Metadata = pageMetadata({ ...seo, noindex: true });

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
