import axios from "axios";
import type { CartResponse } from "@/types/cart";

const API_BASE = "http://localhost:5000/api";

const cartAPI = axios.create({
  baseURL: `${API_BASE}/cart`,
  withCredentials: true,
});

/* ---------------- CART APIs ---------------- */

export const addToCart = async (
  productId: string,
  quantity: number = 1
): Promise<CartResponse> => {
  const res = await cartAPI.post<CartResponse>("/add", {
    productId,
    quantity,
  });
  return res.data;
};

export const getCart = async (): Promise<CartResponse> => {
  const res = await cartAPI.get<CartResponse>("/");
  return res.data;
};

export const removeFromCart = async (
  productId: string
): Promise<CartResponse> => {
  const res = await cartAPI.post<CartResponse>("/remove", { productId });
  return res.data;
};

export const clearCart = async (): Promise<CartResponse> => {
  const res = await cartAPI.post<CartResponse>("/clear");
  return res.data;
};
