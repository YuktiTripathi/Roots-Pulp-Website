import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhoneIcon } from "@/components/Icons";
import { TreatmentDetail } from "@/components/treatments/TreatmentDetail";
import { TreatmentListItem, treatmentImage } from "@/components/treatments/TreatmentsLanding";
import { bookingUrl, telHref, treatments, whatsappHref } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import { treatmentPageJsonLd } from "@/lib/schema";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { treatmentPages } from "@/lib/treatmentPages";
import "../treatments.css";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return treatments.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const treatment = treatments.find((item) => item.slug === slug);
  if (!treatment) return { title: "Page Not Found · Roots & Pulp Dental Clinic" };
  const content = treatmentPages[slug];
  const path = `/treatments/${slug}/`;
  const image = treatmentImage(slug);
  const ogImage = image ? { url: image.src, alt: image.alt } : undefined;
  if (content) {
    return pageMetadata({
      title: content.seo.title,
      description: content.seo.description,
      path,
      image: ogImage,
    });
  }
  // A treatment without written content shows a short placeholder, which stays out of search results.
  return pageMetadata({
    title: `${treatment.name} · Roots & Pulp Dental Clinic, Aliganj`,
    description: treatment.overview,
    path,
    image: ogImage,
    noindex: true,
  });
}

export default async function TreatmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const treatment = treatments.find((item) => item.slug === slug);
  if (!treatment) notFound();

  const content = treatmentPages[treatment.slug];
  if (content) {
    const schema = treatmentPageJsonLd(treatment, content.seo, {
      image: treatmentImage(treatment.slug)?.src,
      reviewedOn: content.clinicallyReviewedOn || undefined,
    });
    return (
      <>
        <TreatmentDetail treatment={treatment} content={content} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      </>
    );
  }

  const related = treatments.filter((item) => item.slug !== treatment.slug).slice(0, 4);
  const image = treatmentImage(treatment.slug);

  return (
    <main id="content" className="treatments-page motion-page">
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
              <p className="eyebrow enter">{treatment.group}</p>
              <h1 id="treatment-heading" className="enter" style={stagger(1)}>
                {treatment.name}
              </h1>
              <p className="lede enter" style={stagger(2)}>
                {treatment.homeSummary ?? treatment.overview}
              </p>
              <p className="enter" style={stagger(3)}>
                A full explanation of this treatment is being prepared for publication. Dr. Shubham Tripathi can talk
                it through with you at the clinic.
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

      <section className="tx-detail-related" aria-labelledby="related-heading">
        <div className="tx-wrap">
          <h2 id="related-heading" className="reveal">
            Related treatments
          </h2>
          <ul className="tx-list">
            {related.map((item, index) => (
              <TreatmentListItem key={item.slug} treatment={item} index={index} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
