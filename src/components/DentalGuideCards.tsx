import Link from "next/link";
import { stagger } from "@/lib/motion";
import { ArrowIcon } from "./Icons";

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
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow reveal">Dental guides</p>
          <h2 id="guides-heading" className="reveal" style={stagger(1)}>Understand your dental care</h2>
        </div>
        <div className="guide-grid">
          {guides.map((guide, index) => (
            <div key={guide.href} className="reveal" style={stagger(index + 1)}>
              <Link href={guide.href} className="guide-card lift">
                <h3>{guide.title}</h3>
                <p>{guide.teaser}</p>
                <span className="text-link" aria-hidden="true">
                  Read more <ArrowIcon className="arrow" />
                </span>
              </Link>
            </div>
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
