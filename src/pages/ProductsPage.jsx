import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const retryTimerRef = useRef(null);

  // Memoized fetch function so useEffect won't recreate it unnecessarily
  const fetchFilms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setFilms(data.results);
      setLoading(false);
      setRetrying(false); // success => stop retry
    } catch (err) {
      setError('Something went wrong... Retrying');
      setLoading(false);
      setRetrying(true);

      // schedule retry in 5 seconds
      retryTimerRef.current = setTimeout(fetchFilms, 5000);
    }
  }, []);

  // Cancel retry
  const cancelRetry = useCallback(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
    setRetrying(false);
    setError('Retry cancelled by user.');
  }, []);

  // Load movies automatically on page mount
  useEffect(() => {
    fetchFilms();

    // cleanup
    return () => {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, [fetchFilms]);

  // Use useMemo to transform films only when films change
  const products = useMemo(
    () =>
      films.map((film) => ({
        id: film.episode_id,
        title: film.title,
        price: film.episode_id * 10,
        imageUrl: `https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`,
      })),
    [films]
  );

  if (loading && !retrying) {
    return <div className="container py-5 text-center">Loading films...</div>;
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">{error}</p>
        {retrying && (
          <button className="btn btn-outline-danger mt-3" onClick={cancelRetry}>
            Cancel Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Star Wars Films</h2>
      <div className="row g-4">
        {products.map((p) => (
          <div className="col-md-4" key={p.id}>
            <ProductCard title={p.title} price={p.price} imageUrl={p.imageUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
