"use client";

import { useEffect, useRef, useState } from "react";

const glanceItems = [
  { value: "7+", label: "Years of clinical experience", numeric: 7, suffix: "+" },
  { value: "BDS · MPH", label: "Qualifications", numeric: null, suffix: "" },
  { value: "7 Days", label: "Clinic availability", numeric: 7, suffix: " Days" },
  { value: "20606", label: "U.P. State Dental Council registration", numeric: 20606, suffix: "" },
] as const;

function useCountUp(target: number | null, shouldAnimate: boolean) {
  const [count, setCount] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    if (!shouldAnimate || target === null) return;
    const end = target;
    const duration = end > 100 ? 1400 : 800;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    }
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, shouldAnimate]);

  return target === null ? null : count;
}

function GlanceItem({ item, animate }: { item: (typeof glanceItems)[number]; animate: boolean }) {
  const count = useCountUp(item.numeric, animate);
  const shown =
    item.numeric !== null && animate && count !== null ? `${count}${item.suffix}` : item.value;

  return (
    <li>
      <span className="trust-value">{shown}</span>
      <span className="trust-label">{item.label}</span>
    </li>
  );
}

export function ClinicAtGlance() {
  const ref = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimate(true);
      return;
    }

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
  }, []);

  return (
    <section className="trust-strip" aria-label="Clinic at a glance" ref={ref}>
      <ul>
        {glanceItems.map((item) => (
          <GlanceItem key={item.label} item={item} animate={animate} />
        ))}
      </ul>
    </section>
  );
}

export const TrustStrip = ClinicAtGlance;
