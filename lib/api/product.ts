import axios from "axios";

export const API_BASE = "http://localhost:5000/api";
import { IProduct, IWishlist } from "@/types/product";



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
