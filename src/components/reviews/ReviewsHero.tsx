import { InnerPageHero } from "@/components/InnerPageHero";
import { googleBusinessProfileUrl } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import { patientReviews, patientVideos } from "@/lib/patientReviews";

export function ReviewsHero({ reviewCount = patientReviews.length }: { reviewCount?: number } = {}) {
  return (
    <InnerPageHero
      crumb="Reviews"
      titleId="reviews-heading"
      title="What our Patients say Matters Most"
      image="/images/hero/smiling-patient-hero.webp"
      imageAlt="A patient smiling at her reflection in a hand mirror in the dental chair"
      imagePosition="center 88%"
    >
      <p className="lede enter" style={stagger(1)}>
        See what patients have shared about their experience at Roots &amp; Pulp Dental Clinic.
      </p>
      <ul className="reviews-hero-facts enter" style={stagger(2)}>
        <li>
          <strong>{reviewCount}</strong> Google reviews below
        </li>
        {patientVideos.length > 0 ? (
          <li>
            <strong>{patientVideos.length}</strong> patient videos
          </li>
        ) : null}
        <li>Quoted exactly as written</li>
      </ul>
      <div className="hero-actions enter" style={stagger(3)}>
        <a className="btn btn-primary" href="#google-reviews">
          Read Google Reviews
        </a>
        {googleBusinessProfileUrl ? (
          <a className="btn btn-secondary" href={googleBusinessProfileUrl} target="_blank" rel="noopener noreferrer">
            Open on Google
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <a className="btn btn-secondary" href="#patient-videos">
            Watch Patient Stories
          </a>
        )}
      </div>
    </InnerPageHero>
  );
}
