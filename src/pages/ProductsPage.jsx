import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFilms(data.results); // results array contains films
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFilms();
  }, []);

  if (loading) {
    return <div className="container py-5 text-center">Loading films...</div>;
  }

  if (error) {
    return <div className="container py-5 text-danger text-center">Error: {error}</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Star Wars Films</h2>
      <div className="row g-4">
        {films.map((film) => (
          <div className="col-md-4" key={film.episode_id}>
            <ProductCard
              title={film.title}
              price={film.episode_id * 10} // just for demo
              imageUrl={`https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
