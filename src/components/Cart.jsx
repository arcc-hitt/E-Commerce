import React, { useState } from 'react';
import { cartElements } from '../data/cartElements';
import CartItem from './CartItem';

function Cart({ show, onClose }) {
  const [cart, setCart] = useState(cartElements);

  const handleRemove = (title) => {
    setCart((prevCart) => prevCart.filter((item) => item.title !== title));
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`offcanvas offcanvas-end ${show ? 'show' : ''}`}
      style={{ visibility: show ? 'visible' : 'hidden' }}
      tabIndex="-1"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Your Cart</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="offcanvas-body">
        {cart.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <CartItem key={item.title} item={item} onRemove={handleRemove} />
              ))}
            </ul>
            <div className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>${totalAmount}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
