import { bookingUrl, clinic, instagramUrl, telHref, whatsappHref } from "@/lib/clinic";
import { CalendarIcon, InstagramIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

/**
 * Persistent contact actions, rendered once from the root layout.
 * Wide screens: a vertical rail on the right edge whose labels slide out to the left on hover or focus.
 * Tablets: a floating bar with icon and label; Instagram is an icon only tile at the end.
 * Phones: a bottom bar of four equal columns, icon above a short label.
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
    label: "Call Us",
    short: "Call Us",
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
  {
    action: "instagram",
    href: instagramUrl,
    label: "Instagram",
    short: "Instagram",
    ariaLabel: "Roots & Pulp on Instagram (opens in a new tab)",
    Icon: InstagramIcon,
    external: true,
  },
].filter((item) => item.href);

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
