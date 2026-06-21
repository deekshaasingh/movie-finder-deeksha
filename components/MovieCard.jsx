import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export default function MovieCard({ show }) {
  return (
    <div className="card">
      <div className="card-poster">
        <FavoriteButton show={show} />
        <Link href={`/movie/${show.id}`}>
          {show.poster ? (
            // Plain <img> rather than next/image: TVmaze poster dimensions
            // vary and we don't need Next's optimization here. Simpler, and
            // avoids remote-domain config gotchas.
            <img src={show.poster} alt={show.title} loading="lazy" />
          ) : (
            <div className="no-poster">No image</div>
          )}
        </Link>
      </div>
      <div className="card-body">
        <Link href={`/movie/${show.id}`}>
          <div className="card-title">{show.title}</div>
        </Link>
        <div className="card-meta">
          <span>{show.year}</span>
          <span className="rating">
            {show.rating ? `★ ${show.rating}` : "Not rated"}
          </span>
        </div>
      </div>
    </div>
  );
}