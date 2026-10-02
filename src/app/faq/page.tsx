import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@/components/FAQSection";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Frequently Asked Questions · Roots & Pulp Dental Clinic",
  description:
    "Answers to common questions about appointments, treatments, children's dental care, emergencies and payments at Roots & Pulp, Aliganj.",
  robots: { index: false, follow: true },
};

export default function FaqPage() {
  return (
    <main id="content">
      <div className="page" style={{ paddingBottom: 0 }}>
        <p className="crumbs">
          <Link href="/">Home</Link> · FAQ
        </p>
        <h1>Frequently asked questions</h1>
        <p className="lede">Can&apos;t find your answer? Call 6386080239 or WhatsApp 7746989097.</p>
      </div>
      <FAQSection showHeading={false} />
    </main>
  );
}
