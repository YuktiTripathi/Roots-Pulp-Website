import Link from "next/link";
import { treatmentHref, type Treatment } from "@/lib/clinic";
import { ArrowIcon } from "./Icons";
import { TreatmentGlyph, TreatmentIllustration } from "./TreatmentIllustration";

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const summary = treatment.homeSummary ?? treatment.overview;
  return (
    <article className="treat-card">
      <div className="treat-media">
        <TreatmentIllustration slug={treatment.slug} />
        <span className="treat-badge">
          <TreatmentGlyph slug={treatment.slug} />
        </span>
      </div>
      <div className="treat-body">
        <h3>{treatment.name}</h3>
        <p>{summary}</p>
        <Link className="text-link" href={treatmentHref(treatment.slug)}>
          Explore Treatment <ArrowIcon className="arrow" />
        </Link>
      </div>
    </article>
  );
}
