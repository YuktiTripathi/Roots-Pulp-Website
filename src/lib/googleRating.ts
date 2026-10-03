export type GoogleRating = { rating: number; count: number } | null;

/**
 * Live Google rating for the clinic, fetched on the server and cached for a day.
 * Returns null when the keys are missing or the request fails, so callers can fall back safely.
 */
export async function getGoogleRating(): Promise<GoogleRating> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount",
      },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { rating?: number; userRatingCount?: number };
    if (typeof data.rating !== "number" || typeof data.userRatingCount !== "number") return null;
    return { rating: data.rating, count: data.userRatingCount };
  } catch {
    return null;
  }
}
