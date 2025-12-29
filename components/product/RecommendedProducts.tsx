import { IProduct } from "@/types/product";
import ProductCard from "@/components/cards/ProductCard";

export default function RecommendedProducts({ items }: { items: IProduct[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold">You May Also Like</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {items.map((p) => (
          <ProductCard key={p._id} product={p} hideColors />
        ))}
      </div>
    </div>
  );
}
