import React, { memo } from "react";

const MoviesList = memo(({ movies, onDelete }) => {
    if (!movies || movies.length === 0) {
        return <p className="text-center text-muted">No movies found.</p>;
    }

    return (
        <div className="row g-4 mt-4">
            {movies.map((movie) => (
                <div className="col-md-4" key={movie.episode_id || movie.title}>
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                Episode {movie.episode_id ? movie.episode_id : "N/A"}: {movie.title}
                            </h5>
                            <p className="card-text text-muted">
                                {movie.opening_crawl
                                    ? movie.opening_crawl.slice(0, 100) + "..."
                                    : movie.openingText}
                            </p>
                            <ul className="list-unstyled small">
                                {movie.director && (
                                    <li>
                                        <strong>Director:</strong> {movie.director}
                                    </li>
                                )}
                                {movie.producer && (
                                    <li>
                                        <strong>Producer:</strong> {movie.producer}
                                    </li>
                                )}
                                <li>
                                    <strong>Release:</strong>{" "}
                                    {movie.release_date ? movie.release_date : movie.releaseDate}
                                </li>
                            </ul>

                            <div className="mt-3 d-flex justify-content-end">
                                {/* Only show delete if we have an id (Firebase) */}
                                {movie.id && typeof onDelete === "function" && (
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => onDelete(movie.id)}
                                        title="Delete movie"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default MoviesList;
