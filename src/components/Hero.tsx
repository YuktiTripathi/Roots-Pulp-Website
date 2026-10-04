import Link from "next/link";
import { bookingUrl, clinic, googleBusinessProfileUrl, telHref, whatsappHref } from "@/lib/clinic";
import { getGooglePlaceRating } from "@/lib/googlePlaces";
import { ClinicAtGlance } from "./ClinicAtGlance";
import { HeroCarousel, type HeroSlide } from "./HeroCarousel";
import { OpeningStatus } from "./OpeningStatus";

const eyebrow = "Dental Clinic in Aliganj, Lucknow";

const slides: HeroSlide[] = [
  {
    image: {
      src: "/images/hero/dental-checkup-hero.webp",
      portraitSrc: "/images/hero/dental-checkup-hero-portrait.webp",
      alt: "Dr. Shubham Tripathi examining a patient's teeth in the treatment chair at Roots & Pulp Dental Clinic, Aliganj",
      position: "78% 30%",
      tabletPosition: "70% 30%",
      portraitPosition: "62% 50%",
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
      portraitSrc: "/images/hero/smiling-patient-hero-portrait.webp",
      alt: "A patient smiling at her reflection in a hand mirror in the dental chair",
      position: "80% 35%",
      tabletPosition: "75% 35%",
      portraitPosition: "68% 50%",
    },
    eyebrow,
    heading: "There is no bigger success than your Smile",
    paragraphs: [
      "A healthy, confident smile changes how you feel every day.",
      "We help you reach that with thoughtful care and treatment planned around you.",
    ],
  },
  {
    image: {
      src: "/images/hero/advanced-technology-hero.webp",
      portraitSrc: "/images/hero/advanced-technology-hero-portrait.webp",
      alt: "Dr. Shubham Tripathi explaining a digital dental X-ray to a patient at Roots & Pulp Dental Clinic in Aliganj, Lucknow",
      position: "82% 35%",
      tabletPosition: "100% 35%",
      portraitPosition: "72% 50%",
    },
    eyebrow: "Advanced Dental Care in Aliganj, Lucknow",
    heading: "Advanced dentistry without the premium price tag",
    paragraphs: [
      "Modern diagnostics and treatment techniques help us plan with greater precision, comfort, and clarity.",
      "Thoughtful care, advanced tools, and fair pricing \u2014 all under one roof.",
    ],
  },
];

export async function Hero() {
  // Fetched here, on the server; only the three public values are passed to the trust strip.
  const place = await getGooglePlaceRating();

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
      <ClinicAtGlance place={place} fallbackUrl={googleBusinessProfileUrl} />
    </section>
  );
}
