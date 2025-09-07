import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({ product }) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card shadow-sm h-100 border-0 rounded-3">
        <img
          src={product.imageUrl}
          className="card-img-top"
          alt={product.title}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-muted">${product.price}</p>
          <button className="btn btn-primary btn-sm">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
