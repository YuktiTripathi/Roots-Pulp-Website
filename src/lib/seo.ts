import type { Metadata } from "next";
import { clinic, siteUrl, treatments } from "./clinic";
import { treatmentPages } from "./treatmentPages";

/** Default social image: the clinic's 1200 x 630 Open Graph card. */
export const defaultOgImage = {
  url: "/images/og-home.jpg",
  width: 1200,
  height: 630,
  alt: "Roots & Pulp Dental Clinic, Aliganj, Lucknow",
};

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageSeo = {
  title: string;
  description: string;
  /** Path with a trailing slash, matching next.config's trailingSlash. */
  path: string;
  image?: { url: string; width?: number; height?: number; alt: string };
  /** Utility and legal pages stay out of search results. Indexable pages inherit the layout default. */
  noindex?: boolean;
};

/**
 * Metadata for one page: title, description, canonical, Open Graph and Twitter.
 * Open Graph is replaced (not merged) per page in Next.js, so the shared fields are repeated here.
 */
export function pageMetadata({ title, description, path, image = defaultOgImage, noindex }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      siteName: clinic.name,
      locale: "en_IN",
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

/** Serialises JSON-LD for a <script> tag, escaping "<" so content can never close the tag early. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

/** Treatment slugs that have full page content. Slugs without it render a short noindex placeholder. */
export const publishedTreatmentSlugs = treatments
  .map((item) => item.slug)
  .filter((slug) => Boolean(treatmentPages[slug]));

/**
 * Every page that should be indexed, with sitemap hints. Utility and legal pages
 * (book-appointment, privacy-policy, terms, medical-disclaimer) are deliberately absent.
 */
export const indexableRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/treatments/", priority: 0.9, changeFrequency: "monthly" },
  ...publishedTreatmentSlugs.map((slug) => ({
    path: `/treatments/${slug}/`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/doctor/dr-shubham-tripathi/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/reviews/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/gallery/", priority: 0.5, changeFrequency: "monthly" },
  { path: "/faq/", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy-policy/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/medical-disclaimer/", priority: 0.2, changeFrequency: "yearly" },
];
