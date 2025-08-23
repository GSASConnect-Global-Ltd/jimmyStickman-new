"use client";

import { useEffect } from "react";
import { X, Heart, Trash2, ShoppingCart } from "lucide-react";

interface WishlistPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistPanel = ({ isOpen, onClose }: WishlistPanelProps) => {
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

  const wishlistItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: "$129.99",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Ergonomic Office Chair",
      price: "$299.99",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Stainless Steel Water Bottle",
      price: "$24.99",
      image:
        "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=300&fit=crop",
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
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-600" />
              <h2 className="text-lg font-semibold">Wishlist</h2>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {wishlistItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {wishlistItems.length > 0 ? (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <p className="text-lg font-semibold text-red-600 mt-1">
                        {item.price}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 h-10 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2">
                          <ShoppingCart className="h-4 w-4" /> Add to Cart
                        </button>
                        <button className="h-10 w-10 border rounded text-red-600 hover:text-red-800 flex items-center justify-center">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Heart className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 text-sm">
                  Save items you love to come back to them later
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
