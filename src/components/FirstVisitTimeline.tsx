"use client";

import { useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "Arrival",
    desc: "You\u2019ll be welcomed by our team. A short form about your health and dental concerns.",
  },
  {
    num: "02",
    title: "Consultation",
    desc: "Dr. Tripathi listens first, then examines your teeth and gums, with an X-ray if needed.",
  },
  {
    num: "03",
    title: "Explanation",
    desc: "What he\u2019s found, shown and explained in plain language, so you understand exactly what\u2019s going on.",
  },
  {
    num: "04",
    title: "Your plan",
    desc: "Options, number of visits and a clear cost estimate. There\u2019s no pressure to decide on the day.",
  },
  {
    num: "05",
    title: "Treatment",
    desc: "Carried out gently, with regular check-ins to make sure you\u2019re comfortable.",
  },
  {
    num: "06",
    title: "Follow-up",
    desc: "Aftercare advice and a recommended date for your next visit.",
  },
];

export function FirstVisitTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section first-visit" aria-labelledby="first-visit-heading">
      <div className="section-inner reveal">
        <div className="section-heading">
          <p className="eyebrow">What to expect</p>
          <h2 id="first-visit-heading">Your first visit</h2>
        </div>

        <div className="timeline-container">
          <div className="timeline-track">
            <div className="timeline-line" aria-hidden="true" />
            {STEPS.map((step, index) => (
              <button
                key={step.num}
                type="button"
                className={`timeline-dot ${index === activeStep ? "is-active" : ""}`}
                onClick={() => setActiveStep(index)}
                aria-label={`Step ${step.num}: ${step.title}`}
                aria-current={index === activeStep ? "step" : undefined}
              >
                <span className="timeline-num">{step.num}</span>
                <span className="timeline-dot-title">{step.title}</span>
              </button>
            ))}
          </div>

          <div className="timeline-labels">
            {STEPS.map((step, index) => (
              <button
                key={step.num}
                type="button"
                className={`timeline-label ${index === activeStep ? "is-active" : ""}`}
                onClick={() => setActiveStep(index)}
              >
                {step.title}
              </button>
            ))}
          </div>

          <div className="timeline-panel">
            <p className="timeline-kicker">{STEPS[activeStep].num}</p>
            <h3 className="timeline-title">{STEPS[activeStep].title}</h3>
            <p className="timeline-desc">{STEPS[activeStep].desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
