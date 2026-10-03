"use client";

import { useState } from "react";
import { stagger } from "@/lib/motion";
import { photos } from "@/lib/photos";
import { CrossfadePhoto } from "./CrossfadePhoto";

const STEP_PHOTOS = [photos.waitingArea, photos.planning, photos.mirror] as const;

const STEPS = [
  {
    num: "01",
    title: "Arrival",
    desc: "You\u2019ll be welcomed by our team. A short form about your health and dental concerns.",
    photo: 0,
  },
  {
    num: "02",
    title: "Consultation",
    desc: "Dr. Tripathi listens first, then examines your teeth and gums, with an X-ray if needed.",
    photo: 1,
  },
  {
    num: "03",
    title: "Explanation",
    desc: "What he\u2019s found, shown and explained in plain language, so you understand exactly what\u2019s going on.",
    photo: 1,
  },
  {
    num: "04",
    title: "Your plan",
    desc: "Options, number of visits and a clear cost estimate. There\u2019s no pressure to decide on the day.",
    photo: 1,
  },
  {
    num: "05",
    title: "Treatment",
    desc: "Carried out gently, with regular check-ins to make sure you\u2019re comfortable.",
    photo: 2,
  },
  {
    num: "06",
    title: "Follow-up",
    desc: "Aftercare advice and a recommended date for your next visit.",
    photo: 2,
  },
];

export function FirstVisitTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  return (
    <section className="section first-visit" aria-labelledby="first-visit-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow reveal">What to expect</p>
          <h2 id="first-visit-heading" className="reveal" style={stagger(1)}>
            Your first visit
          </h2>
        </div>

        <div className="timeline-container reveal" style={stagger(2)}>
          <ol className="timeline-track">
            {STEPS.map((item, index) => (
              <li key={item.num}>
                <button
                  type="button"
                  className={`timeline-dot${index === activeStep ? " is-active" : ""}`}
                  onClick={() => setActiveStep(index)}
                  aria-current={index === activeStep ? "step" : undefined}
                  aria-controls="first-visit-panel"
                >
                  <span className="timeline-num">{item.num}</span>
                  <span className="timeline-dot-title">{item.title}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="timeline-stage">
            <div key={step.num} className="timeline-panel swap" id="first-visit-panel" aria-live="polite">
              <p className="timeline-kicker">{step.num}</p>
              <h3 className="timeline-title">{step.title}</h3>
              <p className="timeline-desc">{step.desc}</p>
            </div>
            <CrossfadePhoto
              photos={STEP_PHOTOS}
              active={step.photo}
              sizes="(max-width: 860px) 100vw, 520px"
              className="timeline-photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
