// C:\Next\j\project\jimmyStickman\types\product.ts

export interface IProductColor {
  name: string;
  value: string; // hex color e.g. #000000
}

export interface IProduct {
   _id?: string;
  id?: string;
  name: string;
  description?: string;
  price: number | string;
  brand?: string;
  material?: string;
  gender?: string;
  colors?: { name: string; value: string }[];
  sizes?: string[];
  stockBySize?: { size: string; quantity: number }[];
  sku?: string;
  images: string[];
  offer?: string;
}





export interface IWishlistItem {
  product: IProduct;
  variant?: { size?: string; color?: string };
  addedAt?: string;
}

export interface IWishlist {
  wishlistId: string;
  products: IWishlistItem[];
}