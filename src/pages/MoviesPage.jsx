import React, { useEffect, useState, useCallback, useMemo } from "react";
import AddMovieForm from "../components/AddMovieForm";
import MoviesList from "../components/MoviesList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) throw new Error("Something went wrong ....Retrying");

      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);

      // retry every 5 sec until success
      setTimeout(fetchMovies, 5000);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const addMovieHandler = useCallback((movie) => {
    setMovies((prev) => [...prev, movie]);
  }, []);

  const renderedMovies = useMemo(() => <MoviesList movies={movies} />, [movies]);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Star Wars Movies</h1>

      <AddMovieForm onAddMovie={addMovieHandler} />

      {loading && <p className="text-center mt-4">Loading movies...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {!loading && !error && renderedMovies}
    </div>
  );
};

export default MoviesPage;
