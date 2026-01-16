// lib/api/wishlist.ts
import axios from "axios";
import { IWishlist } from "@/types/product";

export const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;


export const fetchWishlist = async (): Promise<IWishlist> => {
  const res = await axios.get<IWishlist>(`${API_BASE}/wishlist`, {
    withCredentials: true,
  });
  return res.data;
};

export const addToWishlist = async (
  productId: string,
  size?: string,
  color?: string
): Promise<IWishlist> => {
  const res = await axios.post<IWishlist>(
    `${API_BASE}/wishlist/add`,
    { productId, variant: { size, color } },
    { withCredentials: true }
  );
  return res.data;
};

export const removeFromWishlist = async (
  productId: string,
  size?: string,
  color?: string
): Promise<IWishlist> => {
  const res = await axios.post<IWishlist>(
    `${API_BASE}/wishlist/remove`,
    { productId, variant: { size, color } },
    { withCredentials: true }
  );
  return res.data;
};

export const clearWishlist = async () => {
  await axios.post(`${API_BASE}/wishlist/clear`, {}, { withCredentials: true });
};
