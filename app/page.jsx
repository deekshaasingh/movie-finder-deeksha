"use client";

import { useState, useEffect } from "react";
import { getPopularShows, searchShows } from "../lib/api";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";

const PER_PAGE = 12; // R1: exactly 12 results per page

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [allShows, setAllShows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce the search box: wait 400ms after the last keystroke before
  // deciding whether to browse or search. This is the "search as you type"
  // behavior without hammering the API on every letter.
  const [debouncedQuery, setDebouncedQuery] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 400);
    return () => clearTimeout(t);
  }, [query]);

  // Fetch whenever the debounced query changes. Empty query = browse the
  // popular index; otherwise = search. Reset to page 1 on any new fetch.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = debouncedQuery
          ? await searchShows(debouncedQuery)
          : await getPopularShows();
        if (!cancelled) {
          setAllShows(data);
          setPage(1);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  // Client-side pagination: slice the full list into the current page of 12.
  const totalPages = Math.ceil(allShows.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const pageShows = allShows.slice(start, start + PER_PAGE);

  function changePage(next) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <section className="hero">
        <div className="hero-eyebrow">A screening room for the small screen</div>
        <h1>
          Find your<br />next obsession
        </h1>
        <p>Browse, search, and save shows worth staying in for.</p>
        <SearchBar value={query} onChange={setQuery} />
      </section>

      <h2 className="section-title">
        {debouncedQuery ? `Results for "${debouncedQuery}"` : "Popular shows"}
      </h2>

      {loading && (
        <div className="state">
          <div className="spinner" />
          Loading shows…
        </div>
      )}

      {error && !loading && (
        <div className="state error">
          Something went wrong: {error}. Try again.
        </div>
      )}

      {!loading && !error && pageShows.length === 0 && (
        <div className="state">
          No shows found{debouncedQuery ? ` for "${debouncedQuery}"` : ""}.
          Try a different title.
        </div>
      )}

      {!loading && !error && pageShows.length > 0 && (
        <>
          <MovieGrid shows={pageShows} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </>
      )}
    </>
  );
}