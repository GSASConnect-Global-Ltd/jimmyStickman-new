"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Order } from "@/app/types/Order"; // ✅ IMPORT TYPE

export default function TrackOrderDetailPage() {
  const { trackId } = useParams<{ trackId: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${trackId}`,
          { credentials: "include" } // ✅ IMPORTANT (auth cookie)
        );

        if (!res.ok) throw new Error("Order not found");

        const data: Order = await res.json();
        setOrder(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    if (trackId) fetchOrder();
  }, [trackId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Track Order #{trackId}
      </h1>

      {order && (
        <div className="space-y-2">
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Courier:</strong> {order.tracking.courier}</p>
          <p><strong>Tracking No:</strong> {order.tracking.trackingNumber}</p>
          <p><strong>Amount:</strong> ₦{order.amount.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
