// Data source: TVmaze (https://www.tvmaze.com/api) — free, keyless public API.
// We use TV shows instead of movies; TVmaze needs no API key, which avoids
// the signup/access problems with TMDB. Stated in the README per the brief.

const BASE_URL = "https://api.tvmaze.com";

// TVmaze image URLs come fully-formed in the response, so unlike TMDB there is
// no separate image base to compose. This constant is exported for any
// component that wants a fallback.
export const NO_IMAGE = null;

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`TVmaze request failed (${res.status})`);
  }
  return res.json();
}

// Normalize a TVmaze show object into the shape our UI components expect.
// Doing this here means the components never touch TVmaze's raw structure —
// if we ever swap the API again, only this file changes.
function normalize(show) {
  return {
    id: show.id,
    title: show.name,
    year: show.premiered ? show.premiered.slice(0, 4) : "—",
    rating: show.rating && show.rating.average ? show.rating.average : null,
    poster: show.image ? show.image.medium : null,
    posterLarge: show.image ? show.image.original : null,
    overview: show.summary
      ? show.summary.replace(/<[^>]+>/g, "") // strip TVmaze's HTML tags
      : "No overview available.",
    genres: show.genres || [],
    status: show.status || "—",
    runtime: show.runtime || show.averageRuntime || null,
    language: show.language || "—",
  };
}

// Browse: TVmaze's full show index (page 0 = first ~250 shows). One network
// call; we paginate client-side to exactly 12 per page in the UI.
export async function getPopularShows() {
  const data = await request("/shows?page=0");
  return data.map(normalize);
}

// Search by title. TVmaze returns [{ score, show }, ...] with no pagination,
// so we map to our shape and let the UI slice into pages of 12.
export async function searchShows(query) {
  const data = await request(`/search/shows?q=${encodeURIComponent(query)}`);
  return data.map((item) => normalize(item.show));
}

// Full details for one show (detail page).
export async function getShowDetails(id) {
  const show = await request(`/shows/${id}`);
  return normalize(show);
}