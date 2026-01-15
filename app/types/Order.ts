export interface TrackingInfo {
  courier: string;
  trackingNumber: string;
  status?: string;
  location?: string;
  updatedAt?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  email: string;
  amount: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  tracking: TrackingInfo;
  createdAt: string;
  updatedAt: string;
}
