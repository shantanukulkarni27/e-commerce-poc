"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "get",
    });
    if (res.ok) {
      router.push("/auth/login");
      router.refresh();
    } else {
      console.log("Logout failed");
    }
  };

  const handleItem =(product:object)=>{
    router.push(`/products/${product?.id}?product=${encodeURIComponent(JSON.stringify(product))}`)
  }

  useEffect(() => {
    const fetchProducts = async () =>{
        try{
            setLoading(true)
            await new Promise((resolve)=>setTimeout(resolve,5000))
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
        }
        catch{
            console.log("Error fetching products");
        }
        finally{
            setLoading(false);
        }
    }
    fetchProducts()
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Header */}
      <div className="bg-blue-600 text-white py-10 px-6 md:px-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product Listings</h1>
          <p className="text-lg text-blue-100">
            Explore our collection of exclusive products. Click on any product
            for more details.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        >
          Logout
        </button>
      </div>

      {/* Product Grid */}
      {
        loading ? (<Loader />):
        (    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                // href={`/products/${product.id}`}
                key={product.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <div onClick={()=>handleItem(product)} className="p-4 flex flex-col items-center text-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 object-contain mb-4"
                  />
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                </div>
              </div>
            ))}
          </div>)
      }

    </div>
  );
}
