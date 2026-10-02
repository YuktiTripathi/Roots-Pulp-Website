import type { Metadata } from "next";
import { FinalCTA } from "@/components/FinalCTA";
import { PatientVideosSection } from "@/components/reviews/PatientVideosSection";
import { ReviewsGoogleCarousel } from "@/components/reviews/ReviewCarousel";
import { ReviewsHero } from "@/components/reviews/ReviewsHero";
import { ReviewsPolicy } from "@/components/reviews/ReviewsPolicy";
import { siteUrl } from "@/lib/clinic";
import "./reviews.css";

export const metadata: Metadata = {
  title: "Patient Reviews · Roots & Pulp Dental Clinic, Aliganj",
  description:
    "Read what patients say about Roots & Pulp Dental Clinic and Dr. Shubham Tripathi, and see all our reviews on Google.",
  robots: { index: false, follow: true },
  alternates: siteUrl ? { canonical: "/reviews/" } : undefined,
};

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
    </main>
  );
}
