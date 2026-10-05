import Image from "next/image";
import Link from "next/link";
import type { RenderableCase } from "@/lib/cases";
import { CaseComparison } from "./CaseComparison";
import { CaseFade } from "./CaseFade";
import { CasePair } from "./CasePair";

export type CaseSize = "large" | "small" | "wide" | "more";

const caseImageSizes: Record<CaseSize, string> = {
  large: "(max-width: 980px) 100vw, 640px",
  small: "(max-width: 980px) 100vw, 440px",
  wide: "(max-width: 980px) 100vw, 880px",
  more: "(max-width: 980px) 100vw, 320px",
};

/** Each photo of a side by side pair takes half the card. */
const pairSizes: Record<CaseSize, string> = {
  large: "(max-width: 980px) 50vw, 320px",
  small: "(max-width: 980px) 50vw, 220px",
  wide: "(max-width: 980px) 50vw, 440px",
  more: "(max-width: 980px) 50vw, 160px",
};

type Props = {
  case: RenderableCase;
  size: CaseSize;
};

export function CaseCard({ case: item, size }: Props) {
  const sizes = caseImageSizes[size];
  const titleId = `case-${item.id}-title`;
  const portrait = item.mode !== "pair" && item.after ? item.after.height > item.after.width : false;

  return (
    <article className={`cases-card cases-card-${size}${portrait ? " cases-card-portrait" : ""}`} aria-labelledby={titleId}>
      <div className="cases-card-head">
        <p className="cases-concern">{item.concern}</p>
        <h3 id={titleId} className="cases-title">
          {item.title}
        </h3>
      </div>
      <div className="cases-card-media">
        {item.mode === "comparison" && item.before && item.after ? (
          <CaseComparison before={item.before} after={item.after} caseTitle={item.title} sizes={sizes} />
        ) : item.mode === "fade" && item.before && item.after ? (
          <CaseFade before={item.before} after={item.after} caseTitle={item.title} sizes={sizes} />
        ) : item.mode === "pair" && item.before && item.after ? (
          <CasePair before={item.before} after={item.after} sizes={pairSizes[size]} />
        ) : item.image ? (
          <div className="cases-card-image" style={{ aspectRatio: `${item.image.width} / ${item.image.height}` }}>
            <Image src={item.image.src} alt={item.image.alt} fill sizes={sizes} loading="lazy" />
          </div>
        ) : null}
      </div>
      <div className="cases-card-body">
        <p className="cases-summary">{item.summary}</p>
        <Link className="cases-link" href={item.link.href}>
          {item.link.label} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
