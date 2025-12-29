"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/products/ProductCard";
import { IProduct } from "@/types/product";
import { fetchProducts } from "@/lib/api/product";

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data: IProduct[] = await fetchProducts(); 
        setProducts(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">All Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
