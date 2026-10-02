import { PatientVideoCard } from "@/components/reviews/PatientVideoCard";
import { patientVideos } from "@/lib/patientReviews";

export function PatientVideosSection() {
  return (
    <section className="section reviews-videos" id="patient-videos" aria-labelledby="videos-heading">
      <div className="section-inner">
        <div className="section-heading reveal">
          <h2 id="videos-heading">Hear it from the people we care for</h2>
          <p className="reviews-italic">
            Every smile has a story. Hear directly from our patients as they share their experience at Roots &amp; Pulp.
          </p>
        </div>
        {patientVideos.length > 0 ? (
          <div className="patient-video-grid">
            {patientVideos.map((video, index) => (
              <PatientVideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        ) : (
          <div className="reviews-ready">
            <p>
              Patient experience videos will appear here once they are supplied by the clinic. This space is reserved
              for real voices only.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
