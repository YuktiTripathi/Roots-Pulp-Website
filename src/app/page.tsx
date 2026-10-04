import type { Metadata } from "next";
import "./home.css";
import "./reviews/reviews.css";
import { ConcernCards } from "@/components/ConcernCards";
import { DoctorSection } from "@/components/DoctorSection";
import { FAQSection } from "@/components/FAQSection";
import { FeaturedTreatments } from "@/components/FeaturedTreatments";
import { FinalCTA } from "@/components/FinalCTA";
import { FirstVisitTimeline } from "@/components/FirstVisitTimeline";
import { Hero } from "@/components/Hero";
import { InsideClinic } from "@/components/InsideClinic";
import { RealCases } from "@/components/cases/RealCases";
import { ReviewsSection } from "@/components/ReviewsSection";
import { TechnologySection } from "@/components/TechnologySection";
import { VisitSection } from "@/components/VisitSection";
import { WhyDifferent } from "@/components/WhyDifferent";
import { homeSeo } from "@/lib/clinic";
import { homeWebPageJsonLd } from "@/lib/schema";
import { jsonLd, pageMetadata } from "@/lib/seo";

/** The page is static and regenerated in the background at most once a week (Google rating). */
export const revalidate = 604800;

export const metadata: Metadata = pageMetadata({ title: homeSeo.title, description: homeSeo.description, path: "/" });

export default function HomePage() {
  const webpage = homeWebPageJsonLd();

  return (
    <main id="content" className="home-main">
      <Hero />
      <ConcernCards />
      <FeaturedTreatments />
      <RealCases />
      <WhyDifferent />
      <DoctorSection />
      <FirstVisitTimeline />
      <InsideClinic />
      <TechnologySection />
      <ReviewsSection />
      <FAQSection />
      <VisitSection />
      <FinalCTA
        heading="Not sure what your teeth need?"
        supporting="Start with a conversation. Tell us what's bothering you, and we'll help you understand what comes next."
        showCall
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(webpage)} />
    </main>
  );
}
