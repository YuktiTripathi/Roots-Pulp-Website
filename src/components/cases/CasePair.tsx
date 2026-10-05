import Image from "next/image";
import type { CaseImage } from "@/lib/cases";

type Props = {
  before: CaseImage;
  after: CaseImage;
  sizes: string;
};

/** Before and after side by side, each with its own label. No slider and no motion. */
export function CasePair({ before, after, sizes }: Props) {
  return (
    <div className="cases-pair">
      {[
        { image: before, label: "Before" },
        { image: after, label: "After" },
      ].map(({ image, label }) => (
        <figure key={label} className="cases-pair-item" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
          <Image src={image.src} alt={image.alt} fill sizes={sizes} loading="lazy" />
          <figcaption className="cases-compare-tag cases-pair-tag">{label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
