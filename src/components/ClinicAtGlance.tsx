"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { googleBusinessProfileUrl } from "@/lib/clinic";
import type { GoogleRating } from "@/lib/googleRating";

// TODO [VERIFY BEFORE PUBLISHING]: 2,500+ Happy Patients against clinic records.
const PATIENTS = 2500;

/**
 * Counts from 0 to target once `run` is true. Until `armed`, it shows the final value, which is what
 * the server renders and what reduced-motion users keep.
 */
function useCountUp(target: number, armed: boolean, run: boolean, duration = 1200) {
  const [count, setCount] = useState(target);
  const frame = useRef(0);

  useLayoutEffect(() => {
    if (armed && !run) setCount(0);
  }, [armed, run]);

  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    }
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, run, duration]);

  return count;
}

const icons: Record<"people" | "star" | "calendar", ReactNode> = {
  people: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.6 14.2c2.4-.3 4.3 1.2 4.9 4.3" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3.6 2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-3.9 5.6-.8Z" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.8" y="5.2" width="16.4" height="15" rx="2.6" />
      <path d="M3.8 9.8h16.4M8.2 3.2v3.6M15.8 3.2v3.6" />
    </svg>
  ),
};

export function ClinicAtGlance({
  liveRating = null,
  manualRating = null,
}: {
  liveRating?: GoogleRating;
  manualRating?: string | null;
}) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    // Reduced motion: keep the final value, nothing animates.
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setArmed(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [armed]);

  const patients = useCountUp(PATIENTS, armed, animate);

  // TODO [VERIFY BEFORE PUBLISHING]: the Google rating figure against the live profile.
  const ratingValue = liveRating ? `${liveRating.rating.toFixed(1)} ★` : manualRating ? `${manualRating} ★` : "★";
  const ratingLabel = liveRating || manualRating ? "Google Rating" : "Read our Google reviews";

  const ratingBody = (
    <>
      <span className="trust-icon">{icons.star}</span>
      <span className="trust-value">{ratingValue}</span>
      <span className="trust-label">{ratingLabel}</span>
      {liveRating ? <span className="trust-meta">{liveRating.count} reviews</span> : null}
      {liveRating || manualRating ? (
        <span className="trust-more" aria-hidden="true">
          Read Google Reviews →
        </span>
      ) : null}
    </>
  );

  return (
    <section className="trust-strip" aria-label="Clinic highlights" ref={ref}>
      <ul>
        <li>
          <span className="trust-icon">{icons.people}</span>
          <span className="trust-value">{patients.toLocaleString("en-IN")}+</span>
          <span className="trust-label">Happy Patients</span>
        </li>
        <li className="trust-rating">
          {googleBusinessProfileUrl ? (
            <a
              className="trust-link"
              href={googleBusinessProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read Roots & Pulp Google reviews (opens in a new tab)"
            >
              {ratingBody}
            </a>
          ) : (
            <div className="trust-link">{ratingBody}</div>
          )}
        </li>
        <li>
          <span className="trust-icon">{icons.calendar}</span>
          <span className="trust-value">Open 7 Days</span>
          <span className="trust-label">Monday to Sunday</span>
        </li>
      </ul>
    </section>
  );
}

export const TrustStrip = ClinicAtGlance;
