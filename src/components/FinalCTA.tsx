import Link from "next/link";
import { bookingUrl, clinic, telHref, whatsappHref } from "@/lib/clinic";

type FinalCTAProps = {
  heading?: string;
  supporting?: string;
  /** Adds a call button between booking and WhatsApp. */
  showCall?: boolean;
  /** Small line under the buttons, e.g. the address. */
  note?: string;
};

export function FinalCTA({
  heading = "Let's take care of your smile",
  supporting = "Book a consultation with Dr. Tripathi, or send us a WhatsApp message with your question.",
  showCall = false,
  note,
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
          {showCall ? (
            <a className="btn btn-line" href={telHref()}>
              Call {clinic.phoneDisplay}
            </a>
          ) : null}
          <a className="btn btn-line" href={whatsappHref()}>
            WhatsApp Us
          </a>
        </div>
        {note ? <p className="final-cta-note">{note}</p> : null}
      </div>
    </section>
  );
}
