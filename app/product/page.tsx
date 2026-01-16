import { Suspense } from "react";
import ProductsList from "@/components/products/ProductsList";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading products...</div>}>
      <ProductsList />
    </Suspense>
  );
}
