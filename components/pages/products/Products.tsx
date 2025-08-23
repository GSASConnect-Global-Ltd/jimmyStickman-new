"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { IProduct } from "@/app/types/Product";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";

const Products = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const openModal = (filter: string) => setSelectedFilter(filter);
  const closeModal = () => setSelectedFilter(null);

  const products: (IProduct & { id: string })[] = [
    {
      id: "1",
      name: "Stylish Sneakers",
      price: "$120.00",
      offer: "Limited Time Offer",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Red", value: "#FF0000" },
        { name: "Green", value: "#008000" },
      ],
      images: [
        "https://cdn.pixabay.com/photo/2023/08/25/07/37/shoes-8212405_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/03/27/18/23/sneakers-1283091_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/09/04/09/55/sneakers-2713711_1280.jpg",
      ],
    },
    {
      id: "2",
      name: "Casual Wear",
      price: "$95.00",
      offer: "New Arrival",
      colors: [
        { name: "Orange", value: "#FF5733" },
        { name: "Blue", value: "#3498DB" },
        { name: "Yellow", value: "#F1C40F" },
      ],
      images: [
        "https://cdn.pixabay.com/photo/2016/11/29/09/25/blonde-1868701_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/23/18/52/model-1850724_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/08/07/07/38/people-2603521_1280.jpg",
      ],
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen relative">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">All Products</h2>

      <div className="flex space-x-4 md:space-x-8 text-gray-700 font-medium border-b pb-3 uppercase overflow-x-auto">
        {["Shop All", "Men", "Women", "Kids"].map((category) => (
          <p key={category} className="cursor-pointer hover:text-black transition whitespace-nowrap">
            {category}
          </p>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
        <div className="flex space-x-3 md:space-x-6 overflow-x-auto">
          {["Gender", "Category", "Size", "Color", "Price", "All Filters"].map((filter) => (
            <div
              key={filter}
              className="border px-4 py-2 text-sm md:text-base cursor-pointer hover:bg-gray-200 transition whitespace-nowrap"
              onClick={() => openModal(filter)}
            >
              {filter === "All Filters" ? <span>🔍 {filter}</span> : filter}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="block">
            <ProductCard product={product} />
          </Link>
        ))}
      </div>

      {isClient && selectedFilter &&
        ReactDOM.createPortal(
          <div className="fixed top-0 right-0 w-full md:w-1/4 h-full bg-white shadow-lg p-6 z-50 overflow-y-auto transition-transform transform translate-x-0 rounded-l-lg"
               ref={filterRef}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Filters</h3>
              <button className="text-gray-500 hover:text-gray-800" onClick={closeModal}>
                &#10005;
              </button>
            </div>
            {["Gender", "Category", "Size", "Color", "Price"].map((name) => (
              <div key={name} id={name.toLowerCase()} className="mb-6">
                <h4 className="text-lg font-medium mb-2">{name}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {["Option 1", "Option 2", "Option 3"].map((option, index) => (
                    <label key={index} className="flex items-center space-x-2 p-2 border rounded-md cursor-pointer hover:bg-gray-100">
                      <input type="checkbox" className="accent-gray-700" />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button className="w-full mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition" onClick={closeModal}>
              Close
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Products;
