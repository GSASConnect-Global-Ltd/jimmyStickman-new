
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;


export async function getOrderStatus(orderId: string) {
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch order");

  return res.json();
}


export async function getOrderById(orderId: string) {
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }

  return res.json();
}