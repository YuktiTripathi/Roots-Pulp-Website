import Image from "next/image";
import Link from "next/link";
import { bookingUrl, doctor, doctorExperience } from "@/lib/clinic";
import { doctorIntro } from "@/lib/homeContent";
import { stagger } from "@/lib/motion";

export function DoctorSection() {
  return (
    <section className="section doctor-section" aria-labelledby="doctor-heading">
      <div className="section-inner doctor-grid">
        <div className="doctor-photo reveal reveal--left">
          {/* TODO: replace with a relaxed natural-light portrait without folded arms once photographed. */}
          <Image
            src={doctor.portrait}
            alt={doctor.heroAlt}
            width={doctor.portraitWidth}
            height={doctor.portraitHeight}
            sizes="(max-width: 800px) 70vw, 360px"
            className="doctor-portrait"
          />
        </div>
        <div className="doctor-body reveal reveal--right" style={stagger(1)}>
          <h2 id="doctor-heading">{doctorIntro.heading}</h2>
          <p className="doctor-lead">{doctorIntro.supporting}</p>
          {doctorIntro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="doctor-credline">
            {doctorIntro.credentialPrefix}
            {doctorExperience.inline}
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/doctor/dr-shubham-tripathi/">
              Meet Dr. Shubham <span aria-hidden="true">→</span>
            </Link>
            <Link className="btn btn-secondary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
