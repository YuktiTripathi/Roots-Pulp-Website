import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCTA } from "@/components/FinalCTA";
import { bookingUrl, doctor, whatsappHref } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import "./doctor.css";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/schema";

const seo = {
  title: "Dr. Shubham Tripathi, BDS, MPH · Dentist in Aliganj, Lucknow",
  description:
    "Meet Dr. Shubham Tripathi, BDS, MPH, founder of Roots & Pulp Dental Clinic in Aliganj, Lucknow, with certification in rotary endodontics and a focus on prevention.",
  path: "/doctor/dr-shubham-tripathi/",
};

export const metadata: Metadata = pageMetadata({ ...seo });

const approach = [
  {
    title: "Listen carefully",
    text: "Every consultation begins with understanding the patient's concerns, symptoms and expectations before deciding what comes next.",
    image: "/images/doctor/listen-consult.jpg",
    alt: "Dr. Shubham Tripathi listening during a consultation",
  },
  {
    title: "Explain clearly",
    text: "Dental treatment can feel confusing. Findings, options and the reasoning behind a treatment plan are explained in simple, understandable terms.",
    image: "/images/doctor/explain-consult.jpg",
    alt: "Dr. Shubham Tripathi explaining a treatment plan",
  },
  {
    title: "Treat thoughtfully",
    text: "Treatment is planned around the individual's needs, with attention to precision, comfort and long-term oral health.",
    image: "/images/doctor/treat.jpg",
    alt: "Dr. Shubham Tripathi providing dental treatment",
  },
] as const;

const credentials = [
  {
    title: "BDS, MPH",
    detail: "Dental & Public Health",
    icon: "qual",
  },
  {
    title: "8+ Years",
    detail: "of Experience",
    icon: "years",
  },
  {
    title: "Specialisation",
    detail: "in Rotary Endodontics",
    icon: "endo",
  },
] as const;

export default function DoctorPage() {
  return (
    <main id="content" className="doctor-page motion-page">
      <section className="doctor-profile" aria-labelledby="doctor-heading">
        <div className="doctor-profile-inner">
          <nav className="crumbs doctor-crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-current="page">Doctor</li>
            </ol>
          </nav>
          <div className="doctor-profile-grid">
            <figure className="doctor-profile-figure">
              <div className="doctor-portrait-wrap">
                <div
                  className="doctor-portrait-stage reveal"
                 
                >
                  <Image
                    src={doctor.portrait}
                    alt={doctor.profileAlt}
                    width={doctor.portraitWidth}
                    height={doctor.portraitHeight}
                    sizes="(max-width: 980px) 70vw, 420px"
                    priority
                    className="doctor-profile-photo"
                  />
                </div>
                <p className="doctor-reg enter" style={stagger(5)}>
                  <span className="doctor-reg-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3.5l7 2.8v5.4c0 4.3-2.9 7.6-7 8.8-4.1-1.2-7-4.5-7-8.8V6.3l7-2.8Z" />
                      <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
                    </svg>
                  </span>
                  <span>{doctor.registration}</span>
                </p>
              </div>
              <figcaption className="enter" style={stagger(4)}>
                <p className="doctor-caption-name">{doctor.name}</p>
                <p className="doctor-caption-cred">{doctor.credentials}</p>
                <p className="doctor-caption-role">
                  {doctor.role}
                  <span>Roots &amp; Pulp Dental Clinic</span>
                </p>
              </figcaption>
            </figure>
            <div className="doctor-profile-copy">
              <p className="eyebrow enter">Meet your dentist</p>
              <h1 id="doctor-heading" className="enter" style={stagger(1)}>
                {doctor.name}
              </h1>
              <ul className="doctor-chips enter" style={stagger(2)} aria-label="Qualifications and role">
                <li>BDS, MPH</li>
                <li>Rotary endodontics</li>
                <li>{doctor.role}</li>
              </ul>
              <p className="enter" style={stagger(3)}>
                Dr. Shubham Tripathi founded Roots &amp; Pulp Dental Clinic in Aliganj with a simple aim: to offer
                careful, unhurried dental care where patients feel heard, informed and comfortable. With over seven
                years of clinical experience, he treats patients across different stages of life, from a child&apos;s
                first <Link href="/treatments/childrens-dentistry/">dental check-up</Link> to restorative and aesthetic
                treatments such as <Link href="/treatments/root-canal-treatment/">root canal treatment</Link>,{" "}
                <Link href="/treatments/crowns-and-bridges/">crowns</Link>,{" "}
                <Link href="/treatments/dental-implants/">implants</Link> and{" "}
                <Link href="/treatments/cosmetic-dentistry/">smile makeovers</Link>.
              </p>
              <p className="enter" style={stagger(4)}>
                He holds a Bachelor of Dental Surgery and a Master of Public Health, along with a specialised
                certification in rotary endodontics. His training in public health also shapes his approach to
                dentistry, with an emphasis on prevention, early attention to dental concerns and helping patients
                understand their oral health before deciding on treatment.
              </p>
              <p className="enter" style={stagger(5)}>
                Dr. Shubham believes that good dental care begins with listening. He takes time to understand each
                patient&apos;s concerns, explains findings and treatment options clearly, and develops treatment plans
                around the individual&apos;s needs rather than following a one-size-fits-all approach.
              </p>
              <p className="enter" style={stagger(6)}>
                Alongside his work at Roots &amp; Pulp, he also serves as Chief Dental Consultant at Re-Life Hospital, Bahraich.
              </p>
              <div className="hero-actions enter" style={stagger(6)}>
                <Link className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book an Appointment
                </Link>
                <a className="btn btn-secondary" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section doctor-approach" aria-labelledby="approach-heading">
        <div className="section-inner">
          <p className="eyebrow reveal">Experience &amp; approach</p>
          <h2 id="approach-heading" className="reveal">
            Care that begins with Understanding
          </h2>
          <p className="doctor-approach-lede reveal" style={stagger(1)}>
            Experience matters, but so does the way that experience is used. At Roots &amp; Pulp, Dr. Shubham combines
            clinical experience with a patient-first approach, taking the time to understand concerns, explain what he
            finds and plan treatment thoughtfully.
          </p>
          <ol className="doctor-approach-list">
            {approach.map((item, index) => (
              <li key={item.title} className="reveal" style={stagger(index)}>
                <div className="doctor-approach-media">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={800}
                    height={600}
                    sizes="(max-width: 980px) 100vw, 360px"
                    className="doctor-approach-photo"
                  />
                  <span className="doctor-approach-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section doctor-training" aria-labelledby="training-heading">
        <div className="section-inner">
          <p className="eyebrow reveal">Training &amp; credentials</p>
          <h2 id="training-heading" className="reveal" style={stagger(1)}>
            Experience backed by Training
          </h2>
          <ul className="doctor-credential-grid">
            {credentials.map((item, index) => (
              <li key={item.title} className="reveal" style={stagger(index)}>
                <span className="doctor-credential-icon" aria-hidden="true">
                  {item.icon === "years" ? (
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 8v4.5l3 2" />
                    </svg>
                  ) : item.icon === "endo" ? (
                    <svg viewBox="0 0 24 24">
                      <path d="M8 4.5h8M9 4.5v3.2c0 1.2-.4 2.3-1.1 3.2L6.5 13v6.5h4V14h3v5.5h4V13l-1.4-2.1A5 5 0 0 1 15 7.7V4.5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24">
                      <path d="M12 4.5v15M8.2 8.2h7.6M9.2 19.5h5.6" />
                      <path d="M12 8.2c2.2 1.6 3.4 3.2 3.4 5.1 0 1.6-1.2 2.6-3.4 2.6s-3.4-1-3.4-2.6c0-1.9 1.2-3.5 3.4-5.1Z" />
                    </svg>
                  )}
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA heading="Ready to meet Dr. Tripathi?" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          webPageJsonLd({ name: seo.title, description: seo.description, path: seo.path, type: "ProfilePage", breadcrumb: [{ name: "Dr. Shubham Tripathi", path: "/doctor/dr-shubham-tripathi/" }], image: doctor.portrait }),
        )}
      />
    </main>
  );
}
