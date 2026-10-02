import Link from "next/link";

const guides = [
  {
    title: "Root Canal Treatment",
    teaser: "What happens during a root canal, what to expect, and how to care for your tooth afterwards.",
    href: "/treatments/root-canal-treatment/",
  },
  {
    title: "Dental Implants",
    teaser: "A step-by-step look at dental implant treatment, from consultation to final crown.",
    href: "/treatments/dental-implants/",
  },
  {
    title: "Teeth Cleaning",
    teaser: "Why professional cleaning matters, what it involves, and how often you should go.",
    href: "/treatments/teeth-cleaning/",
  },
  {
    title: "Children's Dental Care",
    teaser: "When to start, what to expect at a first visit, and how to build good habits early.",
    href: "/treatments/childrens-dentistry/",
  },
]

export function DentalGuideCards() {
  return (
    <section className="section guides" aria-labelledby="guides-heading">
      <div className="section-inner reveal">
        <div className="section-heading">
          <p className="eyebrow">Dental guides</p>
          <h2 id="guides-heading">Understand your dental care</h2>
        </div>
        <div className="guide-grid">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="guide-card">
              <h3>{guide.title}</h3>
              <p>{guide.teaser}</p>
              <span className="text-link">Read more <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
        <p className="guide-note">
          Each treatment page explains what to expect, aftercare and common questions.{" "}
          <Link className="text-link" href="/treatments/">
            See all treatments <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
