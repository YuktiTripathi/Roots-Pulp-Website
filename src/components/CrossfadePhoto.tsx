import Image from "next/image";
import type { ClinicPhoto } from "@/lib/photos";

/** Stacks photos in one frame and fades to the active one. Inactive photos are hidden from assistive tech. */
export function CrossfadePhoto({
  photos,
  active,
  sizes,
  className,
}: {
  photos: readonly ClinicPhoto[];
  active: number;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`crossfade-photo${className ? ` ${className}` : ""}`}>
      {photos.map((photo, index) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={index === active ? photo.alt : ""}
          aria-hidden={index === active ? undefined : true}
          fill
          sizes={sizes}
          className={index === active ? "is-active" : undefined}
          style={{ objectPosition: photo.position }}
        />
      ))}
    </div>
  );
}
