import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/lib/clinic";
import { pageMetadata } from "@/lib/seo";

const seo = {
  title: "Medical Disclaimer · Roots & Pulp Dental Clinic",
  description:
    "Information on this website is general and isn't a substitute for a professional dental examination.",
  path: "/medical-disclaimer/",
};

export const metadata: Metadata = pageMetadata({ ...seo, noindex: true });

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
