import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';

function Cart({ show, onClose }) {
  const { cart, removeFromCart, changeQuantity, totalAmount } = useContext(CartContext);

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
                <CartItem
                  key={item.title}
                  item={item}
                  onRemove={removeFromCart}
                  onChangeQuantity={changeQuantity}
                />
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
