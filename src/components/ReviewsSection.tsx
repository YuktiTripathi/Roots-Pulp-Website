import Link from "next/link";
import { googleBusinessProfileUrl, googleRatingFallback } from "@/lib/clinic";
import { getGoogleRating } from "@/lib/googleRating";
import { ReviewsGoogleCarousel } from "./reviews/ReviewCarousel";

/**
 * Homepage reviews: every genuine Google review in patientReviews.ts, three at a time, sliding every
 * 9 seconds (the same carousel as the Reviews page). The rating uses live data when it is configured.
 */
export async function ReviewsSection() {
  const live = await getGoogleRating();
  const rating = live ? live.rating.toFixed(1) : process.env.NEXT_PUBLIC_GOOGLE_RATING || googleRatingFallback;

  return (
    <ReviewsGoogleCarousel
      className="home-reviews-section"
      heading="What patients say about Roots & Pulp"
      intro={
        <p className="reviews-rating">
          <span className="reviews-stars" aria-hidden="true">
            ★★★★★
          </span>{" "}
          {rating} Rated on Google
          {live ? <span className="reviews-count">{live.count} reviews</span> : null}
        </p>
      }
      footer={
        <p className="reviews-ctas">
          {googleBusinessProfileUrl ? (
            <a className="text-link" href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer">
              Read all Google Reviews <span aria-hidden="true">→</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          <Link className="text-link" href="/reviews/">
            More patient stories <span aria-hidden="true">→</span>
          </Link>
        </p>
      }
    />
  );
}
