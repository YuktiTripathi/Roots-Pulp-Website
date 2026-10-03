"use client";

import { useEffect, useState } from "react";

export type SectionLink = { id: string; label: string };

/** Distance from the top of the viewport at which a section counts as "being read". */
const READ_LINE = 220;

/**
 * Compact "on this page" bar for long treatment pages. Sticks under the header on desktop and
 * highlights the section being read. Hidden on smaller screens, where it would cost too much height.
 */
export function TreatmentSectionNav({ sections }: { sections: SectionLink[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);
    if (!nodes.length) return;

    // The observer only says *when* something crossed; the current section is then the last one
    // whose top has passed the reading line.
    const pick = () => {
      let current: string | null = null;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= READ_LINE) current = node.id;
      }
      setActive(current);
    };
    const observer = new IntersectionObserver(pick, {
      rootMargin: `-${READ_LINE}px 0px -40% 0px`,
      threshold: [0, 1],
    });
    nodes.forEach((node) => observer.observe(node));
    pick();
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="tp-sectionnav" aria-label="On this page">
      <div className="tx-wrap">
        <ol>
          {sections.map((section, index) => (
            <li key={section.id}>
              <a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>
                <span className="tp-sectionnav-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
