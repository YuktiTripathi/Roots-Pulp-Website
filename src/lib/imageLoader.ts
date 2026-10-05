/**
 * next/image loader for images pre-sized at build time by scripts/build-images.mjs.
 * /images/a/b.jpg at width 640 -> /_img/images/a/b.jpg.640.webp, a static file on the CDN.
 * Anything outside /images (none today) falls back to the original file.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/images/")) return src;
  return `/_img${src}.${width}.webp`;
}
