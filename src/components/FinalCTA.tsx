import Link from "next/link";
import { bookingUrl, telHref, whatsappHref } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import { ArrowIcon, PhoneIcon } from "./Icons";

type FinalCTAProps = {
  heading?: string;
  supporting?: string;
  /** Adds a call button between booking and WhatsApp. */
  showCall?: boolean;
  /** Set false to leave out the WhatsApp button. */
  showWhatsApp?: boolean;
  /** Small line under the buttons, e.g. the address. */
  note?: string;
};

export function FinalCTA({
  heading = "Let's take care of your smile",
  supporting = "Book a consultation with Dr. Tripathi, or send us a WhatsApp message with your question.",
  showCall = false,
  showWhatsApp = true,
  note,
}: FinalCTAProps) {
  return (
    <section className="final-cta" aria-labelledby="final-heading">
      <div className="section-inner">
        <h2 id="final-heading" className="reveal">
          {heading}
        </h2>
        <p className="reveal" style={stagger(1)}>
          {supporting}
        </p>
        <div className="hero-actions reveal" style={stagger(2)}>
          <Link className="btn btn-light" href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Book an Appointment <ArrowIcon className="arrow" />
          </Link>
          {showCall ? (
            <a className="btn btn-line" href={telHref()}>
              <PhoneIcon className="call-icon" /> Call
            </a>
          ) : null}
          {showWhatsApp ? (
            <a className="btn btn-line" href={whatsappHref()}>
              WhatsApp Us
            </a>
          ) : null}
        </div>
        {note ? (
          <p className="final-cta-note reveal" style={stagger(3)}>
            {note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
