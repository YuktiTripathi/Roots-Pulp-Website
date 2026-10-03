"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { treatmentExplorerTabs, treatments } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import { TreatmentCard } from "./TreatmentCard";

type Group = (typeof treatmentExplorerTabs)[number]["group"];

export function TreatmentExplorer() {
  const [group, setGroup] = useState<Group>(treatmentExplorerTabs[0].group);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const visible = treatments.filter((item) => item.group === group);
  const activeIndex = treatmentExplorerTabs.findIndex((tab) => tab.group === group);

  // Arrow keys move between tabs, as the WAI-ARIA tabs pattern expects.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = treatmentExplorerTabs.length - 1;
    let next = -1;
    if (event.key === "ArrowRight") next = activeIndex === last ? 0 : activeIndex + 1;
    if (event.key === "ArrowLeft") next = activeIndex === 0 ? last : activeIndex - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next < 0) return;
    event.preventDefault();
    setGroup(treatmentExplorerTabs[next].group);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="section treatments" aria-labelledby="treatments-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow reveal">Care, by category</p>
          <h2 id="treatments-heading" className="reveal" style={stagger(1)}>
            Treatments at Roots & Pulp
          </h2>
        </div>
        <div
          className="explorer-tabs reveal"
          style={stagger(2)}
          role="tablist"
          aria-label="Treatment categories"
          onKeyDown={onKeyDown}
        >
          {treatmentExplorerTabs.map((tab, index) => {
            const selected = tab.group === group;
            return (
              <button
                key={tab.group}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`${baseId}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                className={selected ? "explorer-tab is-active" : "explorer-tab"}
                onClick={() => setGroup(tab.group)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div
          key={group}
          id={`${baseId}-panel`}
          className="treat-rail swap"
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeIndex}`}
        >
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
