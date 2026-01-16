// lib/api/checkout.ts
export const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;



export interface CheckoutItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CheckoutPayload {
  userId: string;
  email: string;
  items: CheckoutItem[];
}

// export async function startCheckout(payload: CheckoutPayload) {
//   const res = await fetch(`${API_BASE}/payment/checkout`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) {
//     throw new Error("Checkout failed");
//   }

//   return res.json();
// }

export const startCheckout = async (data: {
  userId: string;
  email: string;
  items: any[];
}) => {
  const res = await fetch(`${API_BASE}/payments/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ REQUIRED
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Checkout failed");
  }

  return res.json();
};
