import "server-only";

/** Google Places API (New) Place Details. Server-side only: the key never reaches the browser. */
const PLACES_ENDPOINT = "https://places.googleapis.com/v1/places";

/** Reviews change slowly, so Google is asked at most once a week (Next.js data cache). */
export const GOOGLE_PLACES_REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

export type GooglePlaceRating = {
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUri: string | null;
};

const EMPTY: GooglePlaceRating = { rating: null, userRatingCount: null, googleMapsUri: null };

/** Short, non-sensitive server log: never the key, the URL or Google's response body. */
function logProblem(message: string) {
  if (process.env.NODE_ENV !== "production") console.warn(`[google-places] ${message}`);
  else console.error(`[google-places] ${message}`);
}

/**
 * Rating, review count and Google Maps link for the clinic. Requests only those three fields.
 * Returns nulls (never throws) when the key or place ID is missing, Google errors, or a value is absent,
 * so the page can fall back to its static content.
 */
export async function getGooglePlaceRating(): Promise<GooglePlaceRating> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return EMPTY;

  try {
    const res = await fetch(`${PLACES_ENDPOINT}/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri",
      },
      next: { revalidate: GOOGLE_PLACES_REVALIDATE_SECONDS, tags: ["google-place"] },
    });
    if (!res.ok) {
      logProblem(`Place Details request failed with status ${res.status}`);
      return EMPTY;
    }
    const data = (await res.json()) as { rating?: unknown; userRatingCount?: unknown; googleMapsUri?: unknown };
    const uri = typeof data.googleMapsUri === "string" && data.googleMapsUri.startsWith("https://") ? data.googleMapsUri : null;
    return {
      rating: typeof data.rating === "number" ? data.rating : null,
      userRatingCount: typeof data.userRatingCount === "number" ? data.userRatingCount : null,
      googleMapsUri: uri,
    };
  } catch {
    logProblem("Place Details request could not be completed");
    return EMPTY;
  }
}
