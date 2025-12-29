// app/product/[id]/page.tsx
import SingleProduct from "@/components/product/SingleProduct";
import { fetchProductById } from "@/lib/api/product";
import { IProduct } from "@/types/product";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productData = await fetchProductById(id);
  const product: IProduct = productData as IProduct;

  return <SingleProduct product={product} />;
}
