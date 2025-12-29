"use client";

import { useEffect, useState } from "react";
import { X, Heart, Trash2, ShoppingCart } from "lucide-react";
import {
  fetchWishlist,
  removeFromWishlist,
  clearWishlist,
} from "@/lib/api/wishlist";
import { getUser } from "@/lib/api/auth";
import { getWishlistId } from "@/lib/utils/wishlistId";
import { IWishlistItem } from "@/types/product";

interface WishlistPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DisplayItem {
  id: string;
  name: string;
  price: string;
  image: string;
  variant?: { size?: string; color?: string };
}

export const WishlistPanel = ({ isOpen, onClose }: WishlistPanelProps) => {
  const [wishlistItems, setWishlistItems] = useState<DisplayItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const wishlistId = getWishlistId();

  // ===============================
  // LOAD USER + WISHLIST (SINGLE SOURCE)
  // ===============================
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    loadUserAndWishlist();

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const loadUserAndWishlist = async () => {
    setLoading(true);
    try {
      const authUser = await getUser();
      setUser(authUser);

      const data = await fetchWishlist();

      const items: DisplayItem[] = data.products.map(
        (p: IWishlistItem) => ({
          id: p.product._id || "",
          name: p.product.name,
          price: `₦${p.product.price}`,
          image: p.product.images?.[0] || "",
          variant: p.variant,
        })
      );

      setWishlistItems(items);
    } catch (err) {
      console.error("Failed to load wishlist:", err);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // REMOVE ITEM
  // ===============================
  const handleRemove = async (
  id: string,
  variant?: { size?: string; color?: string }
) => {
  try {
    const updated = await removeFromWishlist(
      id,
      variant?.size,
      variant?.color
    );

    const items: DisplayItem[] = updated.products.map((p: IWishlistItem) => ({
      id: p.product._id || "",
      name: p.product.name,
      price: `₦${p.product.price}`,
      image: p.product.images?.[0] || "",
      variant: p.variant,
    }));

    setWishlistItems(items);
  } catch (err) {
    console.error("Remove failed:", err);
  }
};

  // ===============================
  // CLEAR WISHLIST
  // ===============================
  const handleClear = async () => {
    try {
      await clearWishlist();
      setWishlistItems([]);
    } catch (err) {
      console.error("Clear failed:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative ml-auto h-full w-full sm:w-96 lg:w-[480px] bg-white shadow-2xl overflow-y-auto">
        <div className="flex h-full flex-col">
          {/* HEADER */}
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

          {/* BODY */}
          <div className="flex-1 p-6">
            {loading ? (
              <p>Loading...</p>
            ) : wishlistItems.length > 0 ? (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id + JSON.stringify(item.variant)}
                    className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">
                        {item.name}
                      </h3>
                      <p className="text-lg font-semibold text-red-600 mt-1">
                        {item.price}
                      </p>

                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 h-10 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </button>

                        <button
                          onClick={() => handleRemove(item.id, item.variant)}
                          className="h-10 w-10 border rounded text-red-600 hover:text-red-800 flex items-center justify-center"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleClear}
                  className="w-full mt-4 h-10 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Clear Wishlist
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Heart className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-500 text-sm">
                  {user
                    ? "Save items you love to come back later"
                    : "Login to save items permanently"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
