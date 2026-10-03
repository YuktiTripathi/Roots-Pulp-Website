import Image from "next/image";
import Link from "next/link";
import { gallerySections } from "@/lib/gallery";
import { stagger } from "@/lib/motion";
import { ArrowIcon } from "./Icons";

/**
 * Equipment bento. Real clinic photographs only, each with its name and one plain-language line.
 * Cards link to the equipment section of the gallery, so the hover lift signals a real link.
 */
const bento = [
  { src: "/images/equipment/digital-xray-rvg.jpg", size: "is-large", focus: "center 30%", text: "X-rays appear on screen in seconds, so you can see what the dentist sees." },
  { src: "/images/equipment/intraoral-camera-cavities.jpg", size: "is-side", focus: "center", text: "A small camera shows your own teeth on screen, close up." },
  { src: "/images/equipment/apex-locator.jpg", size: "", focus: "center 40%", text: "Measures root canal length precisely during treatment." },
  // Cropped to the instrument window, away from the maker's labels.
  { src: "/images/equipment/uv-sterilisation-chamber.jpg", size: "", focus: "30% 55%", text: "Sterilised instruments are stored sealed until your visit." },
  { src: "/images/equipment/teeth-whitening-light.jpg", size: "", focus: "center 30%", text: "In-clinic whitening carried out under supervision." },
] as const;

const galleryImages = gallerySections.flatMap((section) => section.images);

export function EquipmentBento() {
  const items = bento
    .map((item) => {
      const photo = galleryImages.find((image) => image.src === item.src);
      return photo ? { ...item, photo } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <section className="section equipment" aria-labelledby="equipment-heading">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow reveal">Equipment & sterilisation</p>
          <h2 id="equipment-heading" className="reveal" style={stagger(1)}>
            The equipment behind your care
          </h2>
        </div>
        <ul className="bento" role="list">
          {items.map((item, index) => (
            <li key={item.src} className={`bento-cell reveal ${item.size}`} style={stagger(index)}>
              <Link className="bento-card lift zoom" href="/gallery/#equipment">
                <span className="bento-media zoom-media">
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    fill
                    sizes={item.size === "is-large" ? "(max-width: 720px) 100vw, 760px" : "(max-width: 720px) 50vw, 380px"}
                    style={{ objectPosition: item.focus }}
                  />
                </span>
                <span className="bento-copy">
                  <strong>
                    {item.photo.caption} <ArrowIcon className="arrow" />
                  </strong>
                  <span>{item.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="gallery-note reveal">
          <Link className="text-link" href="/gallery/">
            See the clinic and every piece of equipment <ArrowIcon className="arrow" />
          </Link>
        </p>
      </div>
    </section>
  );
}
