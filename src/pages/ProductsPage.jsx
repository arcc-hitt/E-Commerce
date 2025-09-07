import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const retryTimerRef = useRef(null); // keep track of retry timer

  async function fetchFilms() {
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
  }

  function cancelRetry() {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
    setRetrying(false);
    setError('Retry cancelled by user.');
  }

  useEffect(() => {
    fetchFilms();

    // cleanup on unmount
    return () => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

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
        {films.map((film) => (
          <div className="col-md-4" key={film.episode_id}>
            <ProductCard
              title={film.title}
              price={film.episode_id * 10}
              imageUrl={`https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
