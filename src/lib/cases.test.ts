import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

// cases.ts is server only, so its image paths are read as text. A case with a missing file is
// skipped silently on the site, which once hid two cases; this test makes that loud instead.
const source = readFileSync(path.join(import.meta.dirname, "cases.ts"), "utf8");
const images = [...source.matchAll(/src: "(\/images\/cases\/[^"]+)"/g)].map((match) => match[1]);

test("cases reference at least one image", () => {
  assert.ok(images.length > 0);
});

test("every case image file exists", () => {
  for (const src of images) {
    assert.ok(existsSync(path.join(import.meta.dirname, "../../public", src)), `missing ${src}`);
  }
});
