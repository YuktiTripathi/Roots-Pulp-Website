import { patientReviews, type PatientReview } from "./patientReviews";

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
};

type LegacyReview = { author_name?: string; rating?: number; relative_time_description?: string; text?: string };

/** Only reviews with written text, rated 4 or 5 stars, are shown. */
const MIN_RATING = 4;
const DAY = 86400;

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const fingerprint = (review: { name: string; text: string }) =>
  `${slug(review.name)}|${review.text.toLowerCase().replace(/\s+/g, " ").slice(0, 60)}`;

/** Places API (New): Google returns up to five reviews per place. */
async function fetchPlacesReviews(key: string, placeId: string): Promise<PatientReview[]> {
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "reviews" },
      next: { revalidate: DAY },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { reviews?: PlacesReview[] };
    return (data.reviews ?? []).flatMap((review) => {
      const text = (review.originalText?.text ?? review.text?.text ?? "").trim();
      const name = review.authorAttribution?.displayName?.trim();
      const rating = review.rating ?? 0;
      if (!text || !name || rating < MIN_RATING) return [];
      return [{ id: `google-${slug(name)}`, name, rating, date: review.relativePublishTimeDescription ?? "", source: "Google" as const, text }];
    });
  } catch {
    return [];
  }
}

/**
 * Legacy Place Details can sort by newest, which adds up to five more recent reviews.
 * It only works if the legacy Places API is enabled for the key; otherwise it quietly returns nothing.
 */
async function fetchNewestReviews(key: string, placeId: string): Promise<PatientReview[]> {
  try {
    const params = new URLSearchParams({ place_id: placeId, fields: "reviews", reviews_sort: "newest", reviews_no_translations: "true", key });
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`, { next: { revalidate: DAY } });
    if (!res.ok) return [];
    const data = (await res.json()) as { result?: { reviews?: LegacyReview[] } };
    return (data.result?.reviews ?? []).flatMap((review) => {
      const text = (review.text ?? "").trim();
      const name = review.author_name?.trim();
      const rating = review.rating ?? 0;
      if (!text || !name || rating < MIN_RATING) return [];
      return [{ id: `google-${slug(name)}`, name, rating, date: review.relative_time_description ?? "", source: "Google" as const, text }];
    });
  } catch {
    return [];
  }
}

/**
 * Every written Google review we can show: live reviews from Google (refreshed daily) first, then the
 * genuine reviews saved in patientReviews.ts, with duplicates removed. Works with no keys set, using
 * the saved reviews only.
 */
export async function getAllGoogleReviews(): Promise<PatientReview[]> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const live = key && placeId ? (await Promise.all([fetchPlacesReviews(key, placeId), fetchNewestReviews(key, placeId)])).flat() : [];

  const seenText = new Set<string>();
  const seenName = new Set<string>();
  const merged: PatientReview[] = [];
  for (const review of [...live, ...patientReviews]) {
    const byText = fingerprint(review);
    const byName = slug(review.name);
    // The same person's review can come back from both endpoints or already be saved locally.
    if (seenText.has(byText) || seenName.has(byName)) continue;
    seenText.add(byText);
    seenName.add(byName);
    merged.push(review);
  }
  return merged.filter((review) => review.text.trim().length > 0);
}
