import Image from "next/image";
import Link from "next/link";
import { bookingUrl, doctor, doctorCredentials, doctorExperience } from "@/lib/clinic";

const highlights = [
  { label: "BDS", detail: "Bachelor of Dental Surgery" },
  { label: "MPH", detail: "Master of Public Health" },
  { label: "Founder", detail: "Founder & Director" },
  { label: "20606", detail: "U.P. State Dental Council" },
] as const;

export function DoctorExperience() {
  return (
    <section className="section doctor-section doctor-experience" aria-labelledby="doctor-heading">
      <div className="section-inner doctor-grid">
        <div className="doctor-intro">
          <p className="eyebrow">Doctor-led care</p>
          <h2 id="doctor-heading">Meet Dr. Shubham Tripathi</h2>
          <p className="role">BDS, MPH · Founder & Director</p>
        </div>
        <div className="doctor-photo">
          <div className="doctor-photo-frame">
            <Image
              src={doctor.portrait}
              alt={doctor.profileAlt}
              width={doctor.portraitWidth}
              height={doctor.portraitHeight}
              sizes="(max-width: 800px) 70vw, 360px"
              className="doctor-portrait"
              unoptimized
            />
          </div>
          <ul className="doctor-float" aria-label="Verified credentials">
            {highlights.map((item) => (
              <li key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="doctor-body">
          <p>
            Dr. Tripathi brings {doctorExperience.inline} and a specialised certification in rotary
            endodontics to every consultation. His Master of Public Health gives him a strong focus on prevention:
            helping you avoid the next problem, not just fixing the current one.
          </p>
          <blockquote>
            <p>&ldquo;{doctor.quote}&rdquo;</p>
          </blockquote>
          <ol className="doctor-timeline">
            {doctorCredentials.map((item, index) => (
              <li key={item}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/doctor/dr-shubham-tripathi/">
              Read Dr. Tripathi&apos;s profile
            </Link>
            <Link className="btn btn-secondary" href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Book with Dr. Tripathi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export const DoctorSection = DoctorExperience;
