import React, { useEffect, useState, useCallback, useMemo } from "react";
import AddMovieForm from "../components/AddMovieForm";
import MoviesList from "../components/MoviesList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const DB_URL =
    "https://sharpener-ecommerce-190d1-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json";
  const BASE_URL =
    "https://sharpener-ecommerce-190d1-default-rtdb.asia-southeast1.firebasedatabase.app";

  // Fetch Movies
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(DB_URL);
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();

      // Transform Firebase object into array with IDs
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  // Add Movie (POST)
  const addMovieHandler = useCallback(async (movie) => {
    const response = await fetch(DB_URL, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    // Firebase returns { name: "generatedId" }
    setMovies((prev) => [...prev, { id: data.name, ...movie }]);
  }, []);

  // Delete Movie
  const deleteMovieHandler = useCallback(async (id) => {
    if (!id) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;

    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/movies/${id}.json`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete movie");

      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete movie");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const renderedMovies = useMemo(
    () => <MoviesList movies={movies} onDelete={deleteMovieHandler} />,
    [movies, deleteMovieHandler]
  );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Movies Database</h2>

      <AddMovieForm onAddMovie={addMovieHandler} />

      {loading && <div className="alert alert-info text-center">Loading movies...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && !error && renderedMovies}
    </div>
  );
};

export default MoviesPage;
