import Image from "next/image";
import Link from "next/link";
import { gallerySections } from "@/lib/gallery";
import { technology } from "@/lib/homeContent";
import { stagger } from "@/lib/motion";

const galleryImages = gallerySections.flatMap((section) => section.images);

/** The five verified pieces of equipment. Photos are shown whole, never cropped hard. */
export function TechnologySection() {
  const items = technology.items.flatMap((item) => {
    const photo = galleryImages.find((image) => image.src === item.src);
    return photo && photo.width && photo.height ? [{ ...item, photo: { ...photo, width: photo.width, height: photo.height } }] : [];
  });

  return (
    <section className="section technology" aria-labelledby="technology-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow reveal">{technology.eyebrow}</p>
          <h2 id="technology-heading" className="reveal" style={stagger(1)}>
            {technology.heading}
          </h2>
        </div>
        <ul className="tech-row" role="list">
          {items.map((item, index) => (
            <li key={item.src} className="tech-card reveal" style={stagger(index)}>
              <span className="tech-media">
                <Image
                  src={item.photo.src}
                  alt={item.photo.alt}
                  width={item.photo.width}
                  height={item.photo.height}
                  sizes="(max-width: 720px) 70vw, 220px"
                />
              </span>
              <h3>{item.title}</h3>
              <p>{item.benefit}</p>
            </li>
          ))}
        </ul>
        <p className="section-more reveal">
          <Link className="text-link" href="/gallery/">
            See all equipment in the gallery <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
