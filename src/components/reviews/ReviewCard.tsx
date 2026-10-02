"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { PatientReview } from "@/lib/patientReviews";

const PREVIEW_LENGTH = 280;
const AVATAR_COLORS = ["#0e4a47", "#102048", "#3d6b8c", "#6b4f7a", "#8a4a4a"];

function Stars({ rating }: { rating: number }) {
  return (
    <p className="review-card-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden="true" style={{ "--s": index } as CSSProperties}>
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </p>
  );
}

function GoogleMark() {
  return (
    <svg className="review-card-google" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.2 2.8-2.5 3.6v3h4c2.4-2.2 3.5-5.4 3.5-8.7Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-4-3c-1.1.8-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.3v3.1C3.3 21.3 7.4 24 12 24Z" />
      <path fill="#FBBC05" d="M5.4 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4V6.5H1.3C.5 8.2 0 10.1 0 12s.5 3.8 1.3 5.5l4.1-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.1 15.2 0 12 0 7.4 0 3.3 2.7 1.3 6.5l4.1 3.1C6.3 6.8 8.9 4.8 12 4.8Z" />
    </svg>
  );
}

function initial(name: string) {
  return (name.trim().charAt(0) || "?").toUpperCase();
}

function avatarColor(name: string) {
  const sum = name.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

type ReviewCardProps = {
  review: PatientReview;
  index?: number;
  /** False while the card sits on a hidden carousel page. Collapses an expanded card. */
  active?: boolean;
  /** Lets the carousel pause autoplay while someone is reading a long review. */
  onOpenChange?: (open: boolean) => void;
};

export function ReviewCard({ review, index = 0, active = true, onOpenChange }: ReviewCardProps) {
  const [open, setOpen] = useState(false);
  const needsMore = review.text.length > PREVIEW_LENGTH;
  const shown = !needsMore || open ? review.text : `${review.text.slice(0, PREVIEW_LENGTH).trimEnd()}…`;

  useEffect(() => {
    if (!active && open) {
      setOpen(false);
      onOpenChange?.(false);
    }
  }, [active, open, onOpenChange]);

  function toggle() {
    const next = !open;
    setOpen(next);
    onOpenChange?.(next);
  }

  return (
    <article
      className="review-card"
      style={{ "--i": index } as CSSProperties}
      aria-label={`${review.source} review by ${review.name}`}
    >
      <header className="review-card-top">
        <span className="review-card-avatar" style={{ background: avatarColor(review.name) }} aria-hidden="true">
          {initial(review.name)}
        </span>
        <div>
          <cite>{review.name}</cite>
          <p>{review.date}</p>
        </div>
        <GoogleMark />
      </header>
      <Stars rating={review.rating} />
      <blockquote>
        <p>{shown}</p>
      </blockquote>
      {needsMore ? (
        <button type="button" className="review-card-more" onClick={toggle} aria-expanded={open}>
          {open ? "Show less" : "Read more"}
        </button>
      ) : null}
    </article>
  );
}
