import { IProduct } from "@/types/product";

export interface IWishlistItem {
  product: IProduct;
  variant?: { size?: string; color?: string };
  addedAt?: string;
}

export interface IWishlist {
  user: string; // user id
  products: IWishlistItem[];
}
