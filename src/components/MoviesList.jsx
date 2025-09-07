import React, { memo } from "react";

const MoviesList = memo(({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-500">No movies found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {movies.map((movie) => (
        <div
          key={movie.episode_id}
          className="p-6 bg-gray-900 text-white rounded-xl shadow-md"
        >
          <h2 className="text-xl font-bold mb-2">
            Episode {movie.episode_id}: {movie.title}
          </h2>
          <p className="italic text-gray-300 mb-3">
            {movie.opening_crawl.slice(0, 120)}...
          </p>
          <p className="text-sm">
            <span className="font-semibold">Director:</span> {movie.director}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Producer:</span> {movie.producer}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Release Date:</span>{" "}
            {movie.release_date}
          </p>
        </div>
      ))}
    </div>
  );
});

export default MoviesList;
