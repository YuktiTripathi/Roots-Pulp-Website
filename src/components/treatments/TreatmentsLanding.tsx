import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { TreatmentGlyph } from "@/components/TreatmentIllustration";
import { featuredTreatments, treatmentHref, treatments, type Treatment } from "@/lib/clinic";
import { stagger } from "@/lib/motion";

const treatmentImages: Record<string, { src: string; alt: string }> = {
  "root-canal-treatment": {
    src: "/images/treatments/root-canal-treatment.jpg",
    alt: "Illustration of a root canal file inside a tooth",
  },
  "dental-implants": {
    src: "/images/treatments/dental-implants.jpg",
    alt: "Illustration of a dental implant crown and abutment",
  },
  "crowns-and-bridges": {
    src: "/images/treatments/crowns-and-bridges.jpg",
    alt: "Illustration of a dental bridge replacing missing teeth",
  },
  "braces-and-aligners": {
    src: "/images/treatments/braces-and-aligners.jpg",
    alt: "Clear aligners beside fixed braces",
  },
  "childrens-dentistry": {
    src: "/images/treatments/childrens-dentistry.jpg",
    alt: "A child in a dental chair during a checkup",
  },
  "cosmetic-dentistry": {
    src: "/images/treatments/cosmetic-dentistry.jpg",
    alt: "Shade guide held beside a smile",
  },
  "teeth-cleaning": {
    src: "/images/treatments/teeth-cleaning.webp",
    alt: "Dental scaler cleaning tartar from teeth",
  },
  "tooth-coloured-fillings": {
    src: "/images/treatments/tooth-coloured-fillings.webp",
    alt: "Filling material being placed in a tooth",
  },
  "tooth-extraction": {
    src: "/images/treatments/tooth-extraction.jpg",
    alt: "Illustration of a tooth being removed",
  },
  "gum-and-oral-health": {
    src: "/images/treatments/gum-and-oral-health.jpg",
    alt: "A clinician examining the lower gums",
  },
  dentures: {
    src: "/images/treatments/dentures.jpg",
    alt: "A partial denture held in a gloved hand",
  },
  "teeth-whitening": {
    src: "/images/treatments/teeth-whitening.webp",
    alt: "A smile shown before and after whitening",
  },
  "emergency-dental-care": {
    src: "/images/treatments/emergency-dental-care.jpg",
    alt: "A person holding their cheek in discomfort",
  },
};

export function treatmentImage(slug: string) {
  return treatmentImages[slug];
}

const featuredSlugs = new Set(featuredTreatments.map((item) => item.slug));

export const additionalTreatments = treatments.filter((item) => !featuredSlugs.has(item.slug));

const CARD_SIZES = "(max-width: 680px) 100vw, (max-width: 900px) 50vw, 380px";

/**
 * Card for the featured treatments. The heading link is stretched over the whole card
 * so the card is one large tap target while staying a single link for keyboard and
 * screen reader users.
 */
export function FeaturedTreatmentCard({ treatment, index = 0 }: { treatment: Treatment; index?: number }) {
  const image = treatmentImage(treatment.slug);
  return (
    <div className="tx-cell reveal" style={stagger(index % 3)}>
      <article className="tx-card">
        <div className="tx-media">
          <div className="tx-photo">
            {image ? <Image src={image.src} alt={image.alt} fill sizes={CARD_SIZES} className="tx-img" /> : null}
          </div>
          <span className="tx-badge" aria-hidden="true">
            <TreatmentGlyph slug={treatment.slug} />
          </span>
        </div>
        <div className="tx-body">
          <h3>
            <Link href={treatmentHref(treatment.slug)}>{treatment.name}</Link>
          </h3>
          <p>{treatment.overview}</p>
          <span className="text-link" aria-hidden="true">
            Explore Treatment <ArrowIcon className="arrow" />
          </span>
        </div>
      </article>
    </div>
  );
}

/** Compact image card used for everyday treatments and related treatments. */
export function TreatmentListItem({ treatment, index = 0 }: { treatment: Treatment; index?: number }) {
  const image = treatmentImage(treatment.slug);
  return (
    <li className="reveal" style={stagger(index % 3)}>
      <Link href={treatmentHref(treatment.slug)}>
        {image ? (
          <span className="tx-list-media">
            <Image src={image.src} alt={image.alt} fill sizes={CARD_SIZES} className="tx-img" />
          </span>
        ) : null}
        <span className="tx-list-copy">
          <strong>{treatment.name}</strong>
          <span>{treatment.overview}</span>
        </span>
        <span className="tx-go" aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
}
