// WishlistContext.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchWishlist } from "@/lib/api";

interface WishlistContextType {
  count: number;
  items: any[];
  refresh: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType>({
  count: 0,
  items: [],
  refresh: async () => {},
});

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<any[]>([]);

  const refresh = async () => {
    try {
      const wishlist = await fetchWishlist();
      setItems(wishlist.products);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <WishlistContext.Provider value={{ count: items.length, items, refresh }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
