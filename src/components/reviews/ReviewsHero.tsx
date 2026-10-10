import { InnerPageHero } from "@/components/InnerPageHero";
import { stagger } from "@/lib/motion";

export function ReviewsHero() {
  return (
    <InnerPageHero
      crumb="Reviews"
      titleId="reviews-heading"
      title="What our Patients say Matters Most"
      image="/images/hero/smiling-patient-hero.webp"
      imageAlt="A patient smiling at her reflection in a hand mirror in the dental chair"
      imagePosition="center 88%"
    >
      <p className="lede line-full enter" style={stagger(1)}>
        See what patients have shared about their experience at Roots &amp; Pulp Dental Clinic.
      </p>
    </InnerPageHero>
  );
}
