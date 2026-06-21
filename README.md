# 🎬 Reel — `movie-finder-deeksha`

> A cinematic show-discovery app built with Next.js. Browse popular titles, search as you type, dive into details, and save favorites that stick around.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black">
  <img alt="API" src="https://img.shields.io/badge/API-TVmaze-3aaa35">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">
</p>

**🔗 Live demo:** _[add your Vercel URL here after deploying]_

---

## ✨ Features

| | Feature | Details |
|---|---|---|
| 🗂️ | **Browse** | Responsive grid of shows — poster, title, year, and rating |
| 🔍 | **Search** | Search by title with results updating as you type (debounced) |
| 📄 | **Details** | Full overview, genres, runtime, status, and rating on its own page |
| ⭐ | **Favorites** | Add/remove with the star button — saved in `localStorage`, persists across reloads |
| ⏳ | **States** | Loading spinner, plus clear error and "no results" messages |
| ◀ ▶ | **Pagination** | Manual Next / Previous buttons, exactly **12 results per page** — no infinite scroll |

---

## 🎥 Data source

This app uses the **[TVmaze API](https://www.tvmaze.com/api)** instead of TMDB.

TMDB wouldn't load on my network during development, so I switched to TVmaze — a free, **fully keyless** public API with no signup or API key required. The brief allows a different free public API as long as it's stated, so it's noted here. TVmaze serves TV show data (title, year, rating, poster, overview, genres) that maps cleanly to every required feature.

---

## 🛠️ Tech stack

- **Next.js 14** (App Router)
- **React 18**
- **Plain CSS** — custom properties, no UI framework
- **TVmaze** public API

---

## 🚀 Running locally

> Requires **Node.js (LTS)** installed.

````bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
````

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

> 💡 No environment variables or API keys needed — TVmaze is keyless.

---

## 📁 Project structure

````text
movie-finder-deeksha/
├── app/
│   ├── layout.jsx              # Root layout (header, footer, fonts)
│   ├── page.jsx                # Home — browse, search, pagination
│   ├── globals.css             # Styling
│   ├── icon.svg                # Favicon
│   ├── movie/
│   │   └── [id]/
│   │       └── page.jsx        # Detail page
│   └── favorites/
│       └── page.jsx            # Saved favorites
├── components/
│   ├── MovieCard.jsx           # Single show card
│   ├── MovieGrid.jsx           # Grid layout
│   ├── SearchBar.jsx           # Search input
│   ├── Pagination.jsx          # Next / Previous controls
│   ├── FavoriteButton.jsx      # Star toggle + localStorage helpers
│   └── Footer.jsx              # Footer
└── lib/
    └── api.js                  # TVmaze API calls + data normalization
````

---

## 📝 Notes

Pagination is handled **client-side**: TVmaze returns search results in a single response without server pagination, so the full list is fetched once and sliced into pages of 12. This makes the "exactly 12 per page" requirement straightforward to guarantee.
