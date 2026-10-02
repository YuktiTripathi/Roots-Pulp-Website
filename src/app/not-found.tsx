import type { Metadata } from "next";
import Link from "next/link";
import { clinic, telHref } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Page Not Found · Roots & Pulp Dental Clinic",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="content" className="page">
      <h1>We couldn&apos;t find that page</h1>
      <p>The page you&apos;re looking for may have moved or no longer exists. Here are a few places to start instead:</p>
      <ul>
        <li>
          <Link href="/">Go to the homepage</Link>
        </li>
        <li>
          <Link href="/treatments/">Browse our treatments</Link>
        </li>
        <li>
          <Link href="/contact/">Contact us for directions and timings</Link>
        </li>
      </ul>
      <h3>In pain?</h3>
      <p>
        Call us on {clinic.phoneDisplay}. We&apos;re open Monday to Saturday, 10 AM to 8 PM, and Sunday, 10 AM to 5 PM.
      </p>
      <div className="hero-actions">
        <Link className="btn btn-primary" href="/">
          Back to the homepage
        </Link>
        <Link className="btn btn-secondary" href="/treatments/">
          View treatments
        </Link>
        <a className="btn btn-tertiary" href={telHref()}>
          Call {clinic.phoneDisplay}
        </a>
      </div>
    </main>
  );
}
