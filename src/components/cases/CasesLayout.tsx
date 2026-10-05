import Link from "next/link";
import type { RenderableCase } from "@/lib/cases";
import { CaseCard, type CaseSize } from "./CaseCard";
import { casesNote } from "./copy";

type Props = {
  featured: RenderableCase[];
  more: RenderableCase[];
  moreHref: string | null;
};

/** Case A large, B and C small, D wide. */
const featuredSizes: CaseSize[] = ["large", "small", "small", "wide"];

export function CasesLayout({ featured, more, moreHref }: Props) {
  return (
    <>
      <div className={`cases-grid cases-grid-${featured.length}`}>
        {featured.map((item, index) => (
          <CaseCard key={item.id} case={item} size={featuredSizes[index]} />
        ))}
      </div>

      {more.length > 0 ? (
        <div className="cases-more">
          <h3 className="cases-more-title">More cases</h3>
          <div className="cases-more-row">
            {more.map((item) => (
              <CaseCard key={item.id} case={item} size="more" />
            ))}
          </div>
        </div>
      ) : null}

      <p className="cases-note">{casesNote}</p>
      {moreHref ? (
        <p className="cases-view-more">
          <Link className="cases-link" href={moreHref}>
            View more cases <span aria-hidden="true">→</span>
          </Link>
        </p>
      ) : null}
    </>
  );
}
