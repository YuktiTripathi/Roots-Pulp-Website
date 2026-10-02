/**
 * Post-build SEO checks against the prerendered HTML in .next/server/app.
 * Run after `npm run build`:  npm run check:seo
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = ".next/server/app";
const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://rootsandpulp.com").replace(/\/$/, "");
const treatmentSlugs = [
  "teeth-cleaning", "tooth-coloured-fillings", "tooth-extraction", "gum-and-oral-health",
  "root-canal-treatment", "crowns-and-bridges", "dental-implants", "dentures", "teeth-whitening",
  "cosmetic-dentistry", "braces-and-aligners", "childrens-dentistry", "emergency-dental-care",
];
const indexable = [
  "/", "/treatments/", "/doctor/dr-shubham-tripathi/", "/about/", "/gallery/", "/reviews/", "/contact/", "/faq/",
  ...treatmentSlugs.map((slug) => `/treatments/${slug}/`),
];
const noindex = ["/book-appointment/", "/privacy-policy/", "/terms/", "/medical-disclaimer/"];

const failures = [];
const fail = (route, message) => failures.push(`${route}: ${message}`);

function html(route) {
  const file = route === "/" ? "index.html" : `${route.replace(/^\/|\/$/g, "")}.html`;
  const path = join(root, file);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

function check(route, shouldIndex) {
  const page = html(route);
  if (!page) return fail(route, "no prerendered HTML found");
  const robots = page.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
  if (shouldIndex && /noindex/.test(robots)) fail(route, `is noindex (${robots})`);
  if (!shouldIndex && !/noindex/.test(robots)) fail(route, "should be noindex");
  const canonical = page.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (canonical !== `${site}${route}`) fail(route, `canonical is ${canonical ?? "missing"}`);
  if (shouldIndex) {
    for (const tag of ["og:title", "og:description", "og:url", "og:image", "twitter:card"]) {
      if (!page.includes(`"${tag}"`)) fail(route, `missing ${tag}`);
    }
    const h1s = page.match(/<h1[\s>]/g)?.length ?? 0;
    if (h1s !== 1) fail(route, `has ${h1s} h1 elements`);
  }
  for (const [, json] of page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch {
      fail(route, "invalid JSON-LD");
    }
  }
}

indexable.forEach((route) => check(route, true));
noindex.forEach((route) => check(route, false));

const titles = new Map();
for (const route of indexable) {
  const title = html(route)?.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) fail(route, "missing title");
  else if (titles.has(title)) fail(route, `duplicate title with ${titles.get(title)}`);
  else titles.set(title, route);
}

const sitemap = readFileSync(join(root, "sitemap.xml.body"), "utf8");
for (const route of indexable) if (!sitemap.includes(`<loc>${site}${route}</loc>`)) fail("sitemap", `missing ${route}`);
for (const route of noindex) if (sitemap.includes(`${site}${route}`)) fail("sitemap", `includes noindex ${route}`);
const robotsTxt = readFileSync(join(root, "robots.txt.body"), "utf8");
if (!robotsTxt.includes(`Sitemap: ${site}/sitemap.xml`)) fail("robots.txt", "does not reference the sitemap");
if (/Disallow: \/\s*$/m.test(robotsTxt)) fail("robots.txt", "blocks the whole site");

if (failures.length) {
  console.error(`SEO check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`SEO check passed: ${indexable.length} indexable pages, ${noindex.length} noindex pages, sitemap and robots.txt.`);
