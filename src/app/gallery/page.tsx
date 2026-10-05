import type { Metadata } from "next";
import { InnerPageHero } from "@/components/InnerPageHero";
import { GalleryTour } from "@/components/gallery/GalleryTour";
import { getGalleryCases } from "@/lib/cases";
import { bookingUrl } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import "./gallery.css";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/schema";

const seo = {
  title: "Inside Roots & Pulp · Dental Clinic Gallery in Aliganj, Lucknow",
  description:
    "Photographs of Roots & Pulp Dental Clinic in Aliganj, Lucknow: the entrance, consultation desk, treatment space and dental equipment.",
  path: "/gallery/",
};

export const metadata: Metadata = pageMetadata({ ...seo });

export default function GalleryPage() {
  return (
    <main id="content" className="gallery-page motion-page">
      <InnerPageHero
        crumb="Gallery"
        titleId="gallery-heading"
        eyebrow="Inside Roots & Pulp"
        title="A closer look at where your care begins"
        image="/images/clinic/roots-pulp-clinic-interior-lucknow.webp"
        imageAlt="Reception and interior of Roots & Pulp Dental Clinic in Aliganj, Lucknow"
        imagePosition="center 55%"
        overlayStrength="strong"
      >
        <p className="lede enter" style={stagger(1)}>
          Step inside Roots &amp; Pulp Dental Clinic and see the entrance, the consultation desk, the treatment space,
          the equipment and real patient cases.
        </p>
        <div className="hero-actions enter" style={stagger(2)}>
          <a className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Book an Appointment
          </a>
        </div>
      </InnerPageHero>
      <GalleryTour cases={getGalleryCases()} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          webPageJsonLd({ name: seo.title, description: seo.description, path: seo.path, type: "CollectionPage", breadcrumb: [{ name: "Gallery", path: "/gallery/" }], image: "/images/clinic/roots-pulp-clinic-interior-lucknow.webp" }),
        )}
      />
    </main>
  );
}
