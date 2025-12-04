import axios from "axios";

export const API_BASE = "http://localhost:5000/api";
import { IProduct } from "@/types/product";

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


export const fetchProducts = async (): Promise<IProduct[]> => {
  const res = await axios.get<IProduct[]>(`${API_BASE}/products`);
  return res.data;
};


export const filterProducts = async (
  query: Record<string, any>
): Promise<IProduct[]> => {
  const res = await axios.get<{ count: number; products: IProduct[] }>(
    `${API_BASE}/products/filter`,
    { params: query }
  );

  return res.data.products;
};


export const fetchProductById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/products/${id}`);
  return res.data;
};

export const searchProducts = async (query: Record<string, any>) => {
  const params = new URLSearchParams(query).toString();
  const res = await axios.get(`${API_BASE}/products/search?${params}`);
  return res.data;
};





