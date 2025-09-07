import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.title === product.title);
      if (existing) {
        return prevCart.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (title) => {
    setCart((prevCart) => prevCart.filter((item) => item.title !== title));
  };

  // NEW: update quantity from cart
  const changeQuantity = (title, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.title === title
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0) // remove if quantity <= 0
    );
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, changeQuantity, cartCount, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
