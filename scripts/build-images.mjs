/**
 * Pre-sizes every image in public/images into public/_img at the widths the site requests,
 * so pages are served plain static files from the CDN instead of waiting for on-demand resizing.
 * Runs before `next build` and `next dev`. Output is generated, not committed (see .gitignore).
 * Width list must match deviceSizes + imageSizes in next.config.ts.
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const WIDTHS = [128, 256, 384, 640, 828, 1080, 1440, 1920];
const QUALITY = 78;
const SRC = path.join(process.cwd(), "public", "images");
const OUT = path.join(process.cwd(), "public", "_img", "images");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(webp|jpe?g|png)$/i.test(entry.name)) yield full;
  }
}

async function newer(target, than) {
  try {
    return (await stat(target)).mtimeMs >= than;
  } catch {
    return false;
  }
}

const started = Date.now();
const files = [];
for await (const file of walk(SRC)) files.push(file);

let written = 0;
const queue = [...files];
async function worker() {
  while (queue.length) {
    const file = queue.shift();
    const rel = path.relative(SRC, file);
    const sourceTime = (await stat(file)).mtimeMs;
    const meta = await sharp(file).metadata();
    await mkdir(path.dirname(path.join(OUT, rel)), { recursive: true });
    for (const width of WIDTHS) {
      const target = path.join(OUT, `${rel}.${width}.webp`);
      if (await newer(target, sourceTime)) continue;
      // Never enlarge: requests above the original width get the original size.
      await sharp(file)
        .rotate()
        .resize({ width: Math.min(width, meta.width ?? width), withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(target);
      written += 1;
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
console.log(`images: ${files.length} sources, ${written} sizes written in ${((Date.now() - started) / 1000).toFixed(1)}s`);
