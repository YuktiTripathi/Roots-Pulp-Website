import type { Metadata } from "next";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { ClinicGallery } from "@/components/ClinicGallery";
import { ClinicShowcase } from "@/components/ClinicShowcase";
import { ConcernCards } from "@/components/ConcernCards";
import { DentalGuideCards } from "@/components/DentalGuideCards";
import { DoctorSection } from "@/components/DoctorSection";
import { EditorialStatements } from "@/components/EditorialStatements";
import { ExpectationsSection } from "@/components/ExpectationsSection";
import { FAQSection } from "@/components/FAQSection";
import { FeaturedTreatments } from "@/components/FeaturedTreatments";
import { FinalCTA } from "@/components/FinalCTA";
import { FirstVisitTimeline } from "@/components/FirstVisitTimeline";
import { Hero } from "@/components/Hero";
import { ReviewsSection } from "@/components/ReviewsSection";
import { RootsAndPulpStory } from "@/components/RootsAndPulpStory";
import { TrustStrip } from "@/components/TrustStrip";
import { VisitSection } from "@/components/VisitSection";
import { homeSeo, siteUrl } from "@/lib/clinic";
import { homeWebPageJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  alternates: siteUrl ? { canonical: "/" } : undefined,
};

export default function HomePage() {
  const webpage = homeWebPageJsonLd();

  return (
    <main id="content">
      <Hero />
      <TrustStrip />
      <RootsAndPulpStory />
      <EditorialStatements />
      <DoctorSection />
      <ConcernCards />
      <FeaturedTreatments />
      <ExpectationsSection />
      <FirstVisitTimeline />
      <ClinicShowcase />
      <ClinicGallery />
      <ReviewsSection />
      <BeforeAfterSection />
      <DentalGuideCards />
      <FAQSection />
      <VisitSection />
      <FinalCTA />
      {webpage ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }} />
      ) : null}
    </main>
  );
}
