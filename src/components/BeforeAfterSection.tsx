"use client";

import Image from "next/image";
import { useId, useState } from "react";

type SliderProps = {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  label?: string;
  width?: number;
  height?: number;
};

export function BeforeAfterSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  label,
  width = 1200,
  height = 900,
}: SliderProps) {
  const [position, setPosition] = useState(50);
  const id = useId();

  return (
    <figure className="ba-case">
      <div className="ba-slider" style={{ aspectRatio: `${width} / ${height}` }}>
      <Image
        className="ba-slider-after"
        src={afterSrc}
        alt={afterAlt}
        width={width}
        height={height}
        sizes="(max-width: 900px) 100vw, 720px"
      />
      <Image
        className="ba-slider-before"
        src={beforeSrc}
        alt={beforeAlt}
        width={width}
        height={height}
        sizes="(max-width: 900px) 100vw, 720px"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      />
      <span className="ba-side-label is-before" aria-hidden="true">Before</span>
      <span className="ba-side-label is-after" aria-hidden="true">After</span>
      <label className="sr-only" htmlFor={id}>
        Compare before and after images
      </label>
      <input
        id={id}
        className="ba-range"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-valuetext={`${position}% before image visible`}
      />
      <span className="ba-handle" style={{ left: `${position}%` }} aria-hidden="true">
        <span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l6-6-6-6M9 18l-6-6 6-6" />
          </svg>
        </span>
      </span>
      </div>
      {label ? <figcaption className="ba-label">{label}</figcaption> : null}
    </figure>
  );
}

export function BeforeAfterSection() {
  return (
    <section className="section before-after reveal" aria-labelledby="before-after-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">Treatment cases</p>
          <h2 id="before-after-heading">Before and after, with consent</h2>
        </div>

        <div className="ba-coming-soon">
          <div className="ba-placeholder" aria-hidden="true">
            {/* Two side-by-side placeholder panels representing before/after */}
            <div className="ba-panel">
              <span>Before</span>
            </div>
            <div className="ba-divider" />
            <div className="ba-panel">
              <span>After</span>
            </div>
          </div>
          <p className="ba-message">
            Case studies with patient consent will appear here. Every case shown will be a real patient treated at Roots & Pulp.
          </p>
        </div>
      </div>
    </section>
  );
}
