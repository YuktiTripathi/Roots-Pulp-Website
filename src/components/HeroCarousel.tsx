"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

export type HeroSlide = {
  image: { src: string; alt: string; position: string; tabletPosition: string; mobilePosition: string; mobileZoom: number };
  eyebrow: string;
  heading: string;
  paragraphs: readonly string[];
};

/** Slow and calm: long enough to read the heading and supporting copy. */
const INTERVAL = 5000;

/**
 * Two-slide hero that changes on its own every 5 seconds; there are no manual controls.
 * Backgrounds and text crossfade in place, so the layout never moves.
 * It only pauses while the browser tab is hidden. With reduced motion the slides swap without fading.
 * Only the first slide's heading is the page <h1>; the others use the same styling on an <h2>.
 */
export function HeroCarousel({ slides, children }: { slides: readonly HeroSlide[]; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const total = slides.length;

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (hidden || total < 2) return;
    const id = window.setTimeout(() => setIndex((value) => (value + 1) % total), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, hidden, total]);

  return (
    <div
      className="hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Welcome to Roots & Pulp"
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
            style={{ "--pos": slide.image.position, "--pos-tablet": slide.image.tabletPosition, "--pos-mobile": slide.image.mobilePosition, "--zoom-mobile": slide.image.mobileZoom } as CSSProperties}
          />
        ))}
      </div>

      <div className="hero-copy">
        <div className="hero-slides" aria-live="off">
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
