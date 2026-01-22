"use client";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react"; // ✅ import React
import { X, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartPanel = ({ isOpen, onClose }: CartPanelProps) => {
  const { cartItems, loading, addItem, removeItem, clearCartItems } = useCart();
  const router = useRouter();
  /* ---------------- Escape Handling ---------------- */
  useEffect(() => { // ✅ now useEffect is imported
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

  const subtotal = cartItems.reduce((sum, item) => {
  if (!item.product) return sum;
  return sum + item.product.price * item.quantity;
}, 0);

  const shipping = cartItems.length > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  const increaseQty = async (productId: string) => {
  try {
    await addItem(productId, 1);
    toast.success("Quantity increased");
  } catch {
    toast.error("Failed to increase quantity");
  }
};

const decreaseQty = async (productId: string, qty: number) => {
  try {
    if (qty <= 1) {
      await removeItem(productId);
      toast.success("Item removed from cart");
    } else {
      await addItem(productId, -1); // only if your backend supports negative qty
      toast.success("Quantity decreased");
    }
  } catch {
    toast.error("Failed to decrease quantity");
  }
};


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
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {cartItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0)-1}
              </span>


            </div>
            <button onClick={onClose}>
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <p className="text-center text-gray-500">Loading cart...</p>
            ) : cartItems.length > 0 ? (
              <div className="space-y-4">
                {/* {cartItems.map((item) => ( */}
                {cartItems
                  .filter(item => item.product)
                  .map((item) => (
                  <div
                    key={item.product._id}
                    className="flex gap-4 p-4 border rounded-lg"
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item.product.images?.[0]}`}
                      className="h-20 w-20 rounded-lg object-cover"
                      alt={item.product.name}
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-sm truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-blue-600 font-semibold">
                        ₦{item.product.price.toFixed(2)}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              decreaseQty(item.product._id, item.quantity)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => increaseQty(item.product._id)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            try {
                              removeItem(item.product._id);
                              toast.success("Item removed from cart");
                            } catch (err) {
                              console.error("Failed to remove item:", err);
                              toast.error("Failed to remove item");
                            }
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Your cart is empty
              </p>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-semibold">₦{total.toFixed(2)}</span>
              </div>
              <button
                className="w-full h-12 bg-blue-600 text-white rounded"
                onClick={() => {
                  onClose();
                  router.push("/checkout");
                }}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCartItems}
                className="w-full h-10 border border-red-500 text-red-500 rounded mt-2"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
