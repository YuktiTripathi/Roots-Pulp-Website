import { patientStories } from "@/lib/patientReviews";

export function PatientStoriesSection() {
  if (!patientStories.length) {
    return (
      <section className="section reviews-stories" aria-labelledby="stories-heading">
        <div className="section-inner reviews-stories-minimal">
          <h2 id="stories-heading">More than a review — a patient&apos;s story</h2>
          <p>
            Some experiences deserve a little more room. Explore real patient stories and experiences from Roots &amp;
            Pulp.
          </p>
          <p className="reviews-ready-note">Longer stories will be published here with the patient&apos;s permission.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section reviews-stories" aria-labelledby="stories-heading">
      <div className="section-inner">
        <div className="section-heading">
          <h2 id="stories-heading">More than a review — a patient&apos;s story</h2>
          <p>
            Some experiences deserve a little more room. Explore real patient stories and experiences from Roots &amp;
            Pulp.
          </p>
        </div>
        <ul className="patient-story-grid">
          {patientStories.map((story) => (
            <li key={story.id}>
              <h3>{story.title}</h3>
              <p>{story.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
