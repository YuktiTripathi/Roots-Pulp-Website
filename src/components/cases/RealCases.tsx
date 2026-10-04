import { casesPageHref, getRenderableCases } from "@/lib/cases";
import { stagger } from "@/lib/motion";
import { CasesLayout } from "./CasesLayout";
import { casesCopy } from "./copy";
import "./cases.css";

/**
 * Real, consented clinical cases. Renders nothing until at least one valid case exists in
 * src/lib/cases.ts: no placeholder, no sample images.
 */
export function RealCases() {
  const { featured, more } = getRenderableCases();
  if (featured.length === 0) return null;

  return (
    <section className="section cases-section" aria-labelledby="cases-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow reveal">{casesCopy.eyebrow}</p>
          <h2 id="cases-heading" className="reveal" style={stagger(1)}>
            {casesCopy.heading}
          </h2>
          <p className="section-intro reveal" style={stagger(2)}>
            {casesCopy.intro}
          </p>
          <p className="cases-tagline reveal" style={stagger(3)}>
            {casesCopy.tagline}
          </p>
        </div>
        <CasesLayout featured={featured} more={more} moreHref={casesPageHref} />
      </div>
    </section>
  );
}
