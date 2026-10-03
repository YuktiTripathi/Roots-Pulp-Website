import Image from "next/image";
import Link from "next/link";
import { bookingUrl, doctor, doctorCredentials } from "@/lib/clinic";

export function DoctorSection() {
  return (
    <section className="section doctor-section" aria-labelledby="doctor-heading">
      <div className="section-inner doctor-grid">
        <div className="doctor-intro">
          <h2 id="doctor-heading">Meet Dr. Shubham Tripathi</h2>
          <p className="role">BDS, MPH · Founder & Director</p>
        </div>
        <div className="doctor-photo reveal">
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
        <div className="doctor-body">
          <p>
            Dr. Tripathi brings over seven years of clinical experience and a specialised certification in rotary
            endodontics to every consultation. His Master of Public Health gives him a strong focus on prevention:
            helping you avoid the next problem, not just fixing the current one.
          </p>
          <blockquote>
            <p>&ldquo;{doctor.quote}&rdquo;</p>
          </blockquote>
          <ul className="credential-list">
            {doctorCredentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
