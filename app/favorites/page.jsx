"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { readFavorites } from "../../components/FavoriteButton";
import MovieGrid from "../../components/MovieGrid";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // localStorage only exists in the browser, so read after mount.
  useEffect(() => {
    setFavorites(readFavorites());
    setLoaded(true);
  }, []);

  return (
    <>
      <h2 className="section-title">Your favorites</h2>

      {loaded && favorites.length === 0 && (
        <div className="state">
          No favorites yet. Tap the star on any show to save it here.{" "}
          <Link href="/" className="back-link">
            Browse shows
          </Link>
        </div>
      )}

      {favorites.length > 0 && <MovieGrid shows={favorites} />}
    </>
  );
}