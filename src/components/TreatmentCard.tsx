import Image from "next/image";
import Link from "next/link";
import { treatmentHref, type Treatment } from "@/lib/clinic";
import { treatmentImage } from "@/lib/treatmentImages";
import { ArrowIcon } from "./Icons";
import { TreatmentGlyph, TreatmentIllustration } from "./TreatmentIllustration";

/**
 * Homepage treatment card. The heading link is stretched over the whole card, so the card is one
 * large target while remaining a single link for keyboard and screen reader users.
 */
export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const summary = treatment.homeSummary ?? treatment.overview;
  const image = treatmentImage(treatment.slug);
  return (
    <article className="treat-card lift zoom">
      <div className="treat-media">
        <span className="treat-frame zoom-media">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 720px) 82vw, (max-width: 980px) 45vw, 360px"
              className="treat-photo"
            />
          ) : (
            <TreatmentIllustration slug={treatment.slug} />
          )}
        </span>
        <span className="treat-badge" aria-hidden="true">
          <TreatmentGlyph slug={treatment.slug} />
        </span>
      </div>
      <div className="treat-body">
        <h3>
          <Link className="treat-link" href={treatmentHref(treatment.slug)}>
            {treatment.name}
          </Link>
        </h3>
        <p>{summary}</p>
        <span className="text-link" aria-hidden="true">
          Explore Treatment <ArrowIcon className="arrow" />
        </span>
      </div>
    </article>
  );
}
