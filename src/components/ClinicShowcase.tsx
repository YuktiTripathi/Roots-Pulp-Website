"use client";

import { useEffect, useId, useRef, useState } from "react";
import { showcaseSlides } from "@/lib/clinic";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

const INTERVAL = 5500;

export function ClinicShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionId = useId();
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reduceMotion.current) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % showcaseSlides.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused]);

  function go(next: number) {
    setIndex((next + showcaseSlides.length) % showcaseSlides.length);
  }

  return (
    <section
      className="showcase"
      aria-roledescription="carousel"
      aria-label="Inside Roots & Pulp"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="section-inner showcase-head">
        <p className="eyebrow">Inside the clinic</p>
        <h2 id={regionId}>A closer look at Roots & Pulp</h2>
      </div>
      <div className="showcase-frame">
        <div className="showcase-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {showcaseSlides.map((slide, slideIndex) => (
            <figure
              className="showcase-slide"
              key={slide.caption}
              aria-hidden={slideIndex !== index}
            >
              {slide.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={slide.src} alt={slide.alt} />
              ) : (
                <div className="showcase-placeholder" role="img" aria-label={`${slide.alt}. Photograph to be added.`}>
                  <span>{slide.caption}</span>
                </div>
              )}
              <figcaption>{slide.caption}</figcaption>
            </figure>
          ))}
        </div>
        <button className="showcase-nav is-prev" type="button" aria-controls={regionId} onClick={() => go(index - 1)}>
          <ChevronLeftIcon />
          <span className="sr-only">Previous photograph</span>
        </button>
        <button className="showcase-nav is-next" type="button" onClick={() => go(index + 1)}>
          <ChevronRightIcon />
          <span className="sr-only">Next photograph</span>
        </button>
      </div>
      <div className="showcase-dots" role="tablist" aria-label="Clinic photographs">
        {showcaseSlides.map((slide, slideIndex) => (
          <button
            key={slide.caption}
            type="button"
            role="tab"
            aria-selected={slideIndex === index}
            aria-label={slide.caption}
            className={slideIndex === index ? "is-active" : undefined}
            onClick={() => go(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}
