import React from 'react';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <>
      <header className="bg-dark text-white py-3">
        <div className="container text-center">
          <h2>Ecom Store</h2>
        </div>
      </header>

      <main>
        <ProductsPage />
      </main>

      <footer className="bg-light py-3 mt-5 border-top">
        <div className="container text-center text-muted">
          © {new Date().getFullYear()} Ecom Store. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default App;
