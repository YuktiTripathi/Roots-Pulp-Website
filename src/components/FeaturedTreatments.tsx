import Link from "next/link";
import { featuredTreatments } from "@/lib/clinic";
import { moreTreatmentLinks } from "@/lib/homeContent";
import { stagger } from "@/lib/motion";
import { TreatmentCard } from "./TreatmentCard";

/** The six major treatments with equal weight, then smaller links to the rest. */
export function FeaturedTreatments() {
  return (
    <section className="section treatments" aria-labelledby="treatments-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow reveal">Treatments</p>
          <h2 id="treatments-heading" className="reveal" style={stagger(1)}>
            Care for the things that matter most
          </h2>
        </div>
        <div className="featured-grid">
          {featuredTreatments.map((treatment, index) => (
            <div key={treatment.slug} className="reveal" style={stagger(index % 3)}>
              <TreatmentCard treatment={treatment} />
            </div>
          ))}
        </div>
        <p className="section-more">
          <Link className="text-link" href="/treatments/">
            View all treatments <span aria-hidden="true">→</span>
          </Link>
        </p>
        {/* [CLINIC DETAIL REQUIRED]: add an Emergency Dental Care link only if a page is created. */}
        <ul className="more-treatments" aria-label="More treatments">
          {moreTreatmentLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
