import type { ReactNode } from "react";
import { stagger } from "@/lib/motion";
import "./why-roots-pulp.css";

/**
 * The clinic's philosophy, shown identically on every treatment page.
 * Shared brand content: keep it the same everywhere and free of treatment keywords.
 * Treatment specific detail belongs in the page's own sections.
 */
const whyRootsPulp = {
  heading: "Why Roots & Pulp?",
  intro: "Dental care should feel clear, thoughtful and personal.",
  items: [
    {
      icon: "listen",
      title: "We listen first",
      text: "Good treatment starts by understanding what brought you in, what is bothering you, and what matters to you.",
    },
    {
      icon: "explain",
      title: "We explain clearly",
      text: "You should understand what we found, what your options are, and why a treatment may be recommended.",
    },
    {
      icon: "thoughtful",
      title: "We treat thoughtfully",
      text: "Recommendations are based on your individual dental needs rather than a one-size-fits-all approach.",
    },
    {
      icon: "future",
      title: "We think beyond today",
      text: "Prevention, maintenance and long-term oral health are part of the same conversation.",
    },
  ],
} as const;

type IconName = (typeof whyRootsPulp.items)[number]["icon"];

const icons: Record<IconName, ReactNode> = {
  listen: (
    <>
      <path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H11l-4 3.5V16H6.5a2 2 0 0 1-2-2Z" />
      <path d="M8.5 9h7M8.5 12h4.5" />
    </>
  ),
  explain: (
    <>
      <path d="M2.8 12s3.4-6 9.2-6 9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  thoughtful: (
    <>
      <path d="M12 3.6 5.4 6.2v5.3c0 4.1 2.8 7.4 6.6 8.9 3.8-1.5 6.6-4.8 6.6-8.9V6.2Z" />
      <path d="m9.2 12 2 2 3.8-3.8" />
    </>
  ),
  future: (
    <>
      <path d="M12 20.5V11" />
      <path d="M12 11c0-3.6 2.6-6.2 6.5-6.5-.2 3.8-2.8 6.5-6.5 6.5Z" />
      <path d="M12 14c0-2.8-2.1-4.9-5.3-5.1.2 3 2.3 5.1 5.3 5.1Z" />
    </>
  ),
};

/** Shared "Why Roots & Pulp?" section for every treatment page. Takes no props on purpose. */
export function WhyRootsPulp() {
  return (
    <section className="tp-section tp-soft why-rp" aria-labelledby="why-heading">
      <div className="tx-wrap">
        <h2 id="why-heading" className="reveal">
          {whyRootsPulp.heading}
        </h2>
        <p className="tp-intro reveal" style={stagger(1)}>
          {whyRootsPulp.intro}
        </p>
        <ul className="why-rp-grid" role="list">
          {whyRootsPulp.items.map((item, index) => (
            <li key={item.title} className="why-rp-card reveal" style={stagger(index)}>
              <span className="why-rp-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">{icons[item.icon]}</svg>
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
