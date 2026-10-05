import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import "./inner-page-hero.css";

type Overlay = "light" | "medium" | "strong";

type Props = {
  /** Breadcrumb label for this page. */
  crumb: string;
  /** The page's h1. */
  title: ReactNode;
  /** Gives the h1 an id for aria-labelledby. */
  titleId: string;
  eyebrow?: string;
  /** One short line under the title, on the image. */
  subtitle?: string;
  image: string;
  imageAlt: string;
  /** object-position, so faces and subjects stay in frame. */
  imagePosition?: string;
  /** Default medium matches the original Reviews hero. */
  overlayStrength?: Overlay;
  /**
   * "center" (default) centres the text over the image. "start" sets it to the left, for a
   * photograph whose subject is on the right (for example a portrait), so the text never covers a face.
   */
  contentAlign?: "center" | "start";
  /** "long" sets a smaller title size for headings over about 40 characters, so they stay at 2 or 3 lines. */
  titleSize?: "default" | "long";
  /** Page specific copy and actions, shown centred under the image. */
  children?: ReactNode;
};

/**
 * Full width editorial hero for the major inner pages, based on the Reviews page hero.
 * Same height, overlay, type and spacing everywhere; image, text and crop vary per page.
 */
export function InnerPageHero({
  crumb,
  title,
  titleId,
  eyebrow,
  subtitle,
  image,
  imageAlt,
  imagePosition = "center",
  overlayStrength = "medium",
  contentAlign = "center",
  titleSize = "default",
  children,
}: Props) {
  return (
    <section className="iph" aria-labelledby={titleId}>
      <div className="iph-inner">
        <nav className="crumbs iph-crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">{crumb}</li>
          </ol>
        </nav>
      </div>
      <div className={`iph-banner iph-overlay-${overlayStrength} iph-align-${contentAlign}`}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="iph-photo"
          style={{ objectPosition: imagePosition }}
        />
        <div className="iph-caption">
          {eyebrow ? <p className="iph-eyebrow enter">{eyebrow}</p> : null}
          <h1 id={titleId} className={titleSize === "long" ? "enter iph-title-long" : "enter"}>
            {title}
          </h1>
          {subtitle ? <p className="iph-subtitle enter">{subtitle}</p> : null}
        </div>
      </div>
      {children ? <div className="iph-inner iph-after">{children}</div> : null}
    </section>
  );
}
