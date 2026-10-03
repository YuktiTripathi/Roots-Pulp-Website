"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { concerns, treatments } from "@/lib/clinic";
import { concernIntro } from "@/lib/homeContent";
import { stagger } from "@/lib/motion";
import { ArrowIcon } from "./Icons";
import { TreatmentCard } from "./TreatmentCard";

export function ConcernExplorer() {
  const [active, setActive] = useState(0);
  const concern = concerns[active];
  const related = useMemo(
    () =>
      concern.treatmentSlugs
        .map((slug) => treatments.find((item) => item.slug === slug))
        .filter((item): item is (typeof treatments)[number] => Boolean(item)),
    [concern],
  );

  return (
    <section className="section concerns" aria-labelledby="concerns-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow reveal">Start with what you notice</p>
          <h2 id="concerns-heading" className="reveal" style={stagger(1)}>
            What brings you in today?
          </h2>
          <p className="section-intro reveal" style={stagger(2)}>
            {concernIntro}
          </p>
        </div>
        <div className="concern-explorer">
          <ul className="concern-grid" role="list">
            {concerns.map((item, index) => (
              <li key={item.title} className="reveal" style={stagger(index + 1)}>
                <button
                  type="button"
                  className={index === active ? "concern-choice is-active" : "concern-choice"}
                  aria-pressed={index === active}
                  onClick={() => setActive(index)}
                >
                  <span className="concern-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="concern-title">{item.title}</span>
                  <span className="concern-detail">{item.detail}</span>
                  <ArrowIcon className="concern-arrow" />
                </button>
              </li>
            ))}
          </ul>
          <div className="concern-result" aria-live="polite">
            <p className="concern-note">
              Treatments commonly discussed for this concern include the options below. Only a dental examination
              can determine what is appropriate for you.
            </p>
            <div key={active} className="treat-rail swap">
              {related.map((treatment) => (
                <TreatmentCard key={treatment.slug} treatment={treatment} />
              ))}
            </div>
            <Link className="text-link" href={concern.href}>
              Browse related treatment pages <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export const ConcernCards = ConcernExplorer;
