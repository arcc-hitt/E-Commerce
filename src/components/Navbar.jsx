import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Navbar({ onCartClick }) {
  const { cartCount } = useContext(CartContext);

  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h2 className="m-0">Ecom Store</h2>
        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link d-inline-block mx-2 ${isActive ? 'text-warning' : 'text-white'}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-link d-inline-block mx-2 ${isActive ? 'text-warning' : 'text-white'}`
            }
          >
            Store
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link d-inline-block mx-2 ${isActive ? 'text-warning' : 'text-white'}`
            }
          >
            About
          </NavLink>

          <button
            className="btn btn-outline-light position-relative ms-3"
            onClick={onCartClick}
          >
            <i className="bi bi-cart"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
