import Image from "next/image";
import Link from "next/link";
import { FAQSection } from "@/components/FAQSection";
import { WhyRootsPulp } from "@/components/treatments/WhyRootsPulp";
import { TreatmentSectionNav } from "@/components/treatments/TreatmentSectionNav";
import { FinalCTA } from "@/components/FinalCTA";
import { PhoneIcon } from "@/components/Icons";
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
  sparkle: `${TOOTH}M19.5 1.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z`,
  spots: `${TOOTH}M9.6 8.6h.8M13.4 9.6h.8M11.2 12.2h.8`,
  thumb: "M8 21v-8.5a1.5 1.5 0 0 1 3 0V13M11 12.5V5.5a1.5 1.5 0 0 1 3 0V12M14 11.5a1.5 1.5 0 0 1 3 0V15c0 3.3-2.2 6-5.5 6H8",
  crowded:
    "M2.5 9c0-1.4 1-2.3 2.3-2.3S7.1 7.6 7.1 9v6.5l-.9 3.8H3.4l-.9-3.8ZM8.6 6.5c0-1.5 1.1-2.6 2.6-2.6s2.6 1.1 2.6 2.6v7.8l-1 4.2h-3.2l-1-4.2ZM16.4 8.2c0-1.4 1-2.3 2.3-2.3s2.3.9 2.3 2.3v6.8l-.9 3.8h-2.8l-.9-3.8Z",
  brush: "M3 21l9-9M12 12l1.5-1.5M13 5h7v4h-7ZM14.5 5V3M16.5 5V3M18.5 5V3",
  uneven: `${SMALL_TOOTH_LEFT}M15 9.5c0-1.2.9-2 2.2-2s2.3.8 2.3 2v5.5l-.8 3.5h-2.6l-.9-3.5Z`,
  adult: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-4 3.6-7 8-7s8 3 8 7M10 7.5c.6.6 1.3.9 2 .9s1.4-.3 2-.9",
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

function Cards({ items, numbered = false }: { items: { title: string; text?: string }[]; numbered?: boolean }) {
  return (
    <ul className={`tp-cards tp-cards-${items.length}`}>
      {items.map((item, index) => (
        <li key={item.title} className="tp-card reveal" style={stagger(index % 3)}>
          {numbered ? <span className="tp-card-num">{String(index + 1).padStart(2, "0")}</span> : null}
          <h3>{item.title}</h3>
          {item.text ? <p>{item.text}</p> : null}
        </li>
      ))}
    </ul>
  );
}

export function TreatmentDetail({ treatment, content }: { treatment: Treatment; content: TreatmentPageContent }) {
  const image = content.hero.image ?? treatmentImage(treatment.slug);
  const related = content.related
    .map((item) => ({ ...item, treatment: treatments.find((entry) => entry.slug === item.slug) }))
    .filter((item): item is typeof item & { treatment: Treatment } => Boolean(item.treatment));
  const { explainer, comparison, options, decides, comfort, warning, extra, infoCards, twoLists } = content;
  const equipment = content.why.equipment ?? [];
  // Section backgrounds alternate ivory and white. The soft "Why" band splits the page in two:
  // the first half starts on ivory after the white glance strip, the second ends on ivory before the CTA.
  const firstHalf = [
    "symptoms",
    ...(content.myths ? ["myths"] : []),
    ...(content.explainer ? ["what"] : []),
    "process",
    ...(options ? ["options"] : []),
    ...(content.comparison ? ["compare"] : []),
    ...(content.extra ? ["extra"] : []),
    ...(content.infoCards ? ["infoCards"] : []),
    ...(content.twoLists ? ["twoLists"] : []),
    ...(content.decides ? ["decides"] : []),
    ...(content.comfort ? ["comfort"] : []),
  ];
  const secondHalf = [
    ...(content.compact ? [] : ["doctor"]),
    "aftercare",
    ...(content.warning ? ["warning"] : []),
    "cost",
    "faq",
    "related",
  ];
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
                  <PhoneIcon className="call-icon" /> Call
                </a>
                <a className="btn btn-tertiary" href={whatsappHref()}>
                  WhatsApp Us
                </a>
              </div>
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
          <dl className={`tp-glance-list tp-glance-${content.glance.length}`}>
            {content.glance.map((item, index) => (
              <div key={item.title} className="reveal" style={stagger(index)}>
                <dt>{item.title}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <TreatmentSectionNav
        sections={[
          { id: "when", label: "When you may need it" },
          ...(explainer ? [{ id: "overview", label: "Overview" }] : []),
          { id: "procedure", label: "Procedure" },
          ...(options ? [{ id: "options", label: "Options" }] : []),
          { id: "aftercare", label: "Recovery" },
          { id: "cost", label: "Cost" },
          { id: "faqs", label: "FAQs" },
        ]}
      />

      {/* Symptoms */}
      <section id="when" className={`tp-section ${tone("symptoms")}`} aria-labelledby="symptoms-heading">
        <div className="tx-wrap">
          <SectionHead id="symptoms-heading" heading={content.symptoms.heading} intro={content.symptoms.intro} />
          {symptomGroups.map((group) => (
            <div key={group.label ?? "all"} className="tp-symptom-group">
              {group.label ? <p className="tp-group-label reveal">{group.label}</p> : null}
              <ul className={`tp-cards tp-cards-${group.items.length}`}>
                {group.items.map((item, index) => (
                  <li key={item.title} className="tp-card tp-symptom reveal" style={stagger(index % 3)}>
                    {item.image ? (
                      <span className="tp-symptom-art">
                        <Image src={item.image} alt="" width={160} height={160} sizes="112px" />
                      </span>
                    ) : (
                      <span className="tp-icon">
                        <SymptomGlyph icon={item.icon} />
                      </span>
                    )}
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    {item.link ? <LinkRow links={[item.link]} className="tp-card-link" /> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="tp-strip reveal">{content.symptoms.note}</p>
          {content.symptoms.illustration ? (
            <StageFigure kind={content.symptoms.illustration} caption={content.symptoms.caption ?? ""} />
          ) : null}
        </div>
      </section>

      {/* Myths */}
      {content.myths ? (
        <section className={`tp-section ${tone("myths")}`} aria-labelledby="myths-heading">
          <div className="tx-wrap">
            <SectionHead id="myths-heading" heading={content.myths.heading} intro={content.myths.intro} />
            <div className={content.myths.illustration || content.myths.image ? "tp-myths has-art" : "tp-myths"}>
              <ul>
                {content.myths.items.map((item, index) => (
                  <li key={item.myth} className="tp-myth reveal" style={stagger(index)}>
                    <p className="tp-myth-label">Myth</p>
                    <h3>&ldquo;{item.myth}&rdquo;</h3>
                    <p className="tp-myth-label is-fact">Fact</p>
                    <p>{item.fact}</p>
                  </li>
                ))}
              </ul>
              {content.myths.image ? (
                <figure className="tp-myths-art tp-stages-photo reveal">
                  <Image
                    src={content.myths.image.src}
                    alt={content.myths.image.alt}
                    width={content.myths.image.width}
                    height={content.myths.image.height}
                    sizes="(max-width: 900px) 100vw, 480px"
                  />
                  {content.myths.caption ? <figcaption>{content.myths.caption}</figcaption> : null}
                </figure>
              ) : content.myths.illustration ? (
                <StageFigure kind={content.myths.illustration} caption={content.myths.caption ?? ""} className="tp-myths-art" />
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* What it is */}
      {explainer ? (
        <section id="overview" className={`tp-section ${tone("what")}`} aria-labelledby="what-heading">
          <div className="tx-wrap">
            <div className="tp-explain">
              <SectionHead id="what-heading" heading={explainer.heading} />
              <div className="tp-prose">
                {explainer.paragraphs.map((paragraph, index) => (
                  <p key={paragraph} className="reveal" style={stagger(index)}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            {explainer.image ? (
              <figure className="tp-stages tp-stages-photo reveal">
                <Image
                  src={explainer.image.src}
                  alt={explainer.image.alt}
                  width={explainer.image.width}
                  height={explainer.image.height}
                  sizes="(max-width: 1180px) 100vw, 1140px"
                />
                {explainer.caption ? <figcaption>{explainer.caption}</figcaption> : null}
              </figure>
            ) : explainer.illustration ? (
              <StageFigure kind={explainer.illustration} caption={explainer.caption ?? ""} />
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Process */}
      <section id="procedure" className={`tp-section ${tone("process")}`} aria-labelledby="process-heading">
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
          {content.process.image ? (
            <figure className="tp-stages tp-stages-photo reveal">
              <Image
                src={content.process.image.src}
                alt={content.process.image.alt}
                width={content.process.image.width}
                height={content.process.image.height}
                sizes="(max-width: 1180px) 100vw, 1140px"
              />
              {content.process.caption ? <figcaption>{content.process.caption}</figcaption> : null}
            </figure>
          ) : content.process.illustration ? (
            <StageFigure kind={content.process.illustration} caption={content.process.caption ?? ""} />
          ) : null}
          {content.process.footnote ? <p className="tp-footnote reveal">{content.process.footnote}</p> : null}
        </div>
      </section>

      {/* Options */}
      {options ? (
        <section id="options" className={`tp-section ${tone("options")}`} aria-labelledby="options-heading">
          <div className="tx-wrap">
            <SectionHead id="options-heading" heading={options.heading} />
            <ul className={`tp-options tp-options-${options.items.length}`}>
              {options.items.map((option, index) => (
                <li key={option.title} className="tp-option reveal" style={stagger(index)}>
                  {option.image ? (
                    <span className="tp-option-art">
                      <Image src={option.image} alt="" width={400} height={400} sizes="(max-width: 680px) 90vw, 360px" />
                    </span>
                  ) : null}
                  <h3>{option.title}</h3>
                  <dl>
                    <div>
                      <dt>What it is</dt>
                      <dd>{option.what}</dd>
                    </div>
                    <div>
                      <dt>{options.suitsLabel ?? "May suit"}</dt>
                      <dd>{option.suits}</dd>
                    </div>
                  </dl>
                  {option.note ? <p className="tp-option-note">{option.note}</p> : null}
                  {option.links ? <LinkRow links={option.links} className="tp-card-link" /> : null}
                </li>
              ))}
            </ul>
            {options.note ? <p className="tp-strip reveal">{options.note}</p> : null}
          </div>
        </section>
      ) : null}

      {/* Comparison */}
      {comparison ? (
        <section className={`tp-section ${tone("compare")}`} aria-labelledby="compare-heading">
          <div className="tx-wrap">
            <SectionHead id="compare-heading" heading={comparison.heading} />
            {comparison.layout !== "table" && comparison.columns.length === 2 ? (
              <div className="tp-compare">
                {comparison.columns.map((column, columnIndex) => (
                  <div
                    key={column}
                    className={`tp-compare-col reveal${comparison.highlightFirst && columnIndex === 0 ? " is-keep" : ""}`}
                    style={stagger(columnIndex)}
                  >
                    <h3>{column}</h3>
                    <dl>
                      {comparison.rows.map((row) => (
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
                <table className={comparison.rowHeader ? "tp-table has-row-text" : "tp-table"}>
                  <thead>
                    <tr>
                      {comparison.rowHeader ? <th scope="col">{comparison.rowHeader}</th> : <td />}
                      {comparison.columns.map((column) => (
                        <th key={column} scope="col">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.rows.map((row) => (
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
            <p className="tp-closing reveal">{comparison.closing}</p>
            {comparison.links ? <LinkRow links={comparison.links} /> : null}
            {comparison.aside ? (
              <p className="tp-aside reveal">
                {comparison.aside.text}{" "}
                <Link className="text-link" href={comparison.aside.link.href}>
                  {comparison.aside.link.label} <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Extra explanatory section */}
      {extra ? (
        <section id={extra.id} className={`tp-section ${tone("extra")}`} aria-labelledby={`${extra.id}-heading`}>
          <div className="tx-wrap">
            <div className="tp-extra">
              <SectionHead id={`${extra.id}-heading`} heading={extra.heading} />
              <div className="tp-prose">
                {extra.paragraphs.map((paragraph, index) => (
                  <p key={paragraph} className="reveal" style={stagger(index)}>
                    {paragraph}
                  </p>
                ))}
              </div>
              {extra.list ? (
                <div className="tp-tips reveal">
                  {extra.listHeading ? <h3>{extra.listHeading}</h3> : null}
                  <ul>
                    {extra.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {extra.closing ? <p className="tp-closing reveal">{extra.closing}</p> : null}
              {extra.image ? (
                <figure className="tp-stages tp-stages-photo reveal">
                  <Image
                    src={extra.image.src}
                    alt={extra.image.alt}
                    width={extra.image.width}
                    height={extra.image.height}
                    sizes="(max-width: 1180px) 100vw, 1140px"
                  />
                </figure>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Info cards */}
      {infoCards ? (
        <section className={`tp-section ${tone("infoCards")}`} aria-labelledby="info-cards-heading">
          <div className="tx-wrap">
            <SectionHead id="info-cards-heading" heading={infoCards.heading} intro={infoCards.intro} />
            <ul className={`tp-cards tp-cards-${infoCards.items.length}`}>
              {infoCards.items.map((item, index) => (
                <li key={item.title} className="tp-card reveal" style={stagger(index)}>
                  <h3>{item.title}</h3>
                  {item.text ? <p>{item.text}</p> : null}
                  {item.link ? <LinkRow links={[item.link]} className="tp-card-link" /> : null}
                </li>
              ))}
            </ul>
            {infoCards.closing ? <p className="tp-closing reveal">{infoCards.closing}</p> : null}
          </div>
        </section>
      ) : null}

      {/* Two lists */}
      {twoLists ? (
        <section className={`tp-section ${tone("twoLists")}`} aria-labelledby="two-lists-heading">
          <div className="tx-wrap">
            <SectionHead id="two-lists-heading" heading={twoLists.heading} />
            <div className="tp-compare">
              {twoLists.columns.map((column, index) => (
                <div key={column.title} className={`tp-compare-col tp-list-col reveal${index === 0 ? " is-keep" : ""}`} style={stagger(index)}>
                  <h3>{column.title}</h3>
                  <ul>
                    {column.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {twoLists.closing ? <p className="tp-closing reveal">{twoLists.closing}</p> : null}
            {twoLists.links ? <LinkRow links={twoLists.links} /> : null}
          </div>
        </section>
      ) : null}

      {/* How your dentist decides */}
      {decides ? (
        <section className={`tp-section ${tone("decides")}`} aria-labelledby="decides-heading">
          <div className="tx-wrap">
            <SectionHead id="decides-heading" heading={decides.heading} intro={decides.intro} />
            <Cards items={decides.items} numbered />
            <p className="tp-closing reveal">{decides.closing}</p>
          </div>
        </section>
      ) : null}

      {/* Comfort */}
      {comfort ? (
        <section className={`tp-section ${tone("comfort")}`} aria-labelledby="comfort-heading">
          <div className="tx-wrap tp-split">
            <figure className="tp-split-media reveal reveal--scale">
              <Image
                src={comfort.image.src}
                alt={comfort.image.alt}
                width={comfort.image.width}
                height={comfort.image.height}
                sizes="(max-width: 900px) 100vw, 540px"
              />
            </figure>
            <div className="tp-prose">
              <SectionHead id="comfort-heading" heading={comfort.heading} />
              {comfort.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className="reveal" style={stagger(index + 1)}>
                  {paragraph}
                </p>
              ))}
              {comfort.tips ? (
                <div className="tp-tips reveal">
                  <h3>{comfort.tips.heading}</h3>
                  <ul>
                    {comfort.tips.items.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Why Roots & Pulp: the same shared section on every treatment page */}
      <WhyRootsPulp />

      {/* Treatment specific extras that used to sit inside the Why section: equipment and the doctor note */}
      {equipment.length || content.compact ? (
        <div className="tp-soft tp-why-extra">
          <div className="tx-wrap">
            {equipment.length ? (
              <ul className={`tp-equipment tp-equipment-${equipment.length}`}>
                {equipment.map((item, index) => (
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
                        {item.detail ? <span>{item.detail}</span> : null}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ) : null}
            {equipment.length ? (
              <p className="tp-footnote reveal">
                {content.why.equipmentNote}{" "}
                <Link className="text-link" href={content.why.galleryLink?.href ?? "/gallery/#equipment"}>
                  {content.why.galleryLink?.label ?? "See more in the gallery"} <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </p>
            ) : null}
            {content.compact ? (
              <p className="tp-footnote reveal">
                Your care is provided by {doctor.name}, {doctor.credentials}, {doctor.registration}.{" "}
                <Link className="text-link" href="/doctor/dr-shubham-tripathi/">
                  Meet Dr. Tripathi <span className="arrow" aria-hidden="true">→</span>
                </Link>
                {reviewed ? (
                  <span className="tp-reviewed">
                    {" "}
                    Clinically reviewed by {doctor.name}, {doctor.credentials}. Last reviewed: {reviewed}.
                  </span>
                ) : null}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Doctor */}
      {content.compact ? null : (
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
                {content.doctorQuote ? (
                  <blockquote>
                    <p>&ldquo;{content.doctorQuote}&rdquo;</p>
                  </blockquote>
                ) : null}
                {content.doctorNote ? <p className="tp-doctor-note">{content.doctorNote}</p> : null}
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
      )}

      {/* Aftercare */}
      <section id="aftercare" className={`tp-section ${tone("aftercare")}`} aria-labelledby="aftercare-heading">
        <div className="tx-wrap">
          <SectionHead id="aftercare-heading" heading={content.aftercare.heading} intro={content.aftercare.intro} />
          <Cards items={content.aftercare.items} numbered />
          {content.aftercare.followUp ? <p className="tp-strip reveal">{content.aftercare.followUp}</p> : null}
          {content.aftercare.callLine ? (
            <p className="tp-call-line reveal">
              <strong>When should I call?</strong> {content.aftercare.callLine}{" "}
              <a className="text-link" href={telHref()}>
                <PhoneIcon className="call-icon" /> Call
              </a>
            </p>
          ) : null}
        </div>
      </section>

      {/* When to contact */}
      {warning ? (
        <section className={`tp-section ${tone("warning")}`} aria-labelledby="warning-heading">
          <div className="tx-wrap">
            <div className="tp-warning reveal">
              <h2 id="warning-heading">{warning.heading}</h2>
              <p>{warning.intro}</p>
              <ul>
                {warning.signs.map((sign) => (
                  <li key={sign}>{sign}</li>
                ))}
              </ul>
              <p className="tp-warning-urgent">
                <strong>{warning.emergency}</strong>
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href={telHref()}>
                  <PhoneIcon className="call-icon" /> Call
                </a>
                <a className="btn btn-secondary" href={whatsappHref()}>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Cost */}
      <section id="cost" className={`tp-section ${tone("cost")}`} aria-labelledby="cost-heading">
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
        id="faqs"
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
