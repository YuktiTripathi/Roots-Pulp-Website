import Image from "next/image";
import Link from "next/link";
import { googleBusinessProfileUrl } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import { patientReviews, patientVideos } from "@/lib/patientReviews";

export function ReviewsHero({ reviewCount = patientReviews.length }: { reviewCount?: number } = {}) {
  return (
    <section className="reviews-hero" aria-labelledby="reviews-heading">
      <div className="reviews-hero-inner">
        <nav className="crumbs reviews-crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">Reviews</li>
          </ol>
        </nav>
      </div>
      <figure className="reviews-hero-banner">
        <Image
          src="/images/consultation-banner.jpg"
          alt="Consultation at Roots & Pulp Dental Clinic"
          fill
          sizes="100vw"
          priority
          className="reviews-hero-photo"
        />
        <figcaption className="reviews-hero-caption">
          <h1 id="reviews-heading" className="enter">
            What our Patients say Matters Most
          </h1>
        </figcaption>
      </figure>
      <div className="reviews-hero-inner reviews-hero-after">
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
      </div>
    </section>
  );
}
