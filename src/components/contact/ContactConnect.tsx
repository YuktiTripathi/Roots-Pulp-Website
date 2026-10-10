import { clinic, directionsUrl, telHref, whatsappHref } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import { ArrowIcon, PhoneMark, PinMark, WhatsAppMark } from "@/components/Icons";

const cards = [
  {
    title: "Call the clinic",
    detail: clinic.phoneDisplay,
    href: telHref(),
    cta: "Call now",
    icon: PhoneMark,
    external: false,
  },
  {
    title: "WhatsApp",
    detail: clinic.whatsappDisplay,
    href: whatsappHref(),
    cta: "WhatsApp us",
    icon: WhatsAppMark,
    external: true,
  },
  {
    title: "Visit the clinic",
    detail: clinic.addressLine1,
    href: directionsUrl,
    cta: "Get directions",
    icon: PinMark,
    external: true,
  },
] as const;

export function ContactConnect() {
  return (
    <section className="section contact-connect" aria-labelledby="connect-heading">
      <div className="section-inner">
        <div className="section-heading reveal">
          <h2 id="connect-heading" className="line-full">How would you like to connect?</h2>
        </div>
        <ul className="contact-connect-grid">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <li key={card.title} className="reveal" style={stagger(index)}>
                <a
                  className="contact-connect-card"
                  href={card.href}
                  {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="contact-connect-icon">
                    <Icon />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.detail}</p>
                  <span className="text-link">
                    {card.cta} <ArrowIcon className="arrow" />
                    {card.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
