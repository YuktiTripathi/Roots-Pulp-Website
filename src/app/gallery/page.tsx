import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GalleryTour } from "@/components/gallery/GalleryTour";
import { bookingUrl, directionsUrl, siteUrl } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import "./gallery.css";

export const metadata: Metadata = {
  title: "Inside Roots & Pulp · Dental Clinic Gallery in Aliganj, Lucknow",
  description:
    "Photographs of Roots & Pulp Dental Clinic in Aliganj, Lucknow: the entrance, consultation desk, treatment space and dental equipment.",
  robots: { index: false, follow: true },
  alternates: siteUrl ? { canonical: "/gallery/" } : undefined,
};

export default function GalleryPage() {
  return (
    <main id="content" className="gallery-page motion-page">
      <section className="gallery-hero" aria-labelledby="gallery-heading">
        <div className="gallery-hero-inner">
          <nav className="crumbs gallery-crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">Gallery</li>
            </ol>
          </nav>
          <div className="gallery-hero-grid">
            <div>
              <p className="eyebrow enter">Inside Roots &amp; Pulp</p>
              <h1 id="gallery-heading" className="enter" style={stagger(1)}>
                A closer look at
                <br />
                where your care begins.
              </h1>
              <p className="lede enter" style={stagger(2)}>
                Step inside Roots &amp; Pulp Dental Clinic and see the entrance, the consultation desk, the
                treatment space and the equipment that shape a visit.
              </p>
              <div className="hero-actions enter" style={stagger(3)}>
                <a className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book an Appointment
                </a>
              </div>
            </div>
            <figure className="gallery-hero-visual">
              <div className="gallery-hero-frame reveal reveal--mask">
                <Image
                  src="/images/clinic-entrance.jpg"
                  alt="Entrance of Roots & Pulp Dental Clinic in Aliganj, Lucknow"
                  fill
                  priority
                  sizes="(max-width: 980px) 100vw, 620px"
                  className="gallery-hero-img mask-img"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>
      <GalleryTour />
      <section className="gallery-cta" aria-labelledby="gallery-cta-heading">
        <div className="section-inner reveal">
          <h2 id="gallery-cta-heading">Come see it for yourself.</h2>
          <p>Ready to visit Roots &amp; Pulp?</p>
          <div className="hero-actions">
            <a className="btn btn-light" href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Book an Appointment
            </a>
            <a className="btn btn-line" href={directionsUrl} target="_blank" rel="noopener noreferrer">
              Get directions
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
