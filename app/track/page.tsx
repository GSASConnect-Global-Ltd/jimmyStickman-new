"use client";

import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface TrackingHistory {
  status: string;
  message: string;
  date: string;
}

interface Order {
  _id: string;
  status: string;
  tracking: {
    trackingNumber?: string;
    courier?: string;
    trackingUrl?: string;
    history: TrackingHistory[];
  };
  items: OrderItem[];
  amount: number;
  createdAt: string;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!orderId) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/track/${orderId}`);
      if (!res.ok) throw new Error("Order not found");

      const data = await res.json();
      setOrder(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleTrack}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Track
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {order && (
        <div className="border p-4 rounded space-y-4">
          <h2 className="text-xl font-semibold">Order #{order._id}</h2>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">{order.status}</span>
          </p>
          {order.tracking.courier && (
            <p>
              <strong>Courier:</strong> {order.tracking.courier}
            </p>
          )}
          {order.tracking.trackingNumber && (
            <p>
              <strong>Tracking Number:</strong> {order.tracking.trackingNumber}
            </p>
          )}
          <p>
            <strong>Amount:</strong> ${order.amount.toFixed(2)}
          </p>
          <p>
            <strong>Placed On:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <div>
            <h3 className="font-semibold mt-4">Items:</h3>
            <ul className="list-disc pl-5">
              {order.items.map((item) => (
                <li key={item.productId}>
                  {item.name} x {item.quantity} (${item.price})
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mt-4">Tracking History:</h3>
            <ul className="list-decimal pl-5 space-y-1">
              {order.tracking.history.map((h, index) => (
                <li key={index}>
                  <span className="capitalize">{h.status}</span> - {h.message} (
                  {new Date(h.date).toLocaleString()})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
