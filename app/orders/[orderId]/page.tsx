"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderById } from "@/lib/api/order";

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;

    getOrderById(orderId as string)
      .then(setOrder)
      .catch(() => setError("Unable to load order"))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <p>Loading order...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>

      {/* ORDER SUMMARY */}
      <div className="border rounded p-4 mb-6">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ₦{order.amount.toLocaleString()}</p>
      </div>

      {/* TRACKING INFO */}
      {order.tracking?.trackingNumber && (
        <div className="border rounded p-4 mb-6">
          <p><strong>Courier:</strong> {order.tracking.courier}</p>
          <p><strong>Tracking No:</strong> {order.tracking.trackingNumber}</p>

          {order.tracking.trackingUrl && (
            <a
              href={order.tracking.trackingUrl}
              target="_blank"
              className="text-blue-600 underline"
            >
              Track on courier website
            </a>
          )}
        </div>
      )}

      {/* TIMELINE */}
      <h2 className="font-semibold mb-2">Tracking Timeline</h2>
      <div className="space-y-3">
        {order.tracking?.history?.map((step: any, index: number) => (
          <div key={index} className="border-l-4 border-blue-600 pl-3">
            <p className="font-medium capitalize">{step.status}</p>
            <p className="text-sm text-gray-600">{step.message}</p>
            <p className="text-xs text-gray-400">
              {new Date(step.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* ITEMS */}
      <h2 className="font-semibold mt-6 mb-2">Items</h2>
      {order.items.map((item: any) => (
        <div key={item.productId} className="flex gap-4 mb-3">
          <img src={item.image} className="w-16 h-16 object-cover rounded" />
          <div>
            <p className="font-medium">{item.name}</p>
            <p>
              ₦{item.price} × {item.quantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
