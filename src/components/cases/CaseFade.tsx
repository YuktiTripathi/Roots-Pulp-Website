"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CaseImage } from "@/lib/cases";

const HOLD_MS = 3200;

type Props = {
  before: CaseImage;
  after: CaseImage;
  caseTitle: string;
  sizes: string;
};

/**
 * The after photo fades in over the before, and back, while the case is on screen.
 * The Before and After buttons switch by hand and stop the automatic fade.
 * With reduced motion there is no automatic fade and the switch is instant.
 */
export function CaseFade({ before, after, caseTitle, sizes }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [showAfter, setShowAfter] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!inView || reduce || manual) return;
    const timer = window.setInterval(() => setShowAfter((value) => !value), HOLD_MS);
    return () => window.clearInterval(timer);
  }, [inView, reduce, manual]);

  const choose = (value: boolean) => {
    setManual(true);
    setShowAfter(value);
  };

  return (
    <div
      ref={frame}
      className={after.height > after.width ? "cases-compare cases-fade cases-compare-portrait" : "cases-compare cases-fade"}
      style={{ aspectRatio: `${after.width} / ${after.height}` }}
    >
      <Image className="cases-fade-img" src={before.src} alt={before.alt} fill sizes={sizes} loading="lazy" />
      <motion.div
        className="cases-fade-layer"
        initial={false}
        animate={{ opacity: showAfter ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 1.1, ease: [0.4, 0, 0.2, 1] }}
        aria-hidden={!showAfter}
      >
        <Image className="cases-fade-img" src={after.src} alt={after.alt} fill sizes={sizes} loading="lazy" />
      </motion.div>
      <div className="cases-fade-switch" role="group" aria-label={`Show before or after: ${caseTitle}`}>
        <button type="button" aria-pressed={!showAfter} onClick={() => choose(false)}>
          Before
        </button>
        <button type="button" aria-pressed={showAfter} onClick={() => choose(true)}>
          After
        </button>
      </div>
    </div>
  );
}
