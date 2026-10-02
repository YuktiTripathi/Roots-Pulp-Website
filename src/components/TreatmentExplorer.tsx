"use client";

import { useState } from "react";
import Link from "next/link";
import { treatmentExplorerTabs, treatments } from "@/lib/clinic";
import { TreatmentCard } from "./TreatmentCard";

export function TreatmentExplorer() {
  const [group, setGroup] = useState<(typeof treatmentExplorerTabs)[number]["group"]>(
    treatmentExplorerTabs[0].group,
  );
  const visible = treatments.filter((item) => item.group === group);

  return (
    <section className="section treatments" aria-labelledby="treatments-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">Care, by category</p>
          <h2 id="treatments-heading">Treatments at Roots & Pulp</h2>
        </div>
        <div className="explorer-tabs" role="tablist" aria-label="Treatment categories">
          {treatmentExplorerTabs.map((tab) => (
            <button
              key={tab.group}
              type="button"
              role="tab"
              aria-selected={tab.group === group}
              className={tab.group === group ? "explorer-tab is-active" : "explorer-tab"}
              onClick={() => setGroup(tab.group)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="treat-rail treat-grid" role="tabpanel" aria-label={group}>
          {visible.map((treatment) => (
            <TreatmentCard key={treatment.slug} treatment={treatment} />
          ))}
        </div>
        <p className="section-more">
          <Link className="text-link" href="/treatments/">
            View all treatments <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}

export const FeaturedTreatments = TreatmentExplorer;
