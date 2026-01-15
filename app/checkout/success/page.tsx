"use client";

import { useCheckoutStore } from "@/store/useCheckoutStore";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  const clearCheckout = useCheckoutStore((s) => s.clearCheckout);

  return (
    <div className="container mx-auto py-20 text-center space-y-6">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p>Your order has been confirmed.</p>

      <Button onClick={clearCheckout}>
        Continue Shopping
      </Button>
    </div>
  );
}
