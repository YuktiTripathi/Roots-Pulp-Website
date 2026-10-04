import Link from "next/link";
import { googleBusinessProfileUrl } from "@/lib/clinic";
import { getGooglePlaceRating } from "@/lib/googlePlaces";
import { ReviewsGoogleCarousel } from "./reviews/ReviewCarousel";

/**
 * Homepage reviews: every genuine Google review in patientReviews.ts, three at a time, sliding every
 * 9 seconds (the same carousel as the Reviews page). The rating line appears only with live Google data.
 */
export async function ReviewsSection() {
  const place = await getGooglePlaceRating();
  const reviewsHref = place.googleMapsUri ?? googleBusinessProfileUrl;

  return (
    <ReviewsGoogleCarousel
      className="home-reviews-section"
      heading="What patients say about Roots & Pulp"
      intro={
        place.rating !== null ? (
          <p className="reviews-rating">
            <span className="reviews-stars" aria-hidden="true">
              ★★★★★
            </span>{" "}
            {place.rating.toFixed(1)} on Google
            {place.userRatingCount !== null ? (
              <span className="reviews-count">{place.userRatingCount.toLocaleString("en-IN")} reviews</span>
            ) : null}
          </p>
        ) : (
          <p className="reviews-rating">Google reviews</p>
        )
      }
      footer={
        <p className="reviews-ctas">
          {reviewsHref ? (
            <a className="text-link" href={reviewsHref} target="_blank" rel="noopener noreferrer">
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
