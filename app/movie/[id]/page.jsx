"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getShowDetails } from "../../../lib/api";
import FavoriteButton from "../../../components/FavoriteButton";

export default function DetailPage({ params }) {
  const { id } = params;
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getShowDetails(id);
        if (!cancelled) setShow(data);
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
  }, [id]);

  if (loading) {
    return (
      <div className="state">
        <div className="spinner" />
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="state error">
        Could not load this show: {error}.{" "}
        <Link href="/" className="back-link">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <article>
      <div className="detail">
        <div className="detail-poster">
          {show.posterLarge ? (
            <img src={show.posterLarge} alt={show.title} />
          ) : (
            <div className="no-poster" style={{ aspectRatio: "2 / 3" }}>
              No image
            </div>
          )}
          <div style={{ padding: 0 }}>
            <FavoriteButton show={show} />
          </div>
        </div>

        <div className="detail-info">
          <h1>{show.title}</h1>

          <div className="detail-meta">
            <span>{show.year}</span>
            <span className="rating">
              {show.rating ? `★ ${show.rating}` : "Not rated"}
            </span>
            <span>{show.status}</span>
            {show.runtime && <span>{show.runtime} min</span>}
            <span>{show.language}</span>
          </div>

          {show.genres.length > 0 && (
            <div className="detail-meta">
              {show.genres.map((g) => (
                <span key={g}>{g}</span>
              ))}
            </div>
          )}

          <h2>Overview</h2>
          <p className="overview">{show.overview}</p>
        </div>
      </div>

      <Link href="/" className="back-link">
        ← Back to browse
      </Link>
    </article>
  );
}