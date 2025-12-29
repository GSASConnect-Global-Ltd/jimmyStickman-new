export interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
}
