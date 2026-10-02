"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { concerns, treatmentHref, treatments } from "@/lib/clinic";
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
          <p className="eyebrow">Start with what you notice</p>
          <h2 id="concerns-heading">What brings you in today?</h2>
        </div>
        <div className="concern-explorer">
          <ul className="concern-grid" role="list">
            {concerns.map((item, index) => (
              <li key={item.title}>
                <button
                  type="button"
                  className={index === active ? "concern-choice is-active" : "concern-choice"}
                  aria-pressed={index === active}
                  onClick={() => setActive(index)}
                >
                  <span className="concern-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </button>
              </li>
            ))}
          </ul>
          <div className="concern-result" aria-live="polite">
            <p className="concern-note">
              Treatments commonly discussed for this concern include the options below. Only a dental examination
              can determine what is appropriate for you.
            </p>
            <div className="treat-rail">
              {related.map((treatment) => (
                <TreatmentCard key={treatment.slug} treatment={treatment} />
              ))}
            </div>
            <Link className="text-link" href={treatmentHref(related[0]?.slug ?? "root-canal-treatment")}>
              Browse related treatment pages <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export const ConcernCards = ConcernExplorer;
