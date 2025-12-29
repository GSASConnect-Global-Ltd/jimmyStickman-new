import axios from "axios";

export const API_BASE = "http://localhost:5000/api";
import { IProduct, IWishlist } from "@/types/product";


export async function registerUser(data: any) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data: any) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // Important for refreshToken cookie
  });

  return res.json();
}

export async function refreshToken() {
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
}

// export const fetchProducts = async (): Promise<IProduct[]> => {
//   const res = await axios.get(`${API_BASE}/products`);
//   return res.data as IProduct[]; // cast to IProduct[]
// };




// wishlist
// ---------------------- WISHLIST ----------------------

export const fetchWishlist = async (): Promise<IWishlist> => {
  const res = await axios.get<IWishlist>(`${API_BASE}/wishlist`, {
    withCredentials: true,
  });
  return res.data;
};

export const addToWishlist = async (
  productId: string,
  size: string,
  color: string
): Promise<IWishlist> => {
  const res = await axios.post<IWishlist>(
    `${API_BASE}/wishlist/add`,
    {
      productId,
      variant: {
        size,
        color,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

export const removeFromWishlist = async (
  productId: string,
  size: string,
  color: string
): Promise<IWishlist> => {
  const res = await axios.post<IWishlist>(
    `${API_BASE}/wishlist/remove`,
    {
      productId,
      variant: {
        size,
        color,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

export const clearWishlist = async (): Promise<IWishlist> => {
  const res = await axios.post<IWishlist>(
    `${API_BASE}/wishlist/clear`,
    {},
    { withCredentials: true }
  );
  return res.data;
};




