"use client";

import React, { useState, useRef } from "react";

type SliderProps = {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  label?: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  label,
}: SliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setPosition(percentage);
  };

  return (
    <div
      className="ba-slider"
      ref={containerRef}
      style={{ position: "relative", overflow: "hidden", touchAction: "none" }}
      onPointerMove={(e) => {
        if (e.buttons === 1) handleMove(e.clientX);
      }}
      onPointerDown={(e) => handleMove(e.clientX)}
    >
      <img
        className="ba-slider-after"
        src={afterSrc}
        alt={afterAlt}
        style={{ display: "block", width: "100%", height: "auto" }}
        draggable={false}
      />
      
      <img
        className="ba-slider-before"
        src={beforeSrc}
        alt={beforeAlt}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
        draggable={false}
      />
      
      <div
        className="ba-handle"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${position}%`,
          width: "2px",
          backgroundColor: "white",
          cursor: "ew-resize",
          transform: "translateX(-50%)",
        }}
      >
        <div 
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "32px",
            height: "32px",
            backgroundColor: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l6-6-6-6M9 18l-6-6 6-6" />
          </svg>
        </div>
      </div>
      
      {label && <div className="ba-label">{label}</div>}
    </div>
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
