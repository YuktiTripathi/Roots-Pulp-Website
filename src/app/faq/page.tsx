import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@/components/FAQSection";
import { clinic, telHref, treatmentHref, treatments, whatsappHref } from "@/lib/clinic";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/schema";
import { treatmentPages } from "@/lib/treatmentPages";

const seo = {
  title: "Dental FAQs · Roots & Pulp Dental Clinic, Aliganj",
  description:
    "Answers to common questions about appointments, first visits, children's dental care, root canals, implants and braces at Roots & Pulp, Aliganj, Lucknow.",
  path: "/faq/",
};

export const metadata: Metadata = pageMetadata({ ...seo });

/** One question from each treatment page, quoted as written there, with a link to read more. */
const treatmentQuestions: [slug: string, question: string][] = [
  ["root-canal-treatment", "Does a root canal hurt?"],
  ["dental-implants", "How do I know if I'm suitable for an implant?"],
  ["crowns-and-bridges", "What should I do if my crown comes off?"],
  ["braces-and-aligners", "Can adults get braces or aligners?"],
  ["childrens-dentistry", "When should my child first see a dentist?"],
  ["teeth-cleaning", "How often should I have my teeth cleaned?"],
  ["teeth-whitening", "Will whitening work on my fillings or crowns?"],
];

const treatmentFaqs = treatmentQuestions.flatMap(([slug, question]) => {
  const faq = treatmentPages[slug]?.faqs.find((item) => item.question === question);
  const name = treatments.find((item) => item.slug === slug)?.name;
  if (!faq || !name) return [];
  return [{ question, answer: faq.answer, link: { label: `Read about ${name.toLowerCase()}`, href: treatmentHref(slug) } }];
});

export default function FaqPage() {
  return (
    <main id="content">
      <div className="page" style={{ paddingBottom: 0 }}>
        <p className="crumbs">
          <Link href="/">Home</Link> · FAQ
        </p>
        <h1>Frequently asked questions</h1>
        <p className="lede">
          Can&apos;t find your answer? Call <a href={telHref()}>{clinic.phoneDisplay}</a> or WhatsApp{" "}
          <a href={whatsappHref()}>{clinic.whatsappDisplay}</a>.
        </p>
        <h2 className="faq-group-heading">Visiting the clinic</h2>
      </div>
      <FAQSection showHeading={false} />
      <div className="page" style={{ paddingBottom: 0, paddingTop: 0 }}>
        <h2 className="faq-group-heading">Treatments</h2>
      </div>
      <FAQSection showHeading={false} items={treatmentFaqs} />
      <div className="page" style={{ paddingTop: 0 }}>
        <p>
          More questions are answered on each <Link href="/treatments/">treatment page</Link>, or{" "}
          <Link href="/contact/">contact the clinic</Link> directly.
        </p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          webPageJsonLd({ name: seo.title, description: seo.description, path: seo.path, breadcrumb: [{ name: "FAQ", path: "/faq/" }] }),
        )}
      />
    </main>
  );
}
