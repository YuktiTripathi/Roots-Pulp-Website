import { clinic } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import { ContactMap } from "@/components/contact/ContactMap";
import { OpeningStatus } from "@/components/OpeningStatus";
import { openingHoursDisplay } from "@/lib/openingHours";

export function PlanVisit() {
  return (
    <section className="section contact-plan" aria-labelledby="plan-heading">
      <div className="section-inner">
        <div className="section-heading reveal">
          <h2 id="plan-heading">Plan your visit</h2>
        </div>
        <div className="contact-plan-grid">
          <div className="contact-plan-card reveal" style={stagger(0)}>
            <p className="contact-kicker">Address</p>
            <p className="visit-name">{clinic.name}</p>
            <address>
              {clinic.addressLine1}
              <br />
              Aliganj
              <br />
              {clinic.locality}, {clinic.region} {clinic.postalCode}
            </address>
            <p className="landmark">{clinic.landmark}</p>
          </div>
          <div className="contact-plan-card reveal" style={stagger(1)}>
            <p className="contact-kicker">Opening hours</p>
            <OpeningStatus className="contact-status contact-hours-status" />
            <dl className="hours">
              {openingHoursDisplay.map((row) => (
                <div key={row.days}>
                  <dt>{row.days}</dt>
                  <dd>{row.hours}</dd>
                </div>
              ))}
            </dl>
            <p className="contact-hours-note">
              Hours may change on public holidays and festivals. Please call ahead.
            </p>
          </div>
        </div>
        <div className="reveal reveal--scale" style={stagger(2)}>
          <ContactMap />
        </div>
      </div>
    </section>
  );
}
