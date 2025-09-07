import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import Cart from './components/Cart';
import Navbar from './components/Navbar';

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Navbar onCartClick={() => setShowCart(true)} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      <footer className="bg-light py-3 mt-5 border-top">
        <div className="container text-center text-muted">
          © {new Date().getFullYear()} Ecom Store. All rights reserved.
        </div>
      </footer>

      <Cart show={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}

export default App;
