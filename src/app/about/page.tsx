import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCTA } from "@/components/FinalCTA";
import { bookingUrl, clinic, directionsUrl } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import { openingHoursShort } from "@/lib/openingHours";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/schema";
import "./about.css";

const seo = {
  title: "About Roots & Pulp Dental Clinic · Aliganj, Lucknow",
  description:
    "Roots & Pulp is an Aliganj, Lucknow dental clinic built on listening, clear explanations and thoughtful treatment planning with Dr. Shubham Tripathi.",
  path: "/about/",
};

export const metadata: Metadata = pageMetadata({ ...seo });

const care = [
  {
    title: "Questions are part of the appointment",
    text: "Ask what you need to. Nobody here is keeping count.",
  },
  {
    title: "You see what we see",
    text: "Findings are shown and explained, not just announced.",
  },
  {
    title: "Not every problem needs a big procedure",
    text: "We will tell you when something can wait, or needs no treatment at all.",
  },
  {
    title: "Prevention is part of the plan",
    text: "The aim is a mouth that stays well, not just one that gets fixed.",
  },
] as const;

const visitSteps = [
  {
    title: "Be heard",
    text: "Tell us what is bothering you, in your own words.",
  },
  {
    title: "Understand",
    text: "We examine, explain what we find, and talk through the options.",
  },
  {
    title: "Decide together",
    text: "Options, visits and costs are laid out first. There is no pressure to decide on the day.",
  },
] as const;

export default function AboutPage() {
  return (
    <main id="content" className="about-page motion-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          webPageJsonLd({
            name: seo.title,
            description: seo.description,
            path: seo.path,
            type: "AboutPage",
            breadcrumb: [{ name: "About", path: "/about/" }],
            image: "/images/doctor/listen-consult.jpg",
          }),
        )}
      />

      <section className="section about-hero" aria-labelledby="about-heading">
        <div className="section-inner">
          <nav className="crumbs about-crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">About</li>
            </ol>
          </nav>
          <div className="about-hero-grid">
            <div>
              <p className="eyebrow reveal">About Roots &amp; Pulp</p>
              <h1 id="about-heading" className="reveal" style={stagger(1)}>
                Dentistry feels different when someone explains it
              </h1>
              <p className="reveal" style={stagger(2)}>
                Most people arrive at a dental clinic with a question they haven&apos;t said out loud. At Roots
                &amp; Pulp, in Aliganj, we start by listening. Then we show you what we see, so every next step
                makes sense.
              </p>
              <div className="hero-actions reveal" style={stagger(3)}>
                <Link className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book an Appointment
                </Link>
                <Link className="btn btn-secondary" href="/doctor/dr-shubham-tripathi/">
                  Meet Dr. Shubham
                </Link>
              </div>
            </div>
            <figure
              className="about-figure about-hero-photo parallax-image reveal reveal--mask"
              data-parallax="10"
              style={stagger(2)}
            >
              <div className="parallax-layer">
                <Image
                  src="/images/clinic/roots-pulp-about-consultation-lucknow.webp"
                  alt="Dr. Shubham Tripathi speaking with a patient during a consultation at Roots & Pulp"
                  width={819}
                  height={1024}
                  sizes="(max-width: 900px) 100vw, 560px"
                  priority
                  className="mask-img"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="section about-why" aria-labelledby="why-heading">
        <div className="section-inner about-split">
          <figure
            className="about-figure about-editorial-photo parallax-image reveal reveal--mask"
            data-parallax="12"
          >
            <div className="parallax-layer">
              <Image
                src="/images/clinic/roots-pulp-treatment-room-lucknow.webp"
                alt="Dental treatment room at Roots & Pulp Dental Clinic in Aliganj, Lucknow"
                width={1024}
                height={895}
                sizes="(max-width: 980px) 100vw, 520px"
                className="mask-img"
              />
            </div>
            <figcaption>Thoughtful care, in a space designed around clarity and comfort.</figcaption>
          </figure>
          <div>
            <p className="eyebrow reveal">Why we do it this way</p>
            <h2 id="why-heading" className="reveal" style={stagger(1)}>
              A visit should leave you with answers
            </h2>
            <p className="about-pull reveal" style={stagger(2)}>
              Dental visits often begin with one question: what exactly is wrong?
            </p>
            <p className="reveal" style={stagger(3)}>
              Too often they end with more. Why this treatment? Is there another option? What happens next?
            </p>
            <p className="reveal" style={stagger(4)}>
              Roots &amp; Pulp was built so those questions are welcome. We look first, explain what we find in
              plain language, and talk through your options before anything begins. Where a problem can be
              prevented, we would rather help you prevent it than repair it later.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-care" aria-labelledby="care-heading">
        <div className="section-inner">
          <div className="section-heading">
            <h2 id="care-heading" className="reveal">
              The way we care
            </h2>
          </div>
          <ul className="about-cards">
            {care.map((item, index) => (
              <li key={item.title} className="about-card reveal" style={stagger(index)}>
                <span className="about-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="about-follow reveal">
            <Link className="text-link" href="/treatments/">
              See the treatments we offer <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      <section className="section about-visit" aria-labelledby="visit-heading">
        <div className="section-inner">
          <div className="section-heading">
            <h2 id="visit-heading" className="reveal">
              What a visit should feel like
            </h2>
          </div>
          <ol className="about-steps">
            {visitSteps.map((step, index) => (
              <li key={step.title} className="about-step reveal" style={stagger(index)}>
                <span className="about-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <figure className="about-figure about-waiting-photo reveal">
            <Image
              src="/images/clinic/roots-pulp-waiting-area-lucknow.webp"
              alt="Patient waiting area at Roots & Pulp Dental Clinic in Aliganj, Lucknow"
              width={1024}
              height={858}
              sizes="(max-width: 980px) 100vw, 760px"
            />
            <figcaption>A calm space to arrive, settle in and feel at ease.</figcaption>
          </figure>
          <p className="about-follow reveal">
            <Link className="text-link" href="/faq/">
              Common questions about a first visit <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      <section className="section about-clinic" aria-labelledby="clinic-heading">
        <div className="section-inner about-split about-clinic-grid">
          <div>
            <h2 id="clinic-heading" className="reveal">
              A calm place in Aliganj, Lucknow
            </h2>
            <p className="reveal" style={stagger(1)}>
              Roots &amp; Pulp is in Sector Q, Aliganj, near Saraswati Vidya Mandir School. It is a clinic for
              conversations as much as procedures, open seven days so a visit can fit around work and school.
            </p>
            <address className="about-address reveal" style={stagger(2)}>
              <span>{clinic.name}</span>
              <span>
                {clinic.streetAddress}, {clinic.locality}
              </span>
              {openingHoursShort.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <p className="about-follow reveal" style={stagger(3)}>
              <a className="text-link" href={directionsUrl} target="_blank" rel="noopener noreferrer">
                Get directions <span aria-hidden="true">→</span>
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
          <figure className="about-figure about-clinic-photo reveal reveal--mask reveal--mask-left">
            <Image
              src="/images/clinic/roots-pulp-clinic-interior-lucknow.webp"
              alt="Reception and interior of Roots & Pulp Dental Clinic in Aliganj, Lucknow"
              width={1024}
              height={768}
              sizes="(max-width: 980px) 100vw, 420px"
              className="mask-img"
            />
          </figure>
        </div>
      </section>

      <FinalCTA
        heading="Start with a conversation"
        supporting="You don't need to know what treatment you need before you visit. If something has been bothering you, such as pain, sensitivity, a change in your smile or just a question, let us take a look and explain what we see."
        showCall
      />
    </main>
  );
}
