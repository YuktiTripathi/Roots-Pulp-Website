"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

export type HeroSlide = {
  image: { src: string; alt: string; position: string; mobilePosition: string };
  eyebrow: string;
  heading: string;
  paragraphs: readonly string[];
};

/** Slow and calm: long enough to read the heading and supporting copy. */
const INTERVAL = 8000;

/**
 * Two-slide hero that changes on its own every 8 seconds; there are no manual controls.
 * Backgrounds and text crossfade in place, so the layout never moves.
 * Autoplay pauses on hover, on keyboard focus and while the tab is hidden, and is off for reduced motion.
 * Only the first slide's heading is the page <h1>; the others use the same styling on an <h2>.
 */
export function HeroCarousel({ slides, children }: { slides: readonly HeroSlide[]; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const total = slides.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (reduced || hovered || focused || hidden || total < 2) return;
    const id = window.setTimeout(() => setIndex((value) => (value + 1) % total), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, reduced, hovered, focused, hidden, total]);

  return (
    <div
      className="hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Welcome to Roots & Pulp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="hero-bg">
        {slides.map((slide, slideIndex) => (
          <Image
            key={slide.image.src}
            src={slide.image.src}
            alt={slideIndex === index ? slide.image.alt : ""}
            fill
            priority={slideIndex === 0}
            sizes="100vw"
            className={`hero-bg-img${slideIndex === index ? " is-active" : ""}`}
            style={{ "--pos": slide.image.position, "--pos-mobile": slide.image.mobilePosition } as CSSProperties}
          />
        ))}
      </div>

      <div className="hero-copy">
        <div className="hero-slides" aria-live={hovered || focused || reduced ? "polite" : "off"}>
          {slides.map((slide, slideIndex) => {
            const active = slideIndex === index;
            const Heading = slideIndex === 0 ? "h1" : "h2";
            return (
              <div
                key={slide.heading}
                className={`hero-slide${active ? " is-active" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} of ${total}`}
                aria-hidden={!active}
                inert={!active}
              >
                <p className="eyebrow">{slide.eyebrow}</p>
                <Heading id={slideIndex === 0 ? "home-heading" : undefined} className="hero-title">
                  {slide.heading}
                </Heading>
                {slide.paragraphs.length ? (
                  <div className="lede">
                    {slide.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {children}

      </div>
    </div>
  );
}
