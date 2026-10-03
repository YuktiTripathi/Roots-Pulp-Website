"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { photos } from "@/lib/photos";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const SLIDES = [
  { photo: photos.explaining, caption: "Talking through your options" },
  { photo: photos.procedure, caption: "Care in progress" },
  { photo: photos.mirror, caption: "Seeing it together" },
  { photo: photos.reviewingSmile, caption: "Seeing the result" },
  { photo: photos.happyPatient, caption: "A reason to smile" },
] as const;

export function ClinicShowcase() {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const node = track.current;
    if (!node) return;
    setEdges({
      start: node.scrollLeft <= 4,
      end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  function step(direction: 1 | -1) {
    const node = track.current;
    const card = node?.querySelector("li");
    if (!node || !card) return;
    const gap = parseFloat(getComputedStyle(node).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <section className="showcase" aria-labelledby="showcase-heading">
      <div className="section-inner showcase-head">
        <div>
          <p className="eyebrow">Inside the clinic</p>
          <h2 id="showcase-heading">A closer look at Roots & Pulp</h2>
        </div>
        <div className="showcase-controls">
          <button className="showcase-nav" type="button" onClick={() => step(-1)} disabled={edges.start} aria-controls="showcase-track">
            <ChevronLeftIcon />
            <span className="sr-only">Previous photographs</span>
          </button>
          <button className="showcase-nav" type="button" onClick={() => step(1)} disabled={edges.end} aria-controls="showcase-track">
            <ChevronRightIcon />
            <span className="sr-only">Next photographs</span>
          </button>
        </div>
      </div>
      <ul
        ref={track}
        id="showcase-track"
        className="showcase-track"
        tabIndex={0}
        aria-label="Clinic photographs, scroll sideways for more"
        onScroll={measure}
      >
        {SLIDES.map(({ photo, caption }) => (
          <li key={photo.src} className="showcase-card">
            <figure>
              <div className="showcase-media">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 680px) 78vw, (max-width: 1100px) 42vw, 360px"
                  style={{ objectPosition: photo.position }}
                />
              </div>
              <figcaption>{caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
