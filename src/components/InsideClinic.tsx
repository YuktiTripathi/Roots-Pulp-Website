import Image from "next/image";
import Link from "next/link";
import { insideClinic } from "@/lib/homeContent";
import { stagger } from "@/lib/motion";

/** One large photograph and two smaller ones. Only real photographs; no placeholders. */
export function InsideClinic() {
  const [large, ...small] = insideClinic.photos;
  return (
    <section className="section inside-clinic" aria-labelledby="inside-clinic-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow reveal">{insideClinic.eyebrow}</p>
          <h2 id="inside-clinic-heading" className="reveal" style={stagger(1)}>
            {insideClinic.heading}
          </h2>
          <p className="section-intro reveal" style={stagger(2)}>
            {insideClinic.intro}
          </p>
        </div>
        {/* TODO [NEW PHOTO REQUIRED]: reception area, waiting area and a wide treatment-room shot in daylight. Add them to this grid when available. Do not render empty placeholders. */}
        <div className="inside-grid">
          <figure className="inside-large reveal reveal--mask">
            <Image
              src={large.src}
              alt={large.alt}
              width={large.width}
              height={large.height}
              sizes="(max-width: 720px) 100vw, 680px"
              className="mask-img"
            />
          </figure>
          <div className="inside-small">
            {small.map((photo, index) => (
              <figure key={photo.src} className="reveal" style={stagger(index + 1)}>
                <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 720px) 50vw, 440px" />
              </figure>
            ))}
          </div>
        </div>
        <p className="section-more reveal">
          <Link className="text-link" href="/gallery/">
            Explore the Gallery <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
