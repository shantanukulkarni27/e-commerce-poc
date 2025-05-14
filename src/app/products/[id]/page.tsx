"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data: Product) => setProduct(data));
    }
  }, [id]);

  if (!product) return <p className="p-6 text-center text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Header */}
      <div className="bg-blue-600 text-white py-10 px-6 md:px-12">
        <h1 className="text-3xl font-bold mb-2">Product Details</h1>
        <p className="text-purple-200">Learn more about this product and add it to your cart.</p>
      </div>

      {/* Product Detail Section */}
      <div className="max-w-6xl mx-auto my-10 px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center items-center">
          <img src={product.image} alt={product.title} className="h-80 object-contain" />
        </div>

        <div className="flex flex-col justify-between space-y-4">
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-xl font-bold text-green-600">${product.price}</p>

          {/* Quantity Input */}
          <div className="flex items-center space-x-4 mt-4">
            <label htmlFor="quantity" className="font-medium">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min={0}
              max={99}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => alert(`Added ${quantity} item(s) to cart!`)}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
