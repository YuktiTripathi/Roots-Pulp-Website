import { bookingUrl, clinic, telHref, whatsappHref } from "@/lib/clinic";
import { CalendarIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

/**
 * Persistent contact actions, rendered once from the root layout.
 * Wide screens: a vertical rail on the right edge whose labels slide out to the left on hover or focus.
 * Narrower screens: a fixed bottom bar with icon and short label.
 * `data-action` gives analytics a stable hook without changing markup.
 */
const actions = [
  {
    action: "whatsapp",
    href: whatsappHref(),
    label: "WhatsApp",
    short: "WhatsApp",
    ariaLabel: "Chat with Roots & Pulp on WhatsApp (opens in a new tab)",
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    action: "call",
    href: telHref(),
    label: "Call Clinic",
    short: "Call",
    ariaLabel: `Call Roots & Pulp Dental Clinic on ${clinic.phoneDisplay}`,
    Icon: PhoneIcon,
    external: false,
  },
  {
    action: "book-appointment",
    href: bookingUrl,
    label: "Book Appointment",
    short: "Book",
    ariaLabel: "Book an appointment at Roots & Pulp (opens in a new tab)",
    Icon: CalendarIcon,
    external: true,
  },
] as const;

export function FloatingContactActions() {
  return (
    <nav className="contact-actions" aria-label="Contact the clinic">
      <ul>
        {actions.map(({ action, href, label, short, ariaLabel, Icon, external }) => (
          <li key={action}>
            <a
              className={`contact-action is-${action}`}
              href={href}
              data-action={action}
              aria-label={ariaLabel}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="contact-action-label" aria-hidden="true">
                <span className="contact-action-long">{label}</span>
                <span className="contact-action-short">{short}</span>
              </span>
              <span className="contact-action-icon" aria-hidden="true">
                <Icon />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
