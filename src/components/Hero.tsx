import Image from "next/image";
import Link from "next/link";
import { bookingUrl, clinic, doctor, telHref, whatsappHref } from "@/lib/clinic";
import { OpeningStatus } from "./OpeningStatus";

export function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="home-heading">
      <div className="hero-copy">
        <p className="eyebrow">Dental clinic in Aliganj, Lucknow</p>
        <h1 id="home-heading">Dental care that goes deeper than the surface</h1>
        <p className="lede">
          Careful diagnosis, clear explanations and gentle treatment for the whole family, from Dr. Shubham
          Tripathi and the team at Roots & Pulp.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Book an Appointment
          </Link>
          <a className="btn btn-secondary" href={telHref()}>
            Call {clinic.phoneDisplay}
          </a>
          <a className="btn btn-tertiary" href={whatsappHref()}>
            WhatsApp Us
          </a>
        </div>
        <OpeningStatus suffix={clinic.streetAddress} />
      </div>
      <div className="hero-visual">
        <div className="hero-rings" aria-hidden="true">
          <span />
          <span />
        </div>
        <svg className="hero-tooth" viewBox="0 0 220 280" aria-hidden="true">
          <path
            d="M110 18c36 0 62 26 70 66 10 52-4 78-8 98l-18 72c-8 24-24 38-44 38s-36-14-44-38l-18-72c-4-20-18-46-8-98C48 44 74 18 110 18Z"
            fill="none"
            stroke="currentColor"
          />
        </svg>
        <Image
          src={doctor.portrait}
          alt={doctor.heroAlt}
          width={doctor.portraitWidth}
          height={doctor.portraitHeight}
          priority
          unoptimized
          className="hero-portrait"
        />
        <aside className="credential-card">
          <p>BDS · MPH</p>
          <p>Founder & Director</p>
          <p>Roots & Pulp Dental Clinic</p>
        </aside>
        <aside className="location-card">
          <p>
            {clinic.neighbourhood}, {clinic.locality}
          </p>
          <p>{clinic.addressLine1}</p>
        </aside>
      </div>
    </section>
  );
}
