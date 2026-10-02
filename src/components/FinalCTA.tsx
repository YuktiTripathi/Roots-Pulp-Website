import Link from "next/link";
import { bookingUrl, whatsappHref } from "@/lib/clinic";

type FinalCTAProps = {
  heading?: string;
  supporting?: string;
};

export function FinalCTA({
  heading = "Let's take care of your smile",
  supporting = "Book a consultation with Dr. Tripathi, or send us a WhatsApp message with your question.",
}: FinalCTAProps) {
  return (
    <section className="final-cta" aria-labelledby="final-heading">
      <div className="section-inner">
        <h2 id="final-heading">{heading}</h2>
        <p>{supporting}</p>
        <div className="hero-actions">
          <Link className="btn btn-light" href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Book an Appointment
          </Link>
          <a className="btn btn-line" href={whatsappHref()}>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
