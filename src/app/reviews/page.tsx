import type { Metadata } from "next";
import { FinalCTA } from "@/components/FinalCTA";
import { PatientVideosSection } from "@/components/reviews/PatientVideosSection";
import { ReviewsGoogleCarousel } from "@/components/reviews/ReviewCarousel";
import { ReviewsHero } from "@/components/reviews/ReviewsHero";
import { ReviewsPolicy } from "@/components/reviews/ReviewsPolicy";
import "./reviews.css";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { webPageJsonLd } from "@/lib/schema";

const seo = {
  title: "Patient Reviews · Roots & Pulp Dental Clinic, Aliganj",
  description:
    "Read what patients say about Roots & Pulp Dental Clinic and Dr. Shubham Tripathi, and see all our reviews on Google.",
  path: "/reviews/",
};

export const metadata: Metadata = pageMetadata({ ...seo });

export default function ReviewsPage() {
  return (
    <main id="content" className="reviews-page motion-page">
      <ReviewsHero />
      <PatientVideosSection />
      <ReviewsGoogleCarousel />
      <ReviewsPolicy />
      <FinalCTA
        heading="Thinking about your next dental visit?"
        supporting="Not sure what treatment you need? That's okay. Start with a consultation and we'll help you understand your options."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          webPageJsonLd({ name: seo.title, description: seo.description, path: seo.path, type: "WebPage", breadcrumb: [{ name: "Reviews", path: "/reviews/" }] }),
        )}
      />
    </main>
  );
}
