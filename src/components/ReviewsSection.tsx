import { googleBusinessProfileUrl, googleReviews } from "@/lib/clinic";

export function ReviewsSection({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="section reviews" aria-labelledby={showHeading ? "reviews-heading" : undefined}>
      <div className="section-inner">
        {showHeading ? (
          <div className="section-heading">
            <h2 id="reviews-heading">What our patients say</h2>
          </div>
        ) : null}
        {googleReviews.length > 0 ? (
          <ul className="review-grid">
            {googleReviews.map((review) => (
              <li key={`${review.name}-${review.date}`}>
                <blockquote>
                  <p>{review.text}</p>
                  <footer>
                    {review.name}
                    <span>{review.date}</span>
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
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
