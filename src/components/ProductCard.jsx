import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card shadow-sm h-100 border-0 rounded-3">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.imageUrl || product.images[0]}
            className="card-img-top"
            alt={product.title}
          />
        </Link>
        <div className="card-body text-center">
          <h5 className="card-title">
            <Link to={`/products/${product.id}`} className="text-dark text-decoration-none">
              {product.title}
            </Link>
          </h5>
          <p className="card-text text-muted">${product.price}</p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;