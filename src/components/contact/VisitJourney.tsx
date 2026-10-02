import { stagger } from "@/lib/motion";

const steps = [
  { num: "01", title: "Choose how to reach us" },
  { num: "02", title: "Tell us what you need" },
  { num: "03", title: "Choose a convenient time" },
  { num: "04", title: "Visit Roots & Pulp" },
] as const;

export function VisitJourney() {
  return (
    <section className="section contact-journey" aria-labelledby="journey-heading">
      <div className="section-inner">
        <div className="section-heading reveal">
          <h2 id="journey-heading">Your visit, made simple</h2>
        </div>
        <ol className="contact-journey-grid reveal">
          {steps.map((step, index) => (
            <li key={step.num} className="contact-journey-card reveal" style={stagger(index)}>
              <p className="contact-journey-num" aria-hidden="true">
                {step.num}
              </p>
              <h3>{step.title}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
