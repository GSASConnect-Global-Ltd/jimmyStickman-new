import { create } from "zustand";

interface VirtualAccount {
  bank: string;
  accountName: string;
  accountNumber: string;
}

interface CheckoutState {
  orderId: string | null;
  amount: number | null;
  bankDetails: VirtualAccount | null;
  setCheckout: (data: {
    orderId: string;
    amount: number;
    bankDetails: VirtualAccount;
  }) => void;
  clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  orderId: null,
  amount: null,
  bankDetails: null,

  setCheckout: (data) =>
    set({
      orderId: data.orderId,
      amount: data.amount,
      bankDetails: data.bankDetails,
    }),

  clearCheckout: () =>
    set({
      orderId: null,
      amount: null,
      bankDetails: null,
    }),
}));
