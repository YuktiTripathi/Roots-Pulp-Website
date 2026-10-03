import Link from "next/link";
import { googleBusinessProfileUrl } from "@/lib/clinic";
import { getGoogleRating } from "@/lib/googleRating";
import { homeReviewIds } from "@/lib/homeContent";
import { patientReviews } from "@/lib/patientReviews";
import { stagger } from "@/lib/motion";

/**
 * Three genuine Google reviews, quoted exactly as stored. Long quotes are clamped with CSS only,
 * never cut in the text, and link to the full review on /reviews/.
 * The rating line uses the same live data as the hero trust strip; without it, no number is shown.
 */
export async function ReviewsSection() {
  const rating = await getGoogleRating();
  const reviews = homeReviewIds.flatMap((id) => patientReviews.filter((review) => review.id === id));

  return (
    <section className="section reviews" aria-labelledby="reviews-heading">
      <div className="section-inner">
        <div className="section-heading">
          <h2 id="reviews-heading" className="reveal">
            What patients say about Roots &amp; Pulp
          </h2>
          {rating ? (
            <p className="reviews-rating reveal" style={stagger(1)}>
              <span className="reviews-stars" aria-hidden="true">
                ★★★★★
              </span>{" "}
              {rating.rating.toFixed(1)} on Google <span className="reviews-count">{rating.count} reviews</span>
            </p>
          ) : (
            <p className="reviews-rating reveal" style={stagger(1)}>
              Google reviews
            </p>
          )}
        </div>
        <ul className="home-reviews" role="list" tabIndex={0} aria-label="Patient reviews">
          {reviews.map((review, index) => (
            <li key={review.id} className="home-review reveal" style={stagger(index)}>
              <p className="home-review-stars" aria-label="5 out of 5 stars">
                <span aria-hidden="true">★★★★★</span>
              </p>
              <blockquote>
                <p>{review.text}</p>
              </blockquote>
              <footer>
                <span className="home-review-name">{review.name}</span>
                <span className="home-review-meta">
                  {review.date} · Google
                </span>
                <Link className="home-review-more" href="/reviews/">
                  Read the full review <span className="sr-only">by {review.name}</span>
                </Link>
              </footer>
            </li>
          ))}
        </ul>
        <p className="reviews-ctas reveal">
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
      </div>
    </section>
  );
}
