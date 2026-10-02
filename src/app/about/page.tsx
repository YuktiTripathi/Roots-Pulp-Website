import type { Metadata } from "next";
import Link from "next/link";
import { bookingUrl } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "About Roots & Pulp Dental Clinic · Aliganj, Lucknow",
  description:
    "The story behind Roots & Pulp, how we care for patients, and what to expect when you visit our dental clinic in Sector Q, Aliganj.",
  robots: { index: false, follow: true },
};

export default function AboutPage() {
  return (
    <main id="content" className="page">
      <p className="crumbs">
        <Link href="/">Home</Link> · About
      </p>
      <h1>About Roots & Pulp</h1>
      <p className="lede">
        A neighbourhood dental clinic in Aliganj, built on careful diagnosis, honest advice and gentle care.
      </p>
      <h2>The story behind the name</h2>
      <p>
        From the outside, a tooth looks simple. Underneath the enamel sits the pulp, a living core of nerves and
        blood vessels, held in place by roots anchored in bone. That&apos;s where most dental problems begin, and
        it&apos;s where good dentistry begins too.
      </p>
      <h2>What we believe</h2>
      <p>
        Diagnosis before treatment. Every recommendation starts with a proper examination. We treat what&apos;s
        needed, and we&apos;ll tell you when something can wait or doesn&apos;t need treatment at all.
      </p>
      <p>
        Explanation before consent. You&apos;ll understand what we&apos;ve found, what your options are, and what
        each one involves, including time and cost, before anything begins.
      </p>
      <p>
        Prevention over repair. Dr. Tripathi&apos;s training in public health shapes everything we do. The best
        treatment is the one you never need, so we help you keep problems from coming back.
      </p>
      <p>Comfort at every step. We work at a pace that suits you, check in as we go, and never rush.</p>
      <h2>What a visit is like</h2>
      <ol>
        <li>Arrival: a short form about your health and concerns.</li>
        <li>Consultation: Dr. Tripathi listens first, then examines your teeth and gums, with an X-ray if needed.</li>
        <li>Explanation: what he&apos;s found, shown and explained in plain language.</li>
        <li>Your plan: options, number of visits and a clear cost estimate. There&apos;s no pressure to decide on the day.</li>
        <li>Treatment: carried out gently, with regular check-ins.</li>
        <li>Follow-up: aftercare advice and a recommended date for your next checkup.</li>
      </ol>
      <h2>Meet the doctor</h2>
      <p>
        Dr. Shubham Tripathi, BDS, MPH · Founder & Director · Specialised Certification in Rotary Endodontics · Over
        7 years of clinical experience · Life Member, Indian Dental Association
      </p>
      <p>
        <Link className="text-link" href="/doctor/dr-shubham-tripathi/">
          Read Dr. Tripathi&apos;s profile <span aria-hidden="true">→</span>
        </Link>
      </p>
      <div className="hero-actions">
        <Link className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
          Book an appointment
        </Link>
      </div>
    </main>
  );
}
