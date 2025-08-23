"use client";

import { useEffect } from "react";
import { X, Search, TrendingUp, Star } from "lucide-react";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchPanel = ({ isOpen, onClose }: SearchPanelProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trendingSearches = [
    "Summer Collection",
    "Wireless Headphones",
    "Running Shoes",
    "Coffee Makers",
    "Laptop Bags",
  ];

  const popularCategories = ["New Arrivals", "Women's Bra", "Men's Underwear"];

  const featuredProducts = [
    {
      image: "https://cdn.pixabay.com/photo/2025/02/09/22/02/ai-generated-9395372_1280.jpg",
      title: "Monogram Logo Fleece",
      price: "N52.30",
      rating: 5,
    },
    {
      image: "https://cdn.pixabay.com/photo/2025/02/13/15/01/ai-generated-9404181_1280.png",
      title: "Monogram Logo Fleece",
      price: "N52.30",
      rating: 5,
    },
    {
      image: "https://cdn.pixabay.com/photo/2025/02/11/05/58/galaxy-9398150_1280.jpg",
      title: "Monogram Logo Fleece",
      price: "N52.30",
      rating: 5,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative ml-auto h-full w-full sm:w-96 lg:w-[480px] bg-white shadow-2xl overflow-y-auto">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-lg font-semibold">Search</h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700 rounded transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="What are you looking for..."
                className="pl-10 h-12 w-full border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>

            {/* Trending Searches */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <h3 className="font-medium text-sm">Trending Now</h3>
              </div>
              <div className="space-y-2">
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 text-sm transition"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Popular Categories
              </h3>
              <ul className="text-gray-600">
                {popularCategories.map((category, index) => (
                  <li
                    key={index}
                    className="py-1 hover:text-black cursor-pointer"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured Best Sellers */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Featured Best Sellers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded-lg shadow-md"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <p className="mt-2 font-medium text-gray-800">
                      {product.title}
                    </p>
                    <p className="text-red-500 font-semibold">{product.price}</p>
                    <p className="flex items-center text-yellow-500">
                      {Array.from({ length: product.rating }, (_, i) => (
                        <Star key={i} className="h-4 w-4 mr-1" />
                      ))}
                      <span className="text-gray-600 text-sm ml-1">(5)</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
