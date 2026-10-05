"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CaseImage } from "@/lib/cases";

const START = 50;

type Props = {
  before: CaseImage;
  after: CaseImage;
  caseTitle: string;
  sizes: string;
};

/**
 * Before and after comparison built on a native range input, so mouse, touch and keyboard
 * (Arrow keys, Home, End) all work without a library. Starts at 50, never moves on its own.
 */
export function CaseComparison({ before, after, caseTitle, sizes }: Props) {
  const [position, setPosition] = useState(START);

  // Always start in the middle: a page restored from the back and forward cache keeps its old state.
  useEffect(() => {
    const reset = (event: PageTransitionEvent) => {
      if (event.persisted) setPosition(START);
    };
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  return (
    <div
      className={after.height > after.width ? "cases-compare cases-compare-portrait" : "cases-compare"}
      style={{ aspectRatio: `${after.width} / ${after.height}` }}>
      <Image className="cases-compare-after" src={after.src} alt={after.alt} fill sizes={sizes} loading="lazy" />
      <Image
        className="cases-compare-before"
        src={before.src}
        alt={before.alt}
        fill
        sizes={sizes}
        loading="lazy"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />
      <span className="cases-compare-tag cases-compare-tag-before">Before</span>
      <span className="cases-compare-tag cases-compare-tag-after">After</span>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={position}
        autoComplete="off"
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={`Compare before and after: ${caseTitle}`}
        aria-valuetext={`${position} percent before, ${100 - position} percent after`}
        className="cases-compare-range"
      />
      <span className="cases-compare-handle" style={{ left: `${position}%` }} aria-hidden="true">
        <span className="cases-compare-knob">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </span>
    </div>
  );
}
