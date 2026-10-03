import Image from "next/image";
import Link from "next/link";
import { bookingUrl, clinic, telHref, whatsappHref } from "@/lib/clinic";
import { getGoogleRating } from "@/lib/googleRating";
import { ClinicAtGlance } from "./ClinicAtGlance";
import { OpeningStatus } from "./OpeningStatus";

export async function Hero() {
  const liveRating = await getGoogleRating();
  const manualRating = process.env.NEXT_PUBLIC_GOOGLE_RATING || null;

  return (
    <section className="hero" id="hero" aria-labelledby="home-heading">
      <div className="hero-copy">
        <p className="eyebrow">Dental Clinic in Aliganj, Lucknow</p>
        <h1 id="home-heading">Dental care that goes deeper than the surface.</h1>
        <p className="lede">
          Dr. Shubham Tripathi examines carefully, explains what he finds in plain language, and plans treatment
          around you. Family dental care in Sector Q, Aliganj, open seven days.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Book an Appointment
          </Link>
          <a className="btn btn-secondary" href={whatsappHref()}>
            WhatsApp Us
          </a>
        </div>
        <a className="text-link hero-call" href={telHref()} aria-label="Call Roots & Pulp Dental Clinic">
          Call the clinic
        </a>
        <OpeningStatus suffix={clinic.streetAddress} />
      </div>

      <div className="hero-visual">
        {/* TODO [NEW PHOTO REQUIRED]: wide daylight photo of the consultation space, 1600px or wider. */}
        {/* TODO [VERIFY BEFORE PUBLISHING]: patient consent for the identifiable patient in this photo. */}
        <figure className="hero-card">
          <Image
            src="/images/consultation-banner.jpg"
            alt="Dr. Shubham Tripathi talking with a patient at the consultation desk at Roots & Pulp Dental Clinic, Aliganj"
            width={768}
            height={1024}
            priority
            sizes="(max-width: 980px) 100vw, 520px"
            className="hero-card-img"
          />
          <figcaption className="hero-chip">
            <span>Dr. Shubham Tripathi</span>
            <span>Founder &amp; Director</span>
          </figcaption>
        </figure>
      </div>

      {/* TODO [LIVE GOOGLE REVIEWS INTEGRATION REQUIRED]: set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID. Check Google's current terms on caching and attribution. */}
      <ClinicAtGlance liveRating={liveRating} manualRating={manualRating} />
    </section>
  );
}
