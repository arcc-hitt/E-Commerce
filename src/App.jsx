import React, { useState } from 'react';
import ProductsPage from './pages/ProductsPage';
import Cart from './components/Cart';

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <header className="bg-dark text-white py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h2 className="m-0">Ecom Store</h2>
          <button
            className="btn btn-outline-light position-relative"
            onClick={() => setShowCart(true)}
          >
            <i className="bi bi-cart"></i> Cart
          </button>
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

      {/* Cart Drawer */}
      <Cart show={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}

export default App;
