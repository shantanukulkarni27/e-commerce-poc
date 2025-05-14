"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Header */}
      <div className="bg-blue-600 text-white py-10 px-6 md:px-12">
        <h1 className="text-3xl font-bold mb-2">Product Listings</h1>
        <p className="text-lg text-blue-100">
          Explore our collection of exclusive products. Click on any product for more details.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Link href={`/products/${product.id}`} key={product.id} className="bg-white rounded-xl shadow hover:shadow-lg transition">
            <div className="p-4 flex flex-col items-center text-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mb-4"
              />
              <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
              <p className="text-blue-600 font-bold mt-2">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
