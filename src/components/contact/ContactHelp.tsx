import { ContactEnquiryForm } from "@/components/contact/ContactEnquiryForm";

export function ContactHelp() {
  return (
    <section className="section contact-help" aria-labelledby="help-heading">
      <div className="section-inner contact-help-layout">
        <div className="contact-help-copy">
          <h2 id="help-heading">Not sure where to start?</h2>
          <p>You don&apos;t need to know which treatment you need before contacting us.</p>
        </div>
        <ContactEnquiryForm />
      </div>
    </section>
  );
}
