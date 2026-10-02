"use client";

import { useEffect, useRef, useState } from "react";
import { carePrinciples } from "@/lib/clinic";

export function InteractivePrinciples() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    if (window.matchMedia("(max-width: 980px), (prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = itemRefs.current.findIndex((node) => node === visible.target);
        if (index >= 0) setActive(index);
      },
      { root: null, threshold: 0.6, rootMargin: "-20% 0px -35% 0px" },
    );

    itemRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  const current = carePrinciples[active];

  return (
    <div className="section-inner principles-section reveal" ref={sectionRef}>
      <p className="eyebrow">Our philosophy</p>
      <h2 className="principles-heading">How we practise</h2>
      <div className="principles-interactive principles-editorial">
        <div className="principles-nav" role="tablist" aria-label="Care principles">
          {carePrinciples.map((principle, index) => (
            <button
              key={principle.num}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              role="tab"
              type="button"
              aria-selected={active === index}
              className={active === index ? "principle-tab is-active" : "principle-tab"}
              onClick={() => setActive(index)}
            >
              <span className="principle-num">{principle.num}</span>
              <span className="principle-tab-title">{principle.title}</span>
            </button>
          ))}
        </div>
        <div className="principle-panel" role="tabpanel" aria-label={current.title}>
          <p className="principle-kicker">{current.num}</p>
          <h3>{current.title}</h3>
          <p>{current.body}</p>
        </div>
      </div>
    </div>
  );
}
