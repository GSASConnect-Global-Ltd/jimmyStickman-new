"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { getUser } from "@/lib/api/auth";
import { useCart } from "@/context/CartContext"; // ✅ FIX

export default function CheckoutPage() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const { cartItems, loading: cartLoading } = useCart(); // ✅

  // 🔒 Redirect if cart is empty (after cart loads)
  useEffect(() => {
    if (!cartLoading && cartItems.length === 0) {
      router.replace("/");
    }
  }, [cartItems, cartLoading, router]);

  useEffect(() => {
    const loadUser = async () => {
      const authUser = await getUser();

      if (!authUser) {
        router.replace("/login?redirect=/checkout");
        return;
      }

      setUser(authUser);
      setLoading(false);
    };

    loadUser();
  }, [router]);

  if (loading || cartLoading) {
    return <p className="p-10">Preparing checkout…</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <CheckoutForm user={user} />
        </div>

        <OrderSummary />
      </div>
    </div>
  );
}
