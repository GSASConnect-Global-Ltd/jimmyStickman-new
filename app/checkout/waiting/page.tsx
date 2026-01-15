"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderStatus } from "@/lib/api/order"; // make sure this exists

export default function WaitingForPaymentPage() {
  const router = useRouter();

  const { orderId, bankDetails, amount } = useCheckoutStore();

  useEffect(() => {
    if (!orderId) return;

    let interval: NodeJS.Timeout;

    const pollPaymentStatus = async () => {
      try {
        const order = await getOrderStatus(orderId);

        if (order?.status === "paid") {
          clearInterval(interval);
          router.push("/checkout/success");
        }
      } catch (error) {
        console.error("Polling error:", error);
        // optional: stop polling on repeated failure
      }
    };

    interval = setInterval(pollPaymentStatus, 5000);

    return () => clearInterval(interval);
  }, [orderId, router]);

  if (!bankDetails || !amount) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        No active checkout session
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Payment</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Transfer the exact amount below to the virtual account
          </p>

          <div className="text-2xl font-bold">
            ₦{amount.toLocaleString()}
          </div>

          <div className="border rounded-lg p-4 space-y-2">
            <p>
              <strong>Bank:</strong> {bankDetails.bank}
            </p>
            <p>
              <strong>Account Name:</strong> {bankDetails.accountName}
            </p>
            <p className="text-xl font-semibold">
              {bankDetails.accountNumber}
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            Payment is detected automatically. Please wait…
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
