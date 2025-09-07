import React from 'react';
import ProductCard from '../components/ProductCard';
import { productsArr } from '../data/products';

function ProductsPage() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Our Products</h1>
      <div className="row">
        {productsArr.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
