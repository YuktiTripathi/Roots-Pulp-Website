"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CaseImage, RenderableCase } from "@/lib/cases";
import { stagger } from "@/lib/motion";

/** How long each photograph is held, and how long the crossfade takes. */
const HOLD_MS = 3000;
const FADE_S = 0.9;
/** Each card starts a little later than the one before, so the grid never switches all at once. */
const OFFSET_MS = 400;

const SIZES = "(max-width: 640px) 100vw, (max-width: 980px) 50vw, 370px";

export const galleryCasesCopy = {
  eyebrow: "Patient cases",
  heading: "See the Difference Roots & Pulp Makes",
  intro:
    "A selection of real cases treated at Roots & Pulp, showing how thoughtful treatment can improve function, comfort and appearance.",
  note: "Every case is different. Treatment recommendations and outcomes depend on individual examination and needs.",
};

function Photo({ image, className }: { image: CaseImage; className?: string }) {
  return (
    <Image
      className={className}
      src={image.src}
      alt={image.alt}
      fill
      sizes={SIZES}
      loading="lazy"
      style={image.position ? { objectPosition: image.position } : undefined}
    />
  );
}

function GalleryCaseCard({ item, index }: { item: RenderableCase; index: number }) {
  const reduce = useReducedMotion();
  const [showAfter, setShowAfter] = useState(false);

  // Before first, then After, then Before again, every HOLD_MS, starting at a per card offset.
  useEffect(() => {
    if (reduce) return;
    let interval = 0;
    const start = window.setTimeout(() => {
      setShowAfter(true);
      interval = window.setInterval(() => setShowAfter((value) => !value), HOLD_MS);
    }, HOLD_MS + ((index * OFFSET_MS) % HOLD_MS));
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [reduce, index]);

  if (!item.before || !item.after) return null;
  // Reduced motion: no automatic switching. The after photo shows, with a plain button to compare.
  const after = reduce ? showAfter === false : showAfter;

  return (
    <li className="gallery-case zoom reveal" style={stagger(index % 3)}>
      <div className="gallery-case-frame zoom-media">
        <Photo image={item.before} className="gallery-case-img" />
        <motion.div
          className="gallery-case-layer"
          initial={false}
          animate={{ opacity: after ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : FADE_S, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden={!after}
        >
          <Photo image={item.after} className="gallery-case-img" />
        </motion.div>
      </div>
      <div className="gallery-case-body">
        <p className="gallery-case-meta">
          <span>{item.concern}</span>
          {/* A quiet state hint, outside the photograph. Not announced, so it does not chatter every few seconds. */}
          <span className="gallery-case-state" aria-hidden="true">
            <span className={after ? undefined : "is-current"}>Before</span>
            <span className={after ? "is-current" : undefined}>After</span>
          </span>
        </p>
        <h3>{item.title}</h3>
        <p className="gallery-case-summary">{item.summary}</p>
        <div className="gallery-case-actions">
          <Link className="gallery-case-link" href={item.link.href}>
            {item.link.label} <span aria-hidden="true">→</span>
          </Link>
          {reduce ? (
            <button type="button" className="gallery-case-toggle" onClick={() => setShowAfter((value) => !value)}>
              {after ? "Show before" : "Show after"}
              <span className="sr-only">: {item.title}</span>
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
}

/** Patient cases in the Gallery: one fixed 4:3 frame per case, crossfading between Before and After. */
export function GalleryCases({ cases }: { cases: RenderableCase[] }) {
  if (!cases.length) return null;

  return (
    <section id="patient-cases" className="gallery-block gallery-block-cases" aria-labelledby="patient-cases-heading">
      <div className="section-inner">
        <p className="eyebrow reveal">{galleryCasesCopy.eyebrow}</p>
        <h2 id="patient-cases-heading" className="reveal" style={stagger(1)}>
          {galleryCasesCopy.heading}
        </h2>
        <p className="gallery-copy reveal" style={stagger(2)}>
          {galleryCasesCopy.intro}
        </p>
        <ul className="gallery-cases" role="list">
          {cases.map((item, index) => (
            <GalleryCaseCard key={item.id} item={item} index={index} />
          ))}
        </ul>
        <p className="gallery-cases-note">{galleryCasesCopy.note}</p>
      </div>
    </section>
  );
}
