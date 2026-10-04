import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { treatmentHref } from "@/lib/clinic";
import { treatmentPages } from "@/lib/treatmentPages";

/*
 * Real dental cases for the homepage section.
 *
 * TODO [NEW PHOTO REQUIRED]: 10 to 12 real case photographs with matched before and after framing,
 * plus the intake sheet (concern, title, one true sentence, treatment page, mode, visits if known,
 * written consent, no faces) for each case.
 * TODO [VERIFY BEFORE PUBLISHING]: written patient consent for every case, and that no face or
 * identifying detail is visible. Intraoral and tooth level images only.
 * TODO [VERIFY BEFORE PUBLISHING]: that publishing clinical photographs on the clinic website complies
 * with the Dental Council of India and state council advertising rules.
 *
 * Images live in public/images/cases/, named for example
 * root-canal-treatment-molar-aliganj-lucknow-before.webp or dental-implant-case-roots-and-pulp.webp.
 * Export at 1600px on the long edge, WebP, quality 80 to 85, with EXIF and GPS data stripped.
 * Before and after images of one case must share the same framing, angle and crop: the comparison
 * uses one aspect ratio, taken from the after image.
 */

export type CaseImage = {
  /** /images/cases/... */
  src: string;
  /** Describes the real visual. */
  alt: string;
  /** Intrinsic size, required to reserve space. */
  width: number;
  height: number;
};

export type DentalCase = {
  id: string;
  mode: "comparison" | "editorial";
  featured: boolean;
  /** 1 = Case A, 2 = B, 3 = C, 4 = D, 5 and above = "More cases". */
  order: number;
  /** Short label, for example "Broken front tooth". */
  concern: string;
  /** For example "Composite restoration". */
  title: string;
  /** One line, only what is true. */
  summary: string;
  /** Must match a slug in treatmentPages. */
  treatmentSlug: string;
  /** Required when mode is "comparison". */
  before?: CaseImage;
  /** Required when mode is "comparison". */
  after?: CaseImage;
  /** Required when mode is "editorial". */
  image?: CaseImage;
  /** Optional longer text, shown in the drawer only. */
  detail?: string;
  /** Optional, ONLY if supplied by the clinic. */
  visits?: string;
  /** Must be true or the case is skipped. */
  consent: boolean;
};

/**
 * Set to "/cases/" once a dedicated cases page exists. While null, no "View more" link renders.
 * TODO [CLINIC DETAIL REQUIRED]: whether a /cases/ page should be built for the remaining cases. When it
 * exists, set this to "/cases/" and add it to the sitemap and indexableRoutes.
 */
export const casesPageHref: string | null = null;

export const dentalCases: DentalCase[] = [
  // TODO [VERIFY BEFORE PUBLISHING]: concern, title, summary and treatment page for each case were written
  // from the photographs alone. Dr. Shubham to confirm the treatment actually carried out, and that
  // written consent is on file: consent is set to true on the clinic's instruction to publish these.
  {
    id: "teeth-cleaning-stains-tartar",
    mode: "comparison",
    featured: true,
    order: 1,
    concern: "Heavy stains and tartar",
    title: "Professional teeth cleaning",
    summary: "Heavy stain and tartar deposits were cleaned from the teeth and along the gum line.",
    treatmentSlug: "teeth-cleaning",
    before: {
      src: "/images/cases/teeth-cleaning-heavy-stains-tartar-aliganj-lucknow-before.webp",
      alt: "Before view of teeth with heavy brown stains and tartar along the gum line, Roots & Pulp Dental Clinic, Aliganj, Lucknow",
      width: 1080,
      height: 612,
    },
    after: {
      src: "/images/cases/teeth-cleaning-heavy-stains-tartar-aliganj-lucknow-after.webp",
      alt: "After view of the same teeth cleaned of stains and tartar",
      width: 1080,
      height: 612,
    },
    consent: true,
  },
  {
    id: "front-teeth-gap",
    mode: "comparison",
    featured: true,
    order: 2,
    concern: "Gap between front teeth",
    title: "Closing a front tooth gap",
    summary: "The gap between the two upper front teeth was closed.",
    treatmentSlug: "cosmetic-dentistry",
    before: {
      src: "/images/cases/cosmetic-front-teeth-gap-closure-aliganj-lucknow-before.webp",
      alt: "Before view of a visible gap between the upper front teeth, Roots & Pulp Dental Clinic, Aliganj, Lucknow",
      width: 1080,
      height: 611,
    },
    after: {
      src: "/images/cases/cosmetic-front-teeth-gap-closure-aliganj-lucknow-after.webp",
      alt: "After view of the same upper front teeth with the gap closed",
      width: 1080,
      height: 611,
    },
    consent: true,
  },
  {
    id: "broken-front-tooth",
    mode: "comparison",
    featured: true,
    order: 3,
    concern: "Broken front tooth",
    title: "Front tooth restoration",
    summary: "The broken edge of an upper front tooth was rebuilt to a natural shape.",
    treatmentSlug: "tooth-coloured-fillings",
    before: {
      src: "/images/cases/tooth-coloured-filling-broken-front-tooth-aliganj-lucknow-before.webp",
      alt: "Before view of a chipped upper front tooth with a broken edge, Roots & Pulp Dental Clinic, Aliganj, Lucknow",
      width: 1080,
      height: 611,
    },
    after: {
      src: "/images/cases/tooth-coloured-filling-broken-front-tooth-aliganj-lucknow-after.webp",
      alt: "After view of the same front tooth restored to its full shape",
      width: 1080,
      height: 611,
    },
    consent: true,
  },
  {
    id: "missing-front-teeth",
    mode: "comparison",
    featured: true,
    order: 4,
    concern: "Broken and missing front teeth",
    title: "Rebuilding the upper front teeth",
    summary: "Broken, decayed and missing upper front teeth were restored to a complete row.",
    treatmentSlug: "crowns-and-bridges",
    before: {
      src: "/images/cases/crowns-bridges-broken-missing-front-teeth-aliganj-lucknow-before.webp",
      alt: "Before view of broken, decayed and missing upper front teeth, Roots & Pulp Dental Clinic, Aliganj, Lucknow",
      width: 1080,
      height: 414,
    },
    after: {
      src: "/images/cases/crowns-bridges-broken-missing-front-teeth-aliganj-lucknow-after.webp",
      alt: "After view of a complete, even row of upper front teeth",
      width: 1080,
      height: 414,
    },
    consent: true,
  },
  {
    id: "yellow-stained-teeth",
    mode: "comparison",
    featured: true,
    order: 5,
    concern: "Yellow, stained teeth",
    title: "Teeth whitening",
    summary: "Yellow staining on the front teeth was lightened.",
    treatmentSlug: "teeth-whitening",
    before: {
      src: "/images/cases/teeth-whitening-yellow-stains-aliganj-lucknow-before.webp",
      alt: "Before view of yellow stained front teeth, Roots & Pulp Dental Clinic, Aliganj, Lucknow",
      width: 1024,
      height: 560,
    },
    after: {
      src: "/images/cases/teeth-whitening-yellow-stains-aliganj-lucknow-after.webp",
      alt: "After view of the same teeth noticeably lighter in shade",
      width: 1024,
      height: 560,
    },
    consent: true,
  },
];

/** Natural link labels, one per treatment. Do not repeat exact match phrases across cases. */
export const caseLinkLabels: Record<string, string> = {
  "root-canal-treatment": "About root canal treatment",
  "dental-implants": "Explore dental implants",
  "crowns-and-bridges": "About crowns and bridges",
  "cosmetic-dentistry": "See cosmetic dentistry options",
  "gum-and-oral-health": "About gum care",
  "tooth-coloured-fillings": "About tooth coloured fillings",
  "teeth-whitening": "About teeth whitening",
  "teeth-cleaning": "About teeth cleaning",
  "braces-and-aligners": "About braces and aligners",
};

export function caseTreatmentHref(slug: string) {
  return treatmentHref(slug);
}

export function caseLinkLabel(slug: string) {
  return caseLinkLabels[slug] ?? "About this treatment";
}

/** A case that passed validation, with its treatment link resolved for the client components. */
export type RenderableCase = DentalCase & { link: { href: string; label: string } };

function imageExists(image: CaseImage) {
  return existsSync(path.join(process.cwd(), "public", image.src));
}

function skipReason(item: DentalCase): string | null {
  if (item.consent !== true) return "consent is not true";
  const required = item.mode === "comparison" ? [item.before, item.after] : [item.image];
  if (required.some((image) => !image)) {
    return item.mode === "comparison" ? "comparison case needs before and after images" : "editorial case needs an image";
  }
  const missing = required.find((image) => image && !imageExists(image));
  if (missing) return `image file not found: ${missing.src}`;
  if (!treatmentPages[item.treatmentSlug]) return `no treatment page for "${item.treatmentSlug}"`;
  return null;
}

/** Valid cases sorted by order: the first four are featured (A to D), the rest go to "More cases". */
export function getRenderableCases(cases: DentalCase[] = dentalCases) {
  const valid: RenderableCase[] = cases
    .filter((item) => {
      const reason = skipReason(item);
      if (reason && process.env.NODE_ENV !== "production") {
        console.warn(`[cases] Skipping case "${item.id}": ${reason}.`);
      }
      return !reason;
    })
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      ...item,
      link: { href: caseTreatmentHref(item.treatmentSlug), label: caseLinkLabel(item.treatmentSlug) },
    }));

  return { featured: valid.slice(0, 4), more: valid.slice(4) };
}
