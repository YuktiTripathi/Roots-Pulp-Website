"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/Icons";
import { galleryFilters, gallerySections, type GalleryImage } from "@/lib/gallery";
import { stagger } from "@/lib/motion";

function imageSizes(count: number, index: number) {
  if (count === 1) return "(max-width: 980px) 100vw, 1140px";
  return index === 0 ? "(max-width: 980px) 100vw, 660px" : "(max-width: 980px) 100vw, 470px";
}

export function GalleryTour() {
  const [filter, setFilter] = useState<(typeof galleryFilters)[number]["id"]>("all");
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const sections = gallerySections.filter((section) => filter === "all" || section.category === filter);
  const frames = useMemo(() => sections.flatMap((section) => section.images), [sections]);

  const show = useCallback((index: number, trigger?: HTMLElement | null) => {
    if (trigger) opener.current = trigger;
    setOpen(index);
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);

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
    [(open + 1) % frames.length, (open - 1 + frames.length) % frames.length].forEach((index) => {
      const preload = new window.Image();
      preload.src = frames[index].src;
    });
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
        <div role="group" aria-label="Filter photos by area">
          {galleryFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              className={filter === item.id ? "is-active" : undefined}
              onClick={() => {
                setFilter(item.id);
                setOpen(null);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

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
            <div className={`gallery-layout gallery-layout-${section.images.length}`}>
              {section.images.map((image, imageIndex) => {
                const index = frames.findIndex((frame) => frame.src === image.src);
                return (
                  <figure key={image.src} className="gallery-item reveal reveal--scale" style={stagger(imageIndex)}>
                    <button
                      type="button"
                      className="gallery-item-btn"
                      onClick={(event) => show(index, event.currentTarget)}
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
            From the entrance to consultation and treatment, the visit stays in the same clinic.
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
  onClose,
  onPrev,
  onNext,
}: {
  image: GalleryImage;
  index: number;
  total: number;
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
      className="gallery-lightbox"
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
        <img key={image.src} src={image.src} alt={image.alt} />
        <figcaption>
          {image.caption ?? image.alt}
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
