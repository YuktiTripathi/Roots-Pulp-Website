import type { Metadata } from "next";
import Link from "next/link";
import { AppointmentWizard } from "@/components/AppointmentWizard";
import { clinic, telHref, whatsappHref } from "@/lib/clinic";
import { pageMetadata } from "@/lib/seo";

const seo = {
  title: "Book a Dental Appointment · Roots & Pulp, Aliganj",
  description:
    "Request an appointment with Dr. Shubham Tripathi at Roots & Pulp Dental Clinic, Aliganj. Book online, call or WhatsApp. Open 7 days.",
  path: "/book-appointment/",
};

export const metadata: Metadata = pageMetadata({ ...seo, noindex: true });

export default function BookPage() {
  return (
    <main id="content" className="page">
      <p className="crumbs">
        <Link href="/">Home</Link> · Book Appointment
      </p>
      <h1>Request an appointment</h1>
      <p className="lede">
        Share what you need and a preferred time. This is a request, not a confirmed booking. We will call you to
        confirm. Prefer to talk? Call or WhatsApp the clinic instead.
      </p>
      <div className="hero-actions">
        <a className="btn btn-secondary" href={telHref()}>
          Call {clinic.phoneDisplay}
        </a>
        <a className="btn btn-tertiary" href={whatsappHref()}>
          WhatsApp {clinic.whatsappDisplay}
        </a>
      </div>
      <AppointmentWizard />
    </main>
  );
}
