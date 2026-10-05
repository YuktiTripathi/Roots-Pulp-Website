import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InnerPageHero } from "@/components/InnerPageHero";
import { FinalCTA } from "@/components/FinalCTA";
import { bookingUrl, clinic, directionsUrl, doctor } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import { openingHoursShort } from "@/lib/openingHours";
import { photos } from "@/lib/photos";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/schema";
import "./about.css";

const seo = {
  title: "About Roots & Pulp Dental Clinic · Aliganj, Lucknow",
  description:
    "Roots & Pulp is an Aliganj, Lucknow dental clinic where you leave knowing what's wrong, your options and what happens next. Led by Dr. Shubham Tripathi.",
  path: "/about/",
};

export const metadata: Metadata = pageMetadata({ ...seo });

const walkOutItems = [
  "What we found, shown to you and put into plain words.",
  "Your options, including waiting, when waiting is safe.",
  "How many visits each option will take.",
  "A clear cost estimate, before anything begins.",
  "No pressure to decide on the day.",
] as const;

const smallThings = [
  {
    title: "Open seven days",
    text: "Monday to Saturday until 8 PM, and Sunday until 5 PM, so a visit can fit around work and school.",
  },
  {
    title: "Children are welcome",
    text: "We see children of all ages, from their first checkup onwards.",
  },
  {
    title: "Ask before you come",
    text: "Send us a WhatsApp message with your question, call the clinic, or book online.",
  },
  {
    title: "Some things can wait",
    text: "Not every problem needs treatment today. If yours can wait, or needs none, we will say so.",
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
            image: photos.consultation.src,
          }),
        )}
      />

      <InnerPageHero
        crumb="About"
        titleId="about-heading"
        eyebrow="About Roots & Pulp"
        title={<>Know what&apos;s wrong, what your options are, and what happens next</>}
        image={photos.explainingOptions.src}
        imageAlt={photos.explainingOptions.alt}
        imagePosition="center 74%"
        titleSize="long"
      >
        <p className="lede enter" style={stagger(1)}>
          That is the standard every visit at Roots &amp; Pulp is held to.
          <br />
          We are a dental clinic in Sector Q, Aliganj, Lucknow.
        </p>
        <div className="hero-actions enter" style={stagger(2)}>
          <Link className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Book an Appointment
          </Link>
          <Link className="btn btn-secondary" href="/doctor/dr-shubham-tripathi/">
            Meet Dr. Shubham
          </Link>
        </div>
      </InnerPageHero>

      <section className="section about-why" aria-labelledby="why-heading">
        <div className="section-inner about-split">
          <figure
            className="about-figure about-editorial-photo parallax-image reveal reveal--mask"
            data-parallax="14"
          >
            <div className="parallax-layer">
              <Image
                src={photos.consultationDesk.src}
                alt={photos.consultationDesk.alt}
                width={photos.consultationDesk.width}
                height={photos.consultationDesk.height}
                sizes="(max-width: 980px) 100vw, 480px"
                className="mask-img"
                style={{ objectPosition: photos.consultationDesk.position }}
              />
            </div>
          </figure>
          <div className="about-copy about-justify">
            <p className="eyebrow reveal">Why Roots &amp; Pulp exists</p>
            <h2 id="why-heading" className="reveal" style={stagger(1)}>
              People should never feel like just another case in a dental chair
            </h2>
            <p className="reveal" style={stagger(2)}>
              A dental visit can come with fear, uncertainty, pain, or even embarrassment, and often what people
              need first is not a procedure, but someone who will listen without rushing them. We wanted to create
              a place where every patient feels heard, where questions are welcomed, and where treatment begins
              only after there is clarity and trust.
            </p>
            <p className="about-lead reveal" style={stagger(3)}>
              For us, good dentistry is not only about fixing a tooth. It is about helping someone feel comfortable
              enough to smile, speak, eat, and live without constantly thinking about their dental health.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-walk-out" aria-labelledby="walk-out-heading">
        <div className="section-inner about-split about-walk-out-grid">
          <figure className="about-figure about-walk-out-photo reveal">
            <Image
              src={photos.explaining.src}
              alt={photos.explaining.alt}
              width={photos.explaining.width}
              height={photos.explaining.height}
              sizes="(max-width: 980px) 100vw, 440px"
              style={{ objectPosition: photos.explaining.position }}
            />
          </figure>
          <div>
            <h2 id="walk-out-heading" className="reveal">
              What you walk out with
            </h2>
            <p className="reveal" style={stagger(1)}>
              After an examination, and an X-ray if one is needed, you should have:
            </p>
            <ul className="about-checklist reveal" style={stagger(2)}>
              {walkOutItems.map((item) => (
                <li key={item}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section about-vision" aria-labelledby="vision-heading">
        <div className="section-inner about-vision-inner">
          <div className="about-vision-copy about-justify">
            <p className="eyebrow reveal">Our vision</p>
            <h2 id="vision-heading" className="reveal" style={stagger(1)}>
              A clinic you return to through different stages of life
            </h2>
            <p className="reveal" style={stagger(2)}>
              We want Roots &amp; Pulp to be a place people come back to, not because they are afraid something might
              go wrong, but because they feel genuinely cared for here. We want to move away from hurried,
              procedure-first dentistry and build a culture of prevention, honest conversations, thoughtful
              treatment, and long-term relationships.
            </p>
            <blockquote className="about-vision-quote reveal" style={stagger(3)}>
              If someone leaves Roots &amp; Pulp feeling a little less anxious, a little more informed, and confident
              that their health is being looked after with sincerity, then we have built the kind of clinic we set
              out to create.
            </blockquote>
          </div>
          <figure className="about-figure about-vision-photo reveal reveal--mask" style={stagger(1)}>
            <Image
              src={photos.reviewingSmile.src}
              alt={photos.reviewingSmile.alt}
              width={photos.reviewingSmile.width}
              height={photos.reviewingSmile.height}
              sizes="(max-width: 980px) 100vw, 480px"
              className="mask-img"
              style={{ objectPosition: photos.reviewingSmile.position }}
            />
          </figure>
        </div>
      </section>

      <section className="section about-small-things" aria-labelledby="small-things-heading">
        <div className="section-inner">
          <div className="section-heading">
            <h2 id="small-things-heading" className="reveal">
              Small things that matter
            </h2>
          </div>
          <ol className="about-small-things-grid">
            {smallThings.map((item, index) => (
              <li key={item.title} className="about-small-thing reveal" style={stagger(index)}>
                <span className="about-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section about-doctor" aria-labelledby="doctor-heading">
        <div className="section-inner about-split about-doctor-grid">
          <figure className="about-figure about-doctor-photo reveal">
            {/* TODO: replace with a relaxed, natural-light portrait without folded arms once photographed. */}
            <Image
              src={doctor.portrait}
              alt={doctor.profileAlt}
              width={doctor.portraitWidth}
              height={doctor.portraitHeight}
              sizes="(max-width: 980px) 78vw, 420px"
            />
          </figure>
          <div className="about-copy">
            <p className="eyebrow reveal">Your dentist</p>
            <h2 id="doctor-heading" className="reveal" style={stagger(1)}>
              A dentist who also thinks in public health
            </h2>
            <p className="reveal" style={stagger(2)}>
              Dr. Shubham Tripathi, Founder and Director, trained in both dentistry (BDS) and public health (MPH).
              Public health is about stopping problems before they start, which is why prevention sits at the
              centre of how the clinic works.
            </p>
            <p className="reveal" style={stagger(3)}>
              He also holds specialised certification in Rotary Endodontics, used in root canal treatment.
            </p>
            <p className="about-follow reveal" style={stagger(4)}>
              <Link className="text-link" href="/doctor/dr-shubham-tripathi/">
                Meet Dr. Shubham <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section about-clinic" aria-labelledby="clinic-heading">
        <div className="section-inner about-split about-clinic-grid">
          <div className="about-copy">
            <h2 id="clinic-heading" className="reveal">
              A calm place in Aliganj, Lucknow
            </h2>
            <p className="reveal" style={stagger(1)}>
              Roots &amp; Pulp is in Sector Q, Aliganj, near Saraswati Vidya Mandir School.
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
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
          <div className="about-clinic-media">
            <figure className="about-figure about-clinic-photo reveal reveal--mask">
              <Image
                src={photos.interior.src}
                alt={photos.interior.alt}
                width={photos.interior.width}
                height={photos.interior.height}
                sizes="(max-width: 980px) 100vw, 390px"
                className="mask-img"
              />
            </figure>
            <figure className="about-figure about-clinic-support reveal reveal--mask reveal--mask-left">
              <Image
                src={photos.waitingArea.src}
                alt={photos.waitingArea.alt}
                width={photos.waitingArea.width}
                height={photos.waitingArea.height}
                sizes="(max-width: 640px) 78vw, 340px"
                className="mask-img"
              />
            </figure>
          </div>
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
