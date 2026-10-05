import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { featuredTreatments, treatmentHref, treatments, type Treatment } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import { treatmentImage } from "@/lib/treatmentImages";

export { treatmentImage };

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
export function TreatmentListItem({
  treatment,
  index = 0,
  summary,
}: {
  treatment: Treatment;
  index?: number;
  /** Replaces the overview line, e.g. to say why a treatment is related. */
  summary?: string;
}) {
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
          <span>{summary ?? treatment.overview}</span>
        </span>
        <span className="tx-go" aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
}
