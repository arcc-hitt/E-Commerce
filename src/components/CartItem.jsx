import React from 'react';
import PropTypes from 'prop-types';

function CartItem({ item, onRemove, onChangeQuantity }) {
  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <img
          src={item.imageUrl}
          alt={item.title}
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          className="rounded me-3"
        />
        <div>
          <h6 className="mb-1">{item.title}</h6>
          <small className="text-muted">${item.price}</small>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <button
          className="btn btn-sm btn-outline-secondary me-2"
          onClick={() => onChangeQuantity(item.title, -1)}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          className="btn btn-sm btn-outline-secondary ms-2"
          onClick={() => onChangeQuantity(item.title, 1)}
        >
          +
        </button>
        <button
          className="btn btn-sm btn-outline-danger ms-3"
          onClick={() => onRemove(item.title)}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
};

export default CartItem;
