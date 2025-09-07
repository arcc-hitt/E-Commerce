import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { productsArr } from '../data/products';
import { CartContext } from '../context/CartContext';

function ProductDetailPage() {
  const { id } = useParams();
  const product = productsArr.find((p) => p.id === parseInt(id));
  const { addToCart } = useContext(CartContext);

  const [mainImage, setMainImage] = useState(product.images[0]);

  if (!product) return <h2>Product not found</h2>;

  const productForCart = { ...product, imageUrl: product.images[0] };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Image Section */}
        <div className="col-md-6 text-center">
          <img
            src={mainImage}
            alt={product.title}
            style={{ width: '100%', maxWidth: '400px', cursor: 'zoom-in' }}
            onClick={() => window.open(mainImage, '_blank')}
          />
          <div className="d-flex justify-content-center mt-3">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                style={{
                  width: 70,
                  height: 70,
                  objectFit: 'cover',
                  marginRight: 10,
                  cursor: 'pointer',
                  border: img === mainImage ? '2px solid blue' : '1px solid gray',
                }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <h4 className="text-muted">${product.price}</h4>
          <p>{product.description}</p>

          <button
            className="btn btn-primary"
            onClick={() => addToCart(productForCart)}
          >
            Add to Cart
          </button>

          {/* Reviews */}
          <div className="mt-4">
            <h5>Customer Reviews</h5>
            {product.reviews.map((review, index) => (
              <div key={index} className="border-bottom py-2">
                <strong>{review.user}</strong> ({'⭐'.repeat(review.rating)})
                <p className="mb-0">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;