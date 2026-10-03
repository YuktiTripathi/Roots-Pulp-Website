import type { Metadata } from "next";
import "./home.css";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { ClinicGallery } from "@/components/ClinicGallery";
import { EquipmentBento } from "@/components/EquipmentBento";
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
import { homeSeo } from "@/lib/clinic";
import { homeWebPageJsonLd } from "@/lib/schema";
import { jsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: homeSeo.title, description: homeSeo.description, path: "/" });

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
      <EquipmentBento />
      <ReviewsSection />
      <BeforeAfterSection />
      <DentalGuideCards />
      <FAQSection />
      <VisitSection />
      <FinalCTA showCall />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webpage)} />
    </main>
  );
}
