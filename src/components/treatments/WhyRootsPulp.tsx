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
      icon: "tooth",
      title: "We treat thoughtfully",
      text: "Recommendations are based on your individual dental needs rather than a one-size-fits-all approach.",
    },
    {
      icon: "calendar",
      title: "We think beyond today",
      text: "Prevention, maintenance and long term oral health are part of the same conversation.",
    },
  ],
} as const;

type IconName = (typeof whyRootsPulp.items)[number]["icon"];

/** One line icon set, 24px grid, 1.6 stroke: speech bubble, clipboard, tooth, calendar. */
const icons: Record<IconName, ReactNode> = {
  listen: (
    <>
      <path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H11l-4 3.5V16H6.5a2 2 0 0 1-2-2Z" />
      <path d="M8.5 9h7M8.5 12h4.5" />
    </>
  ),
  explain: (
    <>
      <rect x="5.5" y="4.5" width="13" height="16" rx="2" />
      <path d="M9.5 3.5h5v2.5h-5Z" />
      <path d="M8.8 11h6.4M8.8 14.5h6.4M8.8 18h3.6" />
    </>
  ),
  tooth: (
    <>
      <path d="M8.2 4.2c-2.4 0-3.9 1.9-3.9 4.4 0 2.2.9 3.6 1.5 5.4.6 1.9.8 6 2.6 6 1.6 0 1.6-3.6 3.6-3.6s2 3.6 3.6 3.6c1.8 0 2-4.1 2.6-6 .6-1.8 1.5-3.2 1.5-5.4 0-2.5-1.5-4.4-3.9-4.4-1.6 0-2.4.9-3.8.9s-2.2-.9-3.8-.9Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.8" y="5.2" width="16.4" height="15" rx="2.6" />
      <path d="M3.8 9.8h16.4M8.2 3.2v3.6M15.8 3.2v3.6" />
      <path d="m9.2 15 2 2 3.8-3.8" />
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
