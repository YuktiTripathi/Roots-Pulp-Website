import Image from "next/image";
import Link from "next/link";
import { bookingUrl, doctor, doctorCredentials, doctorExperience } from "@/lib/clinic";
import { stagger } from "@/lib/motion";
import { ArrowIcon } from "./Icons";

export function DoctorSection() {
  return (
    <section className="section doctor-section" aria-labelledby="doctor-heading">
      <div className="section-inner doctor-grid">
        <div className="doctor-intro">
          <h2 id="doctor-heading" className="reveal">
            Meet Dr. Shubham Tripathi
          </h2>
          <p className="role reveal" style={stagger(1)}>
            BDS, MPH · Founder & Director
          </p>
        </div>
        <div className="doctor-photo reveal reveal--mask">
          <Image
            src={doctor.portrait}
            alt={doctor.profileAlt}
            width={doctor.portraitWidth}
            height={doctor.portraitHeight}
            sizes="(max-width: 800px) 70vw, 360px"
            className="doctor-portrait mask-img"
            unoptimized
          />
        </div>
        <div className="doctor-body">
          <p className="reveal" style={stagger(2)}>
            Dr. Tripathi brings {doctorExperience.inline} and a specialised certification in rotary
            endodontics to every consultation. His Master of Public Health gives him a strong focus on prevention:
            helping you avoid the next problem, not just fixing the current one.
          </p>
          <blockquote className="reveal" style={stagger(3)}>
            <p>&ldquo;{doctor.quote}&rdquo;</p>
          </blockquote>
          <ul className="credential-list">
            {doctorCredentials.map((item, index) => (
              <li key={item} className="reveal reveal--left credential-item" style={stagger(index)}>
                {item}
              </li>
            ))}
          </ul>
          <div className="hero-actions reveal" style={stagger(4)}>
            <Link className="btn btn-primary" href="/doctor/dr-shubham-tripathi/">
              Read Dr. Tripathi&apos;s profile <ArrowIcon className="arrow" />
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
