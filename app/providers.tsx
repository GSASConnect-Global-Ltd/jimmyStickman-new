"use client";

import { WishlistProvider } from "@/context/WishlistContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WishlistProvider>{children}</WishlistProvider>;
}
