import Link from "next/link";
import { bookingUrl, clinic, directionsUrl } from "@/lib/clinic";
import { ArrowIcon } from "@/components/Icons";
import { InnerPageHero } from "@/components/InnerPageHero";
import { OpeningStatus } from "@/components/OpeningStatus";
import { stagger } from "@/lib/motion";

export function ContactHero() {
  return (
    <InnerPageHero
      crumb="Contact"
      titleId="contact-heading"
      title="Let's take care of your smile"
      image="/images/clinic-entrance.jpg"
      imageAlt="Entrance of Roots & Pulp Dental Clinic in Aliganj, Lucknow"
      imagePosition="center 45%"
      overlayStrength="strong"
    >
      <p className="lede line-full enter" style={stagger(1)}>
        Call, send a WhatsApp message, or drop in to book. We&apos;re open seven days a week.
      </p>
      <OpeningStatus className="contact-status enter" />
      <div className="hero-actions enter" style={stagger(2)}>
        <Link className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
          Book an Appointment <ArrowIcon className="arrow" />
        </Link>
      </div>
      <p className="contact-hero-location enter" style={stagger(3)}>
        Sector-Q, {clinic.neighbourhood}, {clinic.locality} ·{" "}
        <a className="text-link" href={directionsUrl} target="_blank" rel="noopener noreferrer">
          Get directions <ArrowIcon className="arrow" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </InnerPageHero>
  );
}
