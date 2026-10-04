"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { patientReviews } from "@/lib/patientReviews";

/** Long reviews need time to be read, so autoplay is deliberately unhurried. */
const AUTOPLAY_MS = 9000;

function usePageSize() {
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const tablet = window.matchMedia("(max-width: 980px)");
    const mobile = window.matchMedia("(max-width: 720px)");

    const update = () => {
      if (mobile.matches) setPageSize(1);
      else if (tablet.matches) setPageSize(2);
      else setPageSize(3);
    };

    update();
    tablet.addEventListener("change", update);
    mobile.addEventListener("change", update);
    return () => {
      tablet.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
    };
  }, []);

  return pageSize;
}

export function ReviewsGoogleCarousel({
  heading = "Kind words from our patients",
  intro,
  footer,
  className = "",
}: {
  heading?: string;
  intro?: ReactNode;
  footer?: ReactNode;
  className?: string;
} = {}) {
  const pageSize = usePageSize();
  const groups = useMemo(() => {
    const pages: (typeof patientReviews)[] = [];
    for (let index = 0; index < patientReviews.length; index += pageSize) {
      pages.push(patientReviews.slice(index, index + pageSize));
    }
    return pages;
  }, [pageSize]);

  const [page, setPage] = useState(0);
  const [held, setHeld] = useState(false); // pointer or focus is inside
  const [inView, setInView] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true); // assume yes until measured, so nothing autoplays early
  const [expanded, setExpanded] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    setPage(0);
    setExpanded(0);
  }, [pageSize]);

  const go = useCallback(
    (next: number) => {
      const total = groups.length;
      if (!total) return;
      setPage((next + total) % total);
    },
    [groups.length],
  );

  const onOpenChange = useCallback((open: boolean) => {
    setExpanded((count) => Math.max(0, count + (open ? 1 : -1)));
  }, []);

  const playing = groups.length > 1 && !reduceMotion && inView && !tabHidden && !held && expanded === 0;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setPage((current) => (current + 1) % groups.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [playing, page, groups.length]);

  return (
    <section className={`section reviews-google ${className}`} id="google-reviews" aria-labelledby="google-reviews-heading">
      <div className="section-inner">
        <div className="section-heading reveal">
          <h2 id="google-reviews-heading">{heading}</h2>
          {intro ?? (
            <p className="reviews-italic">
              A glimpse into the experiences shared by the people we&apos;ve had the privilege to care for.
            </p>
          )}
        </div>
        <div
          ref={rootRef}
          className="reviews-carousel reveal"
          role="region"
          aria-roledescription="carousel"
          aria-label="Google reviews"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") go(page - 1);
            if (event.key === "ArrowRight") go(page + 1);
          }}
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={() => setHeld(false)}
          onPointerDown={(event) => {
            touchStart.current = event.clientX;
            setHeld(true);
          }}
          onPointerUp={(event) => {
            if (touchStart.current == null) return;
            const delta = event.clientX - touchStart.current;
            touchStart.current = null;
            if (Math.abs(delta) > 40) go(delta > 0 ? page - 1 : page + 1);
            if (event.pointerType !== "mouse") setHeld(false);
          }}
          onPointerCancel={() => {
            touchStart.current = null;
            setHeld(false);
          }}
        >
          <div className="reviews-carousel-frame" aria-live={playing ? "off" : "polite"}>
            <div className="reviews-carousel-track" style={{ transform: `translateX(-${page * 100}%)` }}>
              {groups.map((group, groupIndex) => {
                const active = groupIndex === page;
                return (
                  <div
                    className={active ? "reviews-carousel-page is-active" : "reviews-carousel-page"}
                    data-count={group.length}
                    key={group.map((item) => item.id).join("-")}
                    aria-hidden={active ? undefined : true}
                    inert={active ? undefined : true}
                  >
                    {group.map((review, index) => (
                      <ReviewCard key={review.id} review={review} index={index} active={active} onOpenChange={onOpenChange} />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="reviews-carousel-nav">
            <button type="button" onClick={() => go(page - 1)} aria-label="Previous reviews" disabled={groups.length < 2}>
              <ChevronLeftIcon />
            </button>
            <div className="reviews-carousel-dots" role="group" aria-label="Review groups">
              {groups.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-current={index === page ? "true" : undefined}
                  aria-label={`Show review group ${index + 1} of ${groups.length}`}
                  className={
                    index === page ? (playing ? "reviews-dot is-active is-playing" : "reviews-dot is-active") : "reviews-dot"
                  }
                  onClick={() => go(index)}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(page + 1)} aria-label="Next reviews" disabled={groups.length < 2}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
        {footer}
      </div>
    </section>
  );
}
