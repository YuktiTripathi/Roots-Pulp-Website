"use client";

import { useState } from "react";
import { googleBusinessProfileUrl, googleReviews } from "@/lib/clinic";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

export function ReviewCarousel({ showHeading = true }: { showHeading?: boolean }) {
  const [index, setIndex] = useState(0);
  const total = googleReviews.length;

  function go(next: number) {
    if (!total) return;
    setIndex((next + total) % total);
  }

  return (
    <section className="section reviews" aria-labelledby={showHeading ? "reviews-heading" : undefined}>
      <div className="section-inner">
        {showHeading ? (
          <div className="section-heading">
            <p className="eyebrow">Patient voices</p>
            <h2 id="reviews-heading">What our patients say</h2>
          </div>
        ) : null}
        {total > 0 ? (
          <div className="review-carousel">
            <blockquote key={`${googleReviews[index].name}-${googleReviews[index].date}`}>
              <p>{googleReviews[index].text}</p>
              <footer>
                {googleReviews[index].name}
                <span>{googleReviews[index].date}</span>
              </footer>
            </blockquote>
            {total > 1 ? (
              <div className="review-nav">
                <button type="button" onClick={() => go(index - 1)} aria-label="Previous review">
                  <ChevronLeftIcon />
                </button>
                <p>
                  {index + 1} / {total}
                </p>
                <button type="button" onClick={() => go(index + 1)} aria-label="Next review">
                  <ChevronRightIcon />
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="review-pending">
            <p className="review-kicker">Google Reviews</p>
            <p>
              Genuine Google reviews will appear here once they are connected. This section does not show sample
              testimonials or a star rating.
            </p>
          </div>
        )}
        {googleBusinessProfileUrl ? (
          <p className="section-more">
            <a className="text-link" href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer">
              Read all reviews on Google
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}

export const ReviewsSection = ReviewCarousel;
