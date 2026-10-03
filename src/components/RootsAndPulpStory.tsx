import { stagger } from "@/lib/motion";
import Link from "next/link";
import { InteractivePrinciples } from "./InteractivePrinciples";

export function RootsAndPulpStory() {
  return (
    <section className="section story" aria-labelledby="story-heading">
      <div className="section-inner story-grid">
        <div className="story-art reveal reveal--scale" aria-hidden="true">
          <svg viewBox="0 0 420 520">
            <circle cx="210" cy="230" r="168" fill="none" stroke="#102048" strokeOpacity="0.16" />
            <circle cx="210" cy="230" r="128" fill="none" stroke="#0e4a47" strokeOpacity="0.28" />
            <path
              d="M210 78c52 0 86 36 96 92 14 78-8 112-14 150l-28 112c-10 36-34 58-54 58s-44-22-54-58l-28-112c-6-38-28-72-14-150 10-56 44-92 96-92Z"
              fill="#102048"
            />
            <path
              d="M210 168c28 18 28 18 0 40-28-22-28-22 0-40Z"
              fill="#a81820"
            />
            <path d="M186 210c6 48 8 90 4 140M210 200v160M234 210c-6 48-8 90-4 140" stroke="#e7f2f0" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M168 430c18 28 42 42 42 42s24-14 42-42" stroke="#0e4a47" strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
          <p className="story-label">Enamel, pulp and roots</p>
        </div>
        <div className="story-copy reveal" style={stagger(1)}>
          <h2 id="story-heading">Why we&apos;re called Roots &amp; Pulp</h2>
          <p>
            From the outside, a tooth looks simple. Underneath the enamel sits the pulp, a living core of nerves
            and blood vessels, held in place by roots anchored in bone. That&apos;s where most dental problems
            start, and where good dentistry starts too.
          </p>
          <p>
            At Roots &amp; Pulp, every treatment begins with understanding what&apos;s actually going on. We examine
            carefully, explain what we find in plain language, and recommend only what you need. Then we treat you
            gently, at a pace that keeps you comfortable.
          </p>
          <Link className="text-link" href="/about/">
            Learn more about the clinic <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      <InteractivePrinciples />
    </section>
  );
}
