import Link from "next/link";
import { clinic, clinicPhotos } from "@/lib/clinic";

export function ClinicGallery() {
  return (
    <section className="section gallery" aria-labelledby="gallery-heading">
      <div className="section-inner">
        <div className="section-heading">
          <h2 id="gallery-heading">Inside the clinic</h2>
        </div>
        <ul className="gallery-grid">
          {clinicPhotos.map((photo) => (
            <li key={photo.caption}>
              <figure>
                {photo.src ? (
                  // Real clinic photographs are inserted through clinicPhotos when supplied.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                ) : (
                  <div className="photo-placeholder" role="img" aria-label={`${photo.alt}. Photograph to be added.`}>
                    <span>{photo.caption}</span>
                  </div>
                )}
                <figcaption>{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="gallery-note">
          {clinic.addressLine1}, {clinic.neighbourhood}, {clinic.landmark.toLowerCase()}.{" "}
          <Link className="text-link" href="/gallery/">
            See more of the clinic <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
