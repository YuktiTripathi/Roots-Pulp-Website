import assert from "node:assert/strict";
import test from "node:test";
import { getOpeningStatus } from "./openingHours.ts";

test("weekday afternoon is open until 8 PM", () => {
  const status = getOpeningStatus(new Date("2026-09-21T05:30:00.000Z"));
  assert.equal(status.isOpen, true);
  assert.equal(status.label, "Open now · until 8 PM");
});

test("sunday afternoon is open until 5 PM", () => {
  const status = getOpeningStatus(new Date("2026-09-20T08:30:00.000Z"));
  assert.equal(status.isOpen, true);
  assert.equal(status.label, "Open now · until 5 PM");
});

test("before opening", () => {
  const status = getOpeningStatus(new Date("2026-09-21T03:30:00.000Z"));
  assert.equal(status.isOpen, false);
  assert.equal(status.label, "Opens today at 10 AM");
});

test("opens at 10:00 inclusive", () => {
  const status = getOpeningStatus(new Date("2026-09-21T04:30:00.000Z"));
  assert.equal(status.isOpen, true);
  assert.equal(status.label, "Open now · until 8 PM");
});

test("closes at 8:00 PM", () => {
  const status = getOpeningStatus(new Date("2026-09-21T14:30:00.000Z"));
  assert.equal(status.isOpen, false);
  assert.equal(status.label, "Closed now · opens tomorrow at 10 AM");
});

test("sunday closes at 5:00 PM and names tomorrow", () => {
  const status = getOpeningStatus(new Date("2026-09-20T11:30:00.000Z"));
  assert.equal(status.isOpen, false);
  assert.equal(status.label, "Closed now · opens tomorrow at 10 AM");
});

test("saturday after close names Sunday", () => {
  const status = getOpeningStatus(new Date("2026-09-19T15:30:00.000Z"));
  assert.equal(status.isOpen, false);
  assert.equal(status.label, "Closed now · opens Sunday at 10 AM");
});
