import Link from "next/link";
import { bookingUrl, clinic, directionsUrl, instagramUrl, telHref, treatmentHref, treatments, whatsappHref } from "@/lib/clinic";
import { Logo } from "./Logo";
import { openingHoursShort } from "@/lib/openingHours";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Logo variant="footer" />
          <address className="footer-address">
            {clinic.name}
            <br />
            {clinic.streetAddress}
            <br />
            {clinic.locality}, {clinic.region} {clinic.postalCode}
            <br />
            {clinic.landmark}
          </address>
        </div>
        <div>
          <p className="footer-title">Visit</p>
          <ul>
            {openingHoursShort.map((line) => (
              <li key={line}>{line}</li>
            ))}
            <li>
              <a href={telHref()}>Call {clinic.phoneDisplay}</a>
            </li>
            <li>
              <a href={whatsappHref()}>WhatsApp {clinic.whatsappDisplay}</a>
            </li>
            <li>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                Get directions
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Treatments</p>
          <ul>
            {treatments.map((item) => (
              <li key={item.slug}>
                <Link href={treatmentHref(item.slug)}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Clinic</p>
          <ul>
            <li>
              <Link href="/about/">About</Link>
            </li>
            <li>
              <Link href="/doctor/dr-shubham-tripathi/">Dr. Shubham Tripathi</Link>
            </li>
            <li>
              <Link href="/reviews/">Reviews</Link>
            </li>
            <li>
              <Link href="/faq/">FAQ</Link>
            </li>
            <li>
              <Link href="/contact/">Contact</Link>
            </li>
            <li>
              <Link href={bookingUrl} target="_blank" rel="noopener noreferrer">Book an Appointment</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Roots & Pulp Dental Clinic</p>
        <nav aria-label="Legal">
          <Link href="/privacy-policy/">Privacy Policy</Link>
          <Link href="/terms/">Terms & Conditions</Link>
          <Link href="/medical-disclaimer/">Medical Disclaimer</Link>
          {instagramUrl ? (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              Instagram
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </nav>
      </div>
      <p className="footer-disclaimer">{clinic.disclaimer}</p>
    </footer>
  );
}
