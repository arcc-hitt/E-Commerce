import React from 'react';
import { NavLink } from 'react-router-dom';

function HomePage() {
  return (
    <div className="text-center bg-dark text-white py-5">
      <div className="container">
        <h1 className="display-4 fw-bold">The Generics</h1>
        <p className="lead mb-4">Music is life. Live the experience with us.</p>
        <NavLink to="/products" className="btn btn-primary btn-lg">
          See the Tour
        </NavLink>
      </div>
    </div>
  );
}

export default HomePage;
