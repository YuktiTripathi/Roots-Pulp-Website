import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TreatmentApproach } from "@/components/treatments/TreatmentApproach";
import { additionalTreatments, FeaturedTreatmentCard, TreatmentListItem } from "@/components/treatments/TreatmentsLanding";
import { bookingUrl, featuredTreatments, whatsappHref } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import { photos } from "@/lib/photos";
import "./treatments.css";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/schema";

const seo = {
  title: "Dental Treatments in Aliganj, Lucknow · Roots & Pulp",
  description:
    "Dental treatments at Roots & Pulp in Aliganj, Lucknow: cleaning, fillings, root canals, crowns, implants, dentures, braces, whitening and children's dentistry.",
  path: "/treatments/",
};

export const metadata: Metadata = pageMetadata({ ...seo });

export default function TreatmentsPage() {
  return (
    <main id="content" className="treatments-page motion-page">
      <section className="tx-hero" aria-labelledby="treatments-heading">
        <div className="tx-wrap">
          <nav className="crumbs tx-crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">Treatments</li>
            </ol>
          </nav>
          <div className="tx-hero-grid">
            <div>
              <p className="eyebrow enter">Dental treatments</p>
              <h1 id="treatments-heading" className="enter" style={stagger(1)}>
                Care for every stage
                <br />
                of your smile
              </h1>
              <p className="lede enter" style={stagger(2)}>
                From preventive care and everyday dental concerns to restorative, cosmetic and specialised treatments,
                Roots &amp; Pulp provides thoughtful dental care tailored to your needs.
              </p>
              <div className="hero-actions enter" style={stagger(3)}>
                <a className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book an Appointment
                </a>
                <a className="btn btn-secondary" href="#guidance">
                  Not sure what you need?
                </a>
              </div>
            </div>
            <figure className="tx-hero-visual">
              <div className="tx-hero-frame reveal reveal--mask">
                <Image
                  src={photos.procedure.src}
                  alt={photos.procedure.alt}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 480px"
                  className="tx-hero-img mask-img"
                  style={{ objectPosition: photos.procedure.position }}
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="tx-featured" aria-labelledby="featured-heading">
        <div className="tx-wrap">
          <p className="eyebrow reveal">Explore our treatments</p>
          <h2 id="featured-heading" className="reveal" style={stagger(1)}>
            Thoughtful care, tailored to you
          </h2>
          <p className="lede reveal" style={stagger(2)}>
            Explore our dental treatments and learn more about the care available at Roots &amp; Pulp.
          </p>
          <div className="tx-grid">
            {featuredTreatments.map((treatment, index) => (
              <FeaturedTreatmentCard key={treatment.slug} treatment={treatment} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="tx-everyday" aria-labelledby="everyday-heading">
        <div className="tx-wrap">
          <p className="eyebrow reveal">Everyday dental care</p>
          <h2 id="everyday-heading" className="reveal" style={stagger(1)}>
            Essential care for your oral health
          </h2>
          <p className="lede reveal" style={stagger(2)}>
            From preventive care to common dental concerns, thoughtful treatment starts with understanding what&apos;s
            happening and why.
          </p>
          <ul className="tx-list">
            {additionalTreatments.map((item, index) => (
              <TreatmentListItem key={item.slug} treatment={item} index={index} />
            ))}
          </ul>
        </div>
      </section>

      <section className="tx-guidance" id="guidance" aria-labelledby="guidance-heading">
        <div className="tx-wrap tx-guidance-inner reveal">
          <p className="eyebrow">Not sure what you need?</p>
          <h2 id="guidance-heading">You don&apos;t need to know the treatment before you visit</h2>
          <p>
            Tell us what&apos;s bothering you. We&apos;ll help you understand what needs attention and talk you through
            your options.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Book a Consultation
            </a>
            <a className="btn btn-secondary" href={whatsappHref()}>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="tx-approach" aria-labelledby="approach-heading">
        <div className="tx-wrap">
          <p className="eyebrow">Our approach</p>
          <h2 id="approach-heading">Treatment starts with understanding</h2>
          <p className="lede">
            At Roots &amp; Pulp, we begin by understanding your concern, examining what&apos;s happening and explaining
            the available options before treatment begins.{" "}
            <Link href="/doctor/dr-shubham-tripathi/">Meet Dr. Shubham Tripathi</Link>.
          </p>
          <TreatmentApproach />
        </div>
      </section>

      <section className="tx-close" aria-labelledby="close-heading">
        <div className="tx-wrap reveal">
          <h2 id="close-heading">Your dental care starts with a conversation</h2>
          <p>Have a concern, or simply want to understand your options?</p>
          <div className="hero-actions">
            <a className="btn btn-light" href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Book an Appointment
            </a>
            <a className="btn btn-line" href={whatsappHref()}>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          webPageJsonLd({ name: seo.title, description: seo.description, path: seo.path, type: "CollectionPage", breadcrumb: [{ name: "Treatments", path: "/treatments/" }] }),
        )}
      />
    </main>
  );
}
