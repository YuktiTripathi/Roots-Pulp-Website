import Link from "next/link";

const guides = [
  {
    title: "Root Canal Treatment",
    teaser: "What happens during a root canal, what to expect, and how to care for your tooth afterwards.",
    href: "/guides/root-canal-treatment/",
  },
  {
    title: "Dental Implants",
    teaser: "A step-by-step look at dental implant treatment, from consultation to final crown.",
    href: "/guides/dental-implants/",
  },
  {
    title: "Teeth Cleaning",
    teaser: "Why professional cleaning matters, what it involves, and how often you should go.",
    href: "/guides/teeth-cleaning/",
  },
  {
    title: "Children's Dental Care",
    teaser: "When to start, what to expect at each age, and how to build good habits early.",
    href: "/guides/childrens-dental-care/",
  },
  {
    title: "Tooth Sensitivity",
    teaser: "Common causes of sensitivity, when to see a dentist, and what can be done about it.",
    href: "/guides/tooth-sensitivity/",
  },
];

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
              <span className="text-link">Read guide <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
        <p className="guide-note">Guides are being written by Dr. Tripathi and will be published individually.</p>
      </div>
    </section>
  );
}
