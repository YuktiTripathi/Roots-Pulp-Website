"use client";

import { useState } from "react";
import { stagger } from "@/lib/motion";
import { firstVisit } from "@/lib/homeContent";
import { photos } from "@/lib/photos";
import { CrossfadePhoto } from "./CrossfadePhoto";

const STEP_PHOTOS = [photos.waitingArea, photos.planning, photos.mirror] as const;

/** Which photograph accompanies each step: waiting area, planning, then the mirror. */
const STEP_PHOTO_INDEX = [0, 1, 1, 1, 2, 2] as const;
const STEPS = firstVisit.steps.map((step, index) => ({ ...step, photo: STEP_PHOTO_INDEX[index] }));

export function FirstVisitTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  return (
    <section className="section first-visit" aria-labelledby="first-visit-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow reveal">{firstVisit.eyebrow}</p>
          <h2 id="first-visit-heading" className="reveal" style={stagger(1)}>
            {firstVisit.heading}
          </h2>
          <p className="section-intro reveal" style={stagger(2)}>
            {firstVisit.intro}
          </p>
        </div>

        {/* Mobile: every step visible in a plain vertical list. */}
        <ol className="timeline-list">
          {STEPS.map((item, index) => (
            <li key={item.num} className="reveal" style={stagger(index)}>
              <span className="timeline-list-num" aria-hidden="true">
                {item.num}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>

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
