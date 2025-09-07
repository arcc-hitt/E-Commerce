import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function ProductCard({ title, price, imageUrl }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={imageUrl}
        alt={title}
        className="card-img-top"
        style={{ objectFit: 'cover', height: '250px' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Price: ${price}</p>
        <button
          className="btn btn-primary mt-auto"
          onClick={() => addToCart({ title, price, imageUrl })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
