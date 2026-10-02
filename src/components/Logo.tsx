import Image from "next/image";
import Link from "next/link";
import { clinic } from "@/lib/clinic";

type LogoProps = {
  variant: "header" | "footer";
};

export function Logo({ variant }: LogoProps) {
  const alt = variant === "header" ? "Roots & Pulp Dental Clinic, home" : "Roots & Pulp Dental Clinic";

  return (
    <div className={`brand brand-${variant}`}>
      <Link href="/" className="brand-mark">
        <Image src="/images/logo.png" alt={alt} width={280} height={280} priority={variant === "header"} unoptimized />
      </Link>
      <div className="brand-copy">
        <Link href="/" className="brand-words">
          <span className="brand-name">Roots &amp; Pulp</span>
          <span className="brand-clinic">Dental Clinic</span>
        </Link>
        <p className="brand-tagline">{clinic.tagline}</p>
      </div>
    </div>
  );
}
