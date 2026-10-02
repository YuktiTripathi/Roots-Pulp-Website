import assert from "node:assert/strict";
import test from "node:test";
import { treatments } from "./clinic.ts";
import { treatmentPages } from "./treatmentPages.ts";

test("treatment slugs are unique", () => {
  const slugs = treatments.map((item) => item.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("every treatment has written page content", () => {
  for (const item of treatments) assert.ok(treatmentPages[item.slug], `missing content for ${item.slug}`);
});

test("treatment titles and descriptions are unique and sensibly sized", () => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const [slug, page] of Object.entries(treatmentPages)) {
    assert.ok(!titles.has(page.seo.title), `duplicate title on ${slug}`);
    assert.ok(!descriptions.has(page.seo.description), `duplicate description on ${slug}`);
    titles.add(page.seo.title);
    descriptions.add(page.seo.description);
    assert.ok(page.seo.title.length <= 70, `title too long on ${slug}: ${page.seo.title.length}`);
    assert.ok(page.seo.description.length <= 170, `description too long on ${slug}: ${page.seo.description.length}`);
    assert.ok(page.seo.title.includes("Lucknow") || page.seo.title.includes("Aliganj"), `no locality in ${slug} title`);
  }
});

test("treatment copy avoids unverifiable superlatives and guarantees", () => {
  const banned = /\b(best (dentist|dental|clinic|treatment)|number 1|no\. 1|top[- ]rated|painless|guarantee[ds]?|100%|permanent solution)\b/i;
  for (const [slug, page] of Object.entries(treatmentPages)) {
    const match = JSON.stringify(page).match(banned);
    assert.equal(match, null, `"${match?.[0]}" found on ${slug}`);
  }
});

test("related treatments point at real slugs", () => {
  const slugs = new Set(treatments.map((item) => item.slug));
  for (const [slug, page] of Object.entries(treatmentPages)) {
    for (const item of page.related) assert.ok(slugs.has(item.slug), `${slug} links to unknown ${item.slug}`);
  }
});
