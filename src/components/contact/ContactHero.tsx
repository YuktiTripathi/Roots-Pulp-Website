import Image from "next/image";
import Link from "next/link";
import { bookingUrl, directionsUrl, telHref, whatsappHref } from "@/lib/clinic";
import { ArrowIcon } from "@/components/Icons";
import { OpeningStatus } from "@/components/OpeningStatus";

export function ContactHero() {
  return (
    <section className="contact-hero" aria-labelledby="contact-heading">
      <div className="contact-hero-inner">
        <nav className="crumbs contact-crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">Contact</li>
          </ol>
        </nav>
        <div className="contact-hero-grid">
          <div className="contact-hero-copy">
            <h1 id="contact-heading">Let&apos;s take care of your smile</h1>
            <p className="lede">
              Call, send a WhatsApp message, or drop in to book. We&apos;re open seven days a week.
            </p>
            <OpeningStatus className="contact-status" />
            <div className="contact-hero-actions">
              <Link className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
                Book an Appointment <ArrowIcon className="arrow" />
              </Link>
              <div className="contact-hero-secondary">
                <a className="btn btn-secondary" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a className="btn btn-secondary" href={telHref()}>
                  Call
                </a>
              </div>
            </div>
            <div className="contact-hero-location">
              <p>Sector-Q, Aliganj, Lucknow</p>
              <a className="text-link" href={directionsUrl} target="_blank" rel="noopener noreferrer">
                Get directions <ArrowIcon className="arrow" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <figure className="contact-hero-visual">
            <div className="contact-hero-frame reveal reveal--mask">
              <Image
                src="/images/clinic-entrance.jpg"
                alt="Entrance of Roots & Pulp Dental Clinic in Aliganj, Lucknow"
                width={1024}
                height={963}
                sizes="(max-width: 980px) 100vw, 560px"
                priority
                className="contact-hero-photo mask-img"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
