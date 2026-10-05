"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/Icons";
import type { RenderableCase } from "@/lib/cases";
import { galleryFilters, gallerySections, type GalleryImage } from "@/lib/gallery";
import { GalleryCases } from "./GalleryCases";
import { stagger } from "@/lib/motion";

const MORPH_NAME = "gallery-photo";

function imageSizes(count: number, index: number) {
  if (count === 1) return "(max-width: 980px) 100vw, 1140px";
  return index === 0 ? "(max-width: 980px) 100vw, 660px" : "(max-width: 980px) 100vw, 470px";
}

/** Runs `update` inside a view transition where supported; returns null when it ran without one. */
function viewTransition(update: () => void | Promise<void>) {
  if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    void update();
    return null;
  }
  return document.startViewTransition(update);
}

function inViewport(element: Element) {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

function preload(src: string) {
  const image = new window.Image();
  image.src = src;
}

export function GalleryTour({ cases = [] }: { cases?: RenderableCase[] }) {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]["id"]>("all");
  const [open, setOpen] = useState<number | null>(null);
  const [morph, setMorph] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  const sections = gallerySections.filter((section) => filter === "all" || section.category === filter);
  const showCases = (filter === "all" || filter === "cases") && cases.length > 0;
  const frames = useMemo(() => sections.flatMap((section) => section.images), [sections]);

  const show = useCallback((index: number, trigger: HTMLElement) => {
    opener.current = trigger;
    const thumb = trigger.querySelector("img");
    if (thumb) thumb.style.viewTransitionName = MORPH_NAME;
    const transition = viewTransition(async () => {
      if (thumb) thumb.style.viewTransitionName = "";
      flushSync(() => {
        setMorph(true);
        setOpen(index);
      });
      const full = document.querySelector<HTMLImageElement>(".gallery-lightbox img");
      await Promise.race([full?.decode().catch(() => undefined), new Promise((resolve) => setTimeout(resolve, 250))]);
    });
    if (!transition) {
      if (thumb) thumb.style.viewTransitionName = "";
      setMorph(false);
    }
  }, []);

  const close = useCallback(() => {
    const thumb = open == null ? null : document.querySelector<HTMLImageElement>(`[data-frame="${open}"] img`);
    if (morph && thumb && inViewport(thumb)) {
      const transition = viewTransition(() => {
        flushSync(() => setOpen(null));
        thumb.style.viewTransitionName = MORPH_NAME;
      });
      transition?.finished.finally(() => {
        thumb.style.viewTransitionName = "";
      });
    } else {
      setOpen(null);
    }
    opener.current?.focus();
  }, [open, morph]);

  function applyFilter(id: typeof filter) {
    if (id === filter) return;
    viewTransition(() => {
      flushSync(() => {
        setFilter(id);
        setOpen(null);
      });
    });
  }

  useEffect(() => {
    if (open == null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") setOpen((index) => (index == null ? index : (index + 1) % frames.length));
      if (event.key === "ArrowLeft") setOpen((index) => (index == null ? index : (index - 1 + frames.length) % frames.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, frames.length, close]);

  // Warm the neighbouring images so next and previous feel instant.
  useEffect(() => {
    if (open == null || frames.length < 2) return;
    [(open + 1) % frames.length, (open - 1 + frames.length) % frames.length].forEach((index) => preload(frames[index].src));
  }, [open, frames]);

  function goToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (sections.some((section) => section.id === id)) return;
    // The section is hidden by the current filter. Show everything, then scroll to it.
    event.preventDefault();
    setFilter("all");
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const current = open == null ? null : frames[open];

  return (
    <>
      <nav className="gallery-filters" aria-label="Explore the clinic">
        <p>Explore the clinic</p>
        <div role="group" aria-label="Filter photos by area or show patient cases">
          {galleryFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              className={filter === item.id ? "is-active" : undefined}
              onClick={() => applyFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {showCases ? <GalleryCases cases={cases} /> : null}

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`gallery-block gallery-block-${section.category}`}
          aria-labelledby={`${section.id}-heading`}
        >
          <div className="section-inner">
            <p className="eyebrow reveal">{section.eyebrow}</p>
            <h2 id={`${section.id}-heading`} className="reveal" style={stagger(1)}>
              {section.heading}
            </h2>
            <p className="gallery-copy reveal" style={stagger(2)}>
              {section.description}
            </p>
            {section.layout === "named" ? (
              <ul className="gallery-named">
                {section.images.map((image, imageIndex) => {
                  const index = frames.findIndex((frame) => frame.src === image.src);
                  return (
                    <li key={image.src} className="reveal" style={stagger(imageIndex % 3)}>
                      <figure className="gallery-named-item">
                        <button
                          type="button"
                          className="gallery-named-btn"
                          data-frame={index}
                          onClick={(event) => show(index, event.currentTarget)}
                          onPointerEnter={() => preload(image.src)}
                          aria-label={`Open larger view: ${image.caption ?? image.alt}`}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width ?? 1200}
                            height={image.height ?? 900}
                            sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 380px"
                            className="gallery-named-img"
                            style={image.position ? { transformOrigin: image.position } : undefined}
                          />
                          <span className="gallery-item-zoom" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                          </span>
                        </button>
                        <figcaption>
                          <span className="gallery-named-title">{image.caption ?? image.alt}</span>
                          {image.detail ? <span className="gallery-named-detail">{image.detail}</span> : null}
                        </figcaption>
                      </figure>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className={`gallery-layout gallery-layout-${section.images.length}`}>
                {section.images.map((image, imageIndex) => {
                  const index = frames.findIndex((frame) => frame.src === image.src);
                  return (
                    <figure key={image.src} className="gallery-item reveal reveal--scale" style={stagger(imageIndex)}>
                      <button
                        type="button"
                        className="gallery-item-btn"
                        data-frame={index}
                        onClick={(event) => show(index, event.currentTarget)}
                        onPointerEnter={() => preload(image.src)}
                        aria-label={`Open larger view: ${image.alt}`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes={imageSizes(section.images.length, imageIndex)}
                          className="gallery-item-img"
                        />
                        <span className="gallery-item-zoom" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </button>
                      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                    </figure>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="gallery-journey" aria-labelledby="journey-heading">
        <div className="section-inner">
          <p className="eyebrow reveal">Your visit</p>
          <h2 id="journey-heading" className="reveal" style={stagger(1)}>
            See where you&apos;ll be cared for
          </h2>
          <p className="gallery-copy reveal" style={stagger(2)}>
            From the entrance to consultation, treatment and the equipment behind it, the visit stays in the same clinic.
          </p>
          <ol>
            {gallerySections.map((section, index) => (
              <li key={section.id} className="reveal" style={stagger(index)}>
                <a href={`#${section.id}`} onClick={(event) => goToSection(event, section.id)}>
                  <span className="gallery-journey-thumb">
                    <Image
                      src={section.images[0].src}
                      alt=""
                      fill
                      sizes="(max-width: 980px) 100vw, 360px"
                      className="gallery-journey-img"
                    />
                  </span>
                  <span className="gallery-journey-label">
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    {section.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {current ? (
        <Lightbox
          image={current}
          index={open ?? 0}
          total={frames.length}
          morph={morph}
          onClose={close}
          onPrev={() => setOpen((index) => (index == null ? index : (index - 1 + frames.length) % frames.length))}
          onNext={() => setOpen((index) => (index == null ? index : (index + 1) % frames.length))}
        />
      ) : null}
    </>
  );
}

function Lightbox({
  image,
  index,
  total,
  morph,
  onClose,
  onPrev,
  onNext,
}: {
  image: GalleryImage;
  index: number;
  total: number;
  /** Opened with a shared-element view transition, so the image's own entrance animation is skipped. */
  morph: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [touchX, setTouchX] = useState<number | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButton.current?.focus();
  }, []);

  // Keep Tab inside the dialog while it is open.
  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !dialog.current) return;
    const focusable = Array.from(dialog.current.querySelectorAll<HTMLElement>("button:not([disabled])"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      ref={dialog}
      className={`gallery-lightbox${morph ? " is-morph" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${total}: ${image.alt}`}
      onKeyDown={trapFocus}
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest("img, button, figcaption")) onClose();
      }}
      onPointerDown={(event) => setTouchX(event.clientX)}
      onPointerUp={(event) => {
        if (touchX == null) return;
        const delta = event.clientX - touchX;
        if (delta > 50) onPrev();
        if (delta < -50) onNext();
        setTouchX(null);
      }}
    >
      <button ref={closeButton} type="button" className="gallery-lightbox-close" onClick={onClose} aria-label="Close image">
        <CloseIcon />
      </button>
      <button type="button" className="gallery-lightbox-nav gallery-lightbox-prev" onClick={onPrev} aria-label="Previous image">
        <ChevronLeftIcon />
      </button>
      <figure>
        {/* Loaded only when opened. The optimiser is not needed for a single full size view. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={image.src} src={image.src} alt={image.alt} style={{ viewTransitionName: MORPH_NAME }} />
        <figcaption>
          {image.caption ?? image.alt}
          {image.detail ? <span>{image.detail}</span> : null}
          <span>
            {index + 1} / {total}
          </span>
        </figcaption>
      </figure>
      <button type="button" className="gallery-lightbox-nav gallery-lightbox-next" onClick={onNext} aria-label="Next image">
        <ChevronRightIcon />
      </button>
    </div>
  );
}
