"use client";

import { useState, useEffect } from "react";

const KEY = "favorites";

export function readFavorites() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function writeFavorites(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export default function FavoriteButton({ show }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = readFavorites();
    setIsFav(favs.some((f) => f.id === show.id));
  }, [show.id]);

  function toggle(e) {
    e.preventDefault();
    e.stopPropagation();
    const favs = readFavorites();
    const exists = favs.some((f) => f.id === show.id);
    const next = exists
      ? favs.filter((f) => f.id !== show.id)
      : [...favs, show];
    writeFavorites(next);
    setIsFav(!exists);
  }

  return (
    <button
      className={`fav-btn${isFav ? " active" : ""}`}
      onClick={toggle}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      {isFav ? "★" : "☆"}
    </button>
  );
}