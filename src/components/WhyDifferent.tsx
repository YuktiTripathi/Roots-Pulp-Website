import type { ReactNode } from "react";
import { whyDifferent } from "@/lib/homeContent";
import { stagger } from "@/lib/motion";

type IconName = (typeof whyDifferent.items)[number]["icon"];

const icons: Record<IconName, ReactNode> = {
  see: (
    <>
      <path d="M2.8 12s3.4-6 9.2-6 9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  options: (
    <>
      <path d="M5 6.5h14M5 12h14M5 17.5h9" />
    </>
  ),
  wait: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.8V12l2.8 1.8" />
    </>
  ),
  prevent: (
    <>
      <path d="M12 3.6 5.4 6.2v5.3c0 4.1 2.8 7.4 6.6 8.9 3.8-1.5 6.6-4.8 6.6-8.9V6.2Z" />
      <path d="m9.2 12 2 2 3.8-3.8" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.8" y="5.2" width="16.4" height="15" rx="2.6" />
      <path d="M3.8 9.8h16.4M8.2 3.2v3.6M15.8 3.2v3.6" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="7.6" r="3.2" />
      <path d="M6.6 20c.6-3.8 2.7-6 5.4-6s4.8 2.2 5.4 6" />
    </>
  ),
};

/** The only philosophy section on the homepage. */
export function WhyDifferent() {
  return (
    <section className="section why-different" aria-labelledby="why-different-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow reveal">{whyDifferent.eyebrow}</p>
          <h2 id="why-different-heading" className="reveal" style={stagger(1)}>
            {whyDifferent.heading}
          </h2>
          <p className="section-intro reveal" style={stagger(2)}>
            {whyDifferent.intro}
          </p>
        </div>
        <ul className="why-grid" role="list">
          {whyDifferent.items.map((item, index) => (
            <li key={item.title} className="why-card reveal" style={stagger(index)}>
              <span className="why-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">{icons[item.icon]}</svg>
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
