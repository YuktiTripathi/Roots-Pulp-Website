import Image from "next/image";
import Link from "next/link";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTA } from "@/components/FinalCTA";
import { RootCanalStages } from "@/components/treatments/RootCanalStages";
import { TreatmentListItem, treatmentImage } from "@/components/treatments/TreatmentsLanding";
import { bookingUrl, clinic, doctor, telHref, treatments, whatsappHref, type Treatment } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import type { SymptomIcon, TreatmentPageContent } from "@/lib/treatmentPages";

const symptomPaths: Record<SymptomIcon, string> = {
  temperature: "M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0ZM12 9v7M17 6h3M17 10h3",
  bite: "M7 4c-2 0-3 1.6-3 4 0 3 1.5 4 2 7l1 5h2l1-5h2l1 5h2l1-5c.5-3 2-4 2-7 0-2.4-1-4-3-4-1.5 0-2.5.8-5 .8S8.5 4 7 4ZM12 1v3",
  night: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z",
  swelling: "M12 3c3.5 4 6 7.2 6 10.5a6 6 0 0 1-12 0C6 10.2 8.5 7 12 3ZM9.5 14a2.5 2.5 0 0 0 2.5 2.5",
  crack: "M7 4c-2 0-3 1.6-3 4 0 3 1.5 4 2 7l1 5h2l1-5h2l1 5h2l1-5c.5-3 2-4 2-7 0-2.4-1-4-3-4-1.5 0-2.5.8-5 .8S8.5 4 7 4ZM12 5l-2 3 3 2-2 3",
  shade: "M12 3a9 9 0 1 0 0 18V3ZM12 3a9 9 0 0 1 0 18",
};

function SymptomGlyph({ icon }: { icon: SymptomIcon }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={symptomPaths[icon]} />
    </svg>
  );
}

function SectionHead({ id, heading, intro }: { id: string; heading: string; intro?: string }) {
  return (
    <>
      <h2 id={id} className="reveal">
        {heading}
      </h2>
      {intro ? (
        <p className="tp-intro reveal" style={stagger(1)}>
          {intro}
        </p>
      ) : null}
    </>
  );
}

function Cards({ items, numbered = false }: { items: { title: string; text: string }[]; numbered?: boolean }) {
  return (
    <ul className={`tp-cards tp-cards-${items.length}`}>
      {items.map((item, index) => (
        <li key={item.title} className="tp-card reveal" style={stagger(index % 3)}>
          {numbered ? <span className="tp-card-num">{String(index + 1).padStart(2, "0")}</span> : null}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function TreatmentDetail({ treatment, content }: { treatment: Treatment; content: TreatmentPageContent }) {
  const image = treatmentImage(treatment.slug);
  const related = content.related
    .map((item) => ({ ...item, treatment: treatments.find((entry) => entry.slug === item.slug) }))
    .filter((item): item is typeof item & { treatment: Treatment } => Boolean(item.treatment));
  const reviewed = content.clinicallyReviewedOn
    ? new Date(content.clinicallyReviewedOn).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <main id="content" className="treatments-page tp-page motion-page">
      {/* Hero */}
      <section className="tx-hero" aria-labelledby="treatment-heading">
        <div className="tx-wrap">
          <nav className="crumbs tx-crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/treatments/">Treatments</Link>
              </li>
              <li aria-current="page">{treatment.name}</li>
            </ol>
          </nav>
          <div className="tx-hero-grid">
            <div className="tx-detail-copy">
              <p className="eyebrow enter">{content.hero.eyebrow}</p>
              <h1 id="treatment-heading" className="enter" style={stagger(1)}>
                {content.hero.heading}
              </h1>
              <p className="lede enter" style={stagger(2)}>
                {content.hero.lede}
              </p>
              <p className="enter" style={stagger(3)}>
                {content.hero.text}
              </p>
              <div className="hero-actions enter" style={stagger(4)}>
                <Link className="btn btn-primary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book an Appointment
                </Link>
                <a className="btn btn-secondary" href={telHref()}>
                  Call {clinic.phoneDisplay}
                </a>
                <a className="btn btn-tertiary" href={whatsappHref()}>
                  WhatsApp Us
                </a>
              </div>
              <p className="notice enter" style={stagger(5)}>
                {clinic.disclaimer}
              </p>
            </div>
            {image ? (
              <figure className="tx-hero-visual">
                <div className="tx-hero-frame reveal reveal--mask">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 480px"
                    className="tx-hero-img mask-img"
                  />
                </div>
              </figure>
            ) : null}
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="tp-section tp-glance" aria-labelledby="glance-heading">
        <div className="tx-wrap">
          <h2 id="glance-heading" className="sr-only">
            At a glance
          </h2>
          <dl className="tp-glance-list">
            {content.glance.map((item, index) => (
              <div key={item.title} className="reveal" style={stagger(index)}>
                <dt>{item.title}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Symptoms */}
      <section className="tp-section" aria-labelledby="symptoms-heading">
        <div className="tx-wrap">
          <SectionHead id="symptoms-heading" heading={content.symptoms.heading} intro={content.symptoms.intro} />
          <ul className="tp-cards tp-cards-6">
            {content.symptoms.items.map((item, index) => (
              <li key={item.title} className="tp-card tp-symptom reveal" style={stagger(index % 3)}>
                <span className="tp-icon">
                  <SymptomGlyph icon={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="tp-strip reveal">{content.symptoms.note}</p>
        </div>
      </section>

      {/* What it is */}
      <section className="tp-section tp-white" aria-labelledby="what-heading">
        <div className="tx-wrap">
          <div className="tp-explain">
            <SectionHead id="what-heading" heading={content.explainer.heading} />
            <div className="tp-prose">
              {content.explainer.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className="reveal" style={stagger(index)}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <RootCanalStages caption={content.explainer.caption} />
        </div>
      </section>

      {/* Process */}
      <section className="tp-section" aria-labelledby="process-heading">
        <div className="tx-wrap">
          <SectionHead id="process-heading" heading={content.process.heading} intro={content.process.intro} />
          <ol className="tp-steps">
            {content.process.steps.map((step, index) => (
              <li key={step.title} className="reveal" style={stagger(index)}>
                <span className="tp-step-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {step.link ? (
                  <Link className="text-link" href={step.link.href}>
                    {step.link.label} <span className="arrow" aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="tp-footnote reveal">{content.process.footnote}</p>
        </div>
      </section>

      {/* Root canal or extraction */}
      <section className="tp-section tp-white" aria-labelledby="compare-heading">
        <div className="tx-wrap">
          <SectionHead id="compare-heading" heading={content.comparison.heading} />
          <div className="tp-compare">
            {content.comparison.columns.map((column, columnIndex) => (
              <div key={column} className={`tp-compare-col reveal${columnIndex === 0 ? " is-keep" : ""}`} style={stagger(columnIndex)}>
                <h3>{column}</h3>
                <dl>
                  {content.comparison.rows.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.values[columnIndex]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="tp-closing reveal">{content.comparison.closing}</p>
          <p className="tp-links reveal">
            {content.comparison.links.map((link) => (
              <Link key={link.href} className="text-link" href={link.href}>
                {link.label} <span className="arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </p>
        </div>
      </section>

      {/* How your dentist decides */}
      <section className="tp-section" aria-labelledby="decides-heading">
        <div className="tx-wrap">
          <SectionHead id="decides-heading" heading={content.decides.heading} intro={content.decides.intro} />
          <Cards items={content.decides.items} numbered />
          <p className="tp-closing reveal">{content.decides.closing}</p>
        </div>
      </section>

      {/* Comfort */}
      <section className="tp-section tp-white" aria-labelledby="comfort-heading">
        <div className="tx-wrap tp-split">
          <figure className="tp-split-media reveal reveal--scale">
            <Image
              src={content.comfort.image.src}
              alt={content.comfort.image.alt}
              width={content.comfort.image.width}
              height={content.comfort.image.height}
              sizes="(max-width: 900px) 100vw, 540px"
            />
          </figure>
          <div className="tp-prose">
            <SectionHead id="comfort-heading" heading={content.comfort.heading} />
            {content.comfort.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className="reveal" style={stagger(index + 1)}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Why Roots & Pulp */}
      <section className="tp-section tp-soft" aria-labelledby="why-heading">
        <div className="tx-wrap">
          <SectionHead id="why-heading" heading={content.why.heading} />
          <Cards items={content.why.items} />
          <ul className="tp-equipment">
            {content.why.equipment.map((item, index) => (
              <li key={item.src} className="reveal" style={stagger(index)}>
                <figure>
                  <div className="tp-equipment-frame">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 680px) 100vw, 370px"
                      style={item.position ? { objectPosition: item.position } : undefined}
                    />
                  </div>
                  <figcaption>
                    <strong>{item.caption}</strong>
                    <span>{item.detail}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="tp-footnote reveal">
            {content.why.equipmentNote}{" "}
            <Link className="text-link" href="/gallery/#equipment">
              See more in the gallery <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* Doctor */}
      <section className="tp-section tp-white" aria-labelledby="doctor-card-heading">
        <div className="tx-wrap">
          <div className="tp-doctor reveal">
            <Image
              src={doctor.portrait}
              alt={doctor.profileAlt}
              width={doctor.portraitWidth}
              height={doctor.portraitHeight}
              sizes="220px"
              className="tp-doctor-img"
              unoptimized
            />
            <div>
              <p className="eyebrow">Meet your dentist</p>
              <h2 id="doctor-card-heading">{doctor.name}</h2>
              <ul className="tp-doctor-creds">
                <li>
                  {doctor.credentials}. {doctor.role}.
                </li>
                <li>Specialised Certification in Rotary Endodontics.</li>
                <li>Life Member, Indian Dental Association.</li>
                <li>{doctor.registration}.</li>
              </ul>
              <blockquote>
                <p>&ldquo;{content.doctorQuote}&rdquo;</p>
              </blockquote>
              <Link className="text-link" href="/doctor/dr-shubham-tripathi/">
                Read Dr. Tripathi&apos;s profile <span className="arrow" aria-hidden="true">→</span>
              </Link>
              {reviewed ? (
                <p className="tp-reviewed">
                  Clinically reviewed by {doctor.name}, {doctor.credentials}. Last reviewed: {reviewed}.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Aftercare */}
      <section className="tp-section" aria-labelledby="aftercare-heading">
        <div className="tx-wrap">
          <SectionHead id="aftercare-heading" heading={content.aftercare.heading} intro={content.aftercare.intro} />
          <Cards items={content.aftercare.items} numbered />
          <p className="tp-strip reveal">{content.aftercare.followUp}</p>
        </div>
      </section>

      {/* When to contact */}
      <section className="tp-section tp-white" aria-labelledby="warning-heading">
        <div className="tx-wrap">
          <div className="tp-warning reveal">
            <h2 id="warning-heading">{content.warning.heading}</h2>
            <p>{content.warning.intro}</p>
            <ul>
              {content.warning.signs.map((sign) => (
                <li key={sign}>{sign}</li>
              ))}
            </ul>
            <p className="tp-warning-urgent">
              <strong>{content.warning.emergency}</strong>
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={telHref()}>
                Call {clinic.phoneDisplay}
              </a>
              <Link className="btn btn-secondary" href="/treatments/emergency-dental-care/">
                Emergency Dental Care
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cost */}
      <section className="tp-section" aria-labelledby="cost-heading">
        <div className="tx-wrap">
          <SectionHead id="cost-heading" heading={content.cost.heading} intro={content.cost.intro} />
          <Cards items={content.cost.items} numbered />
          <p className="tp-closing reveal">{content.cost.closing}</p>
        </div>
      </section>

      <FAQSection
        items={content.faqs}
        heading="Common questions"
        intro="Straight answers about root canal treatment. For anything else, call or send a WhatsApp message."
      />

      {related.length ? (
        <section className="tx-detail-related" aria-labelledby="related-heading">
          <div className="tx-wrap">
            <h2 id="related-heading" className="reveal">
              Related treatments
            </h2>
            <ul className="tx-list">
              {related.map((item, index) => (
                <TreatmentListItem key={item.slug} treatment={item.treatment} index={index} summary={item.text} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <FinalCTA
        heading={content.cta.heading}
        supporting={content.cta.text}
        showCall
        note={`${clinic.name}, ${clinic.streetAddress}, ${clinic.locality}. ${clinic.landmark}. Open seven days.`}
      />
    </main>
  );
}
