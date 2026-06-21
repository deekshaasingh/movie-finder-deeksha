import MovieCard from "./MovieCard";

export default function MovieGrid({ shows }) {
  return (
    <div className="movie-grid">
      {shows.map((show) => (
        <MovieCard key={show.id} show={show} />
      ))}
    </div>
  );
}