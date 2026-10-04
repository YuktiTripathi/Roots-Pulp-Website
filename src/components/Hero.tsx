import Link from "next/link";
import { bookingUrl, clinic, telHref, whatsappHref } from "@/lib/clinic";
import { getGoogleRating } from "@/lib/googleRating";
import { ClinicAtGlance } from "./ClinicAtGlance";
import { HeroCarousel, type HeroSlide } from "./HeroCarousel";
import { OpeningStatus } from "./OpeningStatus";

const eyebrow = "Dental Clinic in Aliganj, Lucknow";

const slides: HeroSlide[] = [
  {
    image: {
      src: "/images/hero/dental-checkup-hero.webp",
      alt: "Dr. Shubham Tripathi examining a patient's teeth in the treatment chair at Roots & Pulp Dental Clinic, Aliganj",
      position: "78% 30%",
      mobilePosition: "70% 35%",
    },
    eyebrow,
    heading: "Dental care that goes deeper than the surface",
    paragraphs: [
      "We take the time to understand what\u2019s really going on and explain it clearly.",
      "So your treatment feels thoughtful, comfortable, and right for you.",
    ],
  },
  {
    image: {
      src: "/images/hero/smiling-patient-hero.webp",
      alt: "A patient smiling at her reflection in a hand mirror in the dental chair",
      position: "80% 35%",
      mobilePosition: "72% 30%",
    },
    eyebrow,
    heading: "There is no bigger success than your Smile",
    paragraphs: [
      "A healthy, confident smile changes how you feel every day.",
      "We help you reach that with thoughtful care and treatment planned around you.",
    ],
  },
];

export async function Hero() {
  const liveRating = await getGoogleRating();
  const manualRating = process.env.NEXT_PUBLIC_GOOGLE_RATING || null;

  return (
    <section className="hero" id="hero" aria-labelledby="home-heading">
      {/* TODO [VERIFY BEFORE PUBLISHING]: consent for the identifiable people in the hero photographs. */}
      <HeroCarousel slides={slides}>
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
      </HeroCarousel>

      {/* TODO [LIVE GOOGLE REVIEWS INTEGRATION REQUIRED]: set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID. Check Google's current terms on caching and attribution. */}
      <ClinicAtGlance liveRating={liveRating} manualRating={manualRating} />
    </section>
  );
}
