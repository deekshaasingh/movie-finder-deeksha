# Reel — movie-finder-deeksha

A show discovery app built with Next.js. Browse popular titles, search by
name, view full details, and save favorites that persist across reloads.

**Live demo:** [add your Vercel URL here after deploying]

## Data source

This app uses the **[TVmaze API](https://www.tvmaze.com/api)** instead of
TMDB. TMDB would not load on my network during development, so I switched to
TVmaze, which is a free, fully keyless public API — no signup or API key
required. The brief allows a different free public API as long as it's stated,
so this is noted here. TVmaze serves TV show data (title, year, rating,
poster, overview, genres), which maps cleanly to all the required features.

## Features

- **Browse** — a responsive grid of shows with poster, title, year, and rating.
- **Search** — search by title with results updating as you type (debounced).
- **Details** — clicking a show opens a detail page with the full overview,
  genres, runtime, status, and rating.
- **Favorites** — add or remove favorites with the star button; saved in
  `localStorage` so they persist after a page reload.
- **States** — loading spinner while fetching, plus clear error and
  "no results" messages.
- **Pagination** — manual Next / Previous buttons showing exactly 12 results
  per page (no infinite scroll).

## Tech stack

- Next.js 14 (App Router)
- React 18
- Plain CSS (custom properties, no UI framework)
- TVmaze public API

## Running locally

You need Node.js (LTS) installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

No environment variables or API keys are needed — TVmaze is keyless.

## Project structure

app/

layout.jsx          root layout (header, footer, fonts)

page.jsx            home — browse, search, pagination

movie/[id]/page.jsx detail page

favorites/page.jsx  saved favorites

globals.css         styling

icon.svg            favicon

components/

MovieCard.jsx       single show card

MovieGrid.jsx       grid layout

SearchBar.jsx       search input

Pagination.jsx      Next / Previous controls

FavoriteButton.jsx  star toggle + localStorage helpers

Footer.jsx          footer

lib/

api.js              TVmaze API calls + data normalization

## Notes

Pagination is handled client-side: TVmaze returns search results in a single
response without server pagination, so the full list is fetched once and
sliced into pages of 12. This makes the "exactly 12 per page" requirement
straightforward to guarantee.