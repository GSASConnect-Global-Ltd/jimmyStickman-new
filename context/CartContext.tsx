"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, CartResponse } from "@/types/cart";
import { getCart, addToCart, removeFromCart, clearCart } from "@/lib/api/cart";

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  refreshCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCartItems: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    try {
      setLoading(true);
      const cart = await getCart();
      setCartItems(cart.items);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setCartItems([]); // not logged in
      } else {
        console.error("Failed to fetch cart", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId: string, quantity = 1) => {
    try {
      await addToCart(productId, quantity);
      await refreshCart();
    } catch (error: any) {
      if (error?.response?.status === 401) {
        alert("Please login to add items to cart");
      } else {
        console.error("Add to cart failed", error);
      }
    }
  };

  const removeItem = async (productId: string) => {
    await removeFromCart(productId);
    await refreshCart();
  };

  const clearCartItems = async () => {
    await clearCart();
    await refreshCart();
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        refreshCart,
        addItem,
        removeItem,
        clearCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

