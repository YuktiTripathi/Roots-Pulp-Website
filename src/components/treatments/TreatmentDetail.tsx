import Image from "next/image";
import Link from "next/link";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTA } from "@/components/FinalCTA";
import { StageFigure } from "@/components/treatments/StageIllustrations";
import { TreatmentListItem, treatmentImage } from "@/components/treatments/TreatmentsLanding";
import { bookingUrl, clinic, doctor, telHref, treatments, whatsappHref, type Treatment } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import type { SymptomIcon, TreatmentLink, TreatmentPageContent } from "@/lib/treatmentPages";

const TOOTH =
  "M7 4c-2 0-3 1.6-3 4 0 3 1.5 4 2 7l1 5h2l1-5h2l1 5h2l1-5c.5-3 2-4 2-7 0-2.4-1-4-3-4-1.5 0-2.5.8-5 .8S8.5 4 7 4Z";
const SMALL_TOOTH_LEFT = "M3 6c0-1.5 1-2.5 2.5-2.5S8 4.5 8 6v9l-1 5H4l-1-5Z";
const SMALL_TOOTH_RIGHT = "M16 6c0-1.5 1-2.5 2.5-2.5S21 4.5 21 6v9l-1 5h-3l-1-5Z";

const symptomPaths: Record<SymptomIcon, string> = {
  temperature: "M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0ZM12 9v7M17 6h3M17 10h3",
  bite: "M7 4c-2 0-3 1.6-3 4 0 3 1.5 4 2 7l1 5h2l1-5h2l1 5h2l1-5c.5-3 2-4 2-7 0-2.4-1-4-3-4-1.5 0-2.5.8-5 .8S8.5 4 7 4ZM12 1v3",
  night: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z",
  swelling: "M12 3c3.5 4 6 7.2 6 10.5a6 6 0 0 1-12 0C6 10.2 8.5 7 12 3ZM9.5 14a2.5 2.5 0 0 0 2.5 2.5",
  crack: "M7 4c-2 0-3 1.6-3 4 0 3 1.5 4 2 7l1 5h2l1-5h2l1 5h2l1-5c.5-3 2-4 2-7 0-2.4-1-4-3-4-1.5 0-2.5.8-5 .8S8.5 4 7 4ZM12 5l-2 3 3 2-2 3",
  shade: "M12 3a9 9 0 1 0 0 18V3ZM12 3a9 9 0 0 1 0 18",
  gap: `${SMALL_TOOTH_LEFT}${SMALL_TOOTH_RIGHT}M10.5 9h1M12.5 9h1M10.5 14h1M12.5 14h1`,
  gaps: `${SMALL_TOOTH_LEFT}${SMALL_TOOTH_RIGHT}M10 7.5h1.2M12.8 7.5H14M10 11.5h1.2M12.8 11.5H14M10 15.5h1.2M12.8 15.5H14`,
  lost: `${TOOTH}M9.5 8l5 5M14.5 8l-5 5`,
  denture: "M4 8c0-2 3.5-4 8-4s8 2 8 4v3c0 4-3.5 7-8 7s-8-3-8-7ZM7 9.5h10M8 12.5c1 .8 2.5 1.2 4 1.2s3-.4 4-1.2",
  drift: `${SMALL_TOOTH_LEFT}M12 12h8M17 9l3 3-3 3`,
  neighbours: `${TOOTH}M9 10.5l2 2 4-4`,
  filling: `${TOOTH}M9.5 7.5h5v4h-5Z`,
  treated: `${TOOTH}M10.5 9l-1 7M13.5 9l1 7`,
  chew: `${SMALL_TOOTH_RIGHT}M3 12h9M6 9l-3 3 3 3`,
};

function LinkRow({ links, className = "tp-links" }: { links: TreatmentLink[]; className?: string }) {
  return (
    <p className={className}>
      {links.map((link) => (
        <Link key={link.href} className="text-link" href={link.href}>
          {link.label} <span className="arrow" aria-hidden="true">→</span>
        </Link>
      ))}
    </p>
  );
}

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
  // Section backgrounds alternate ivory and white. The soft "Why" band splits the page in two:
  // the first half starts on ivory after the white glance strip, the second ends on ivory before the CTA.
  const firstHalf = ["symptoms", "what", "process", ...(content.options ? ["options"] : []), "compare", "decides", "comfort"];
  const secondHalf = ["doctor", "aftercare", "warning", "cost", "faq", "related"];
  const tone = (key: string) => {
    const first = firstHalf.indexOf(key);
    if (first >= 0) return first % 2 ? "tp-white" : "tp-ivory";
    const second = secondHalf.indexOf(key);
    return (secondHalf.length - 1 - second) % 2 ? "tp-white" : "tp-ivory";
  };
  const symptomGroups = content.symptoms.items.reduce<{ label?: string; items: typeof content.symptoms.items }[]>(
    (groups, item) => {
      const existing = groups.find((group) => group.label === item.group);
      if (existing) existing.items.push(item);
      else groups.push({ label: item.group, items: [item] });
      return groups;
    },
    [],
  );
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
      <section className={`tp-section ${tone("symptoms")}`} aria-labelledby="symptoms-heading">
        <div className="tx-wrap">
          <SectionHead id="symptoms-heading" heading={content.symptoms.heading} intro={content.symptoms.intro} />
          {symptomGroups.map((group) => (
            <div key={group.label ?? "all"} className="tp-symptom-group">
              {group.label ? <p className="tp-group-label reveal">{group.label}</p> : null}
              <ul className="tp-cards">
                {group.items.map((item, index) => (
                  <li key={item.title} className="tp-card tp-symptom reveal" style={stagger(index % 3)}>
                    <span className="tp-icon">
                      <SymptomGlyph icon={item.icon} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    {item.link ? <LinkRow links={[item.link]} className="tp-card-link" /> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="tp-strip reveal">{content.symptoms.note}</p>
        </div>
      </section>

      {/* What it is */}
      <section className={`tp-section ${tone("what")}`} aria-labelledby="what-heading">
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
          <StageFigure kind={content.explainer.illustration} caption={content.explainer.caption} />
        </div>
      </section>

      {/* Process */}
      <section className={`tp-section ${tone("process")}`} aria-labelledby="process-heading">
        <div className="tx-wrap">
          <SectionHead id="process-heading" heading={content.process.heading} intro={content.process.intro} />
          <ol className={`tp-steps tp-steps-${content.process.steps.length}`}>
            {content.process.steps.map((step, index) => (
              <li key={step.title} className="reveal" style={stagger(index)}>
                <span className="tp-step-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {step.links ? <LinkRow links={step.links} className="tp-step-links" /> : null}
              </li>
            ))}
          </ol>
          <p className="tp-footnote reveal">{content.process.footnote}</p>
        </div>
      </section>

      {/* Options */}
      {content.options ? (
        <section className={`tp-section ${tone("options")}`} aria-labelledby="options-heading">
          <div className="tx-wrap">
            <SectionHead id="options-heading" heading={content.options.heading} />
            <ul className="tp-options">
              {content.options.items.map((option, index) => (
                <li key={option.title} className="tp-option reveal" style={stagger(index)}>
                  <h3>{option.title}</h3>
                  <dl>
                    <div>
                      <dt>What it is</dt>
                      <dd>{option.what}</dd>
                    </div>
                    <div>
                      <dt>May suit</dt>
                      <dd>{option.suits}</dd>
                    </div>
                  </dl>
                  <p className="tp-option-note">{option.note}</p>
                  {option.link ? <LinkRow links={[option.link]} className="tp-card-link" /> : null}
                </li>
              ))}
            </ul>
            {content.options.note ? <p className="tp-strip reveal">{content.options.note}</p> : null}
          </div>
        </section>
      ) : null}

      {/* Comparison */}
      <section className={`tp-section ${tone("compare")}`} aria-labelledby="compare-heading">
        <div className="tx-wrap">
          <SectionHead id="compare-heading" heading={content.comparison.heading} />
          {content.comparison.columns.length === 2 ? (
            <div className="tp-compare">
              {content.comparison.columns.map((column, columnIndex) => (
                <div
                  key={column}
                  className={`tp-compare-col reveal${columnIndex === 0 ? " is-keep" : ""}`}
                  style={stagger(columnIndex)}
                >
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
          ) : (
            <div className="tp-table-wrap reveal" role="region" aria-labelledby="compare-heading" tabIndex={0}>
              <table className="tp-table">
                <thead>
                  <tr>
                    <td />
                    {content.comparison.columns.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.comparison.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {row.values.map((value, index) => (
                        <td key={`${row.label}-${index}`}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="tp-closing reveal">{content.comparison.closing}</p>
          {content.comparison.links ? <LinkRow links={content.comparison.links} /> : null}
          {content.comparison.aside ? (
            <p className="tp-aside reveal">
              {content.comparison.aside.text}{" "}
              <Link className="text-link" href={content.comparison.aside.link.href}>
                {content.comparison.aside.link.label} <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      {/* How your dentist decides */}
      <section className={`tp-section ${tone("decides")}`} aria-labelledby="decides-heading">
        <div className="tx-wrap">
          <SectionHead id="decides-heading" heading={content.decides.heading} intro={content.decides.intro} />
          <Cards items={content.decides.items} numbered />
          <p className="tp-closing reveal">{content.decides.closing}</p>
        </div>
      </section>

      {/* Comfort */}
      <section className={`tp-section ${tone("comfort")}`} aria-labelledby="comfort-heading">
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
      <section className={`tp-section ${tone("doctor")}`} aria-labelledby="doctor-card-heading">
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
                {content.doctorExtra?.map((line) => (
                  <li key={line}>{line}</li>
                ))}
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
      <section className={`tp-section ${tone("aftercare")}`} aria-labelledby="aftercare-heading">
        <div className="tx-wrap">
          <SectionHead id="aftercare-heading" heading={content.aftercare.heading} intro={content.aftercare.intro} />
          <Cards items={content.aftercare.items} numbered />
          <p className="tp-strip reveal">{content.aftercare.followUp}</p>
        </div>
      </section>

      {/* When to contact */}
      <section className={`tp-section ${tone("warning")}`} aria-labelledby="warning-heading">
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
      <section className={`tp-section ${tone("cost")}`} aria-labelledby="cost-heading">
        <div className="tx-wrap">
          <SectionHead id="cost-heading" heading={content.cost.heading} intro={content.cost.intro} />
          <Cards items={content.cost.items} numbered />
          <p className="tp-closing reveal">{content.cost.closing}</p>
        </div>
      </section>

      <FAQSection
        items={content.faqs}
        heading="Common questions"
        intro={content.faqIntro}
        className={tone("faq")}
      />

      {related.length ? (
        <section className={`tx-detail-related ${tone("related")}`} aria-labelledby="related-heading">
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
