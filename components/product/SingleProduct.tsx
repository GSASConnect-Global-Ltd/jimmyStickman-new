"use client";

import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import RecommendedProducts from "./RecommendedProducts";
import { IProduct } from "@/types/product";

interface SingleProductProps {
  product: IProduct;
}

export default function SingleProduct({ product }: SingleProductProps) {

  const recommended: IProduct[] = [
    {
      _id: "2",
      name: "Luxury Wrist Watch",
      price: 199.99,
      offer: "10% Off - Limited Stock",
      images: ["https://cdn.pixabay.com/photo/2017/03/20/15/13/wrist-watch-2159351_1280.jpg"],
      colors: [
        { name: "Silver", value: "#C0C0C0" },
        { name: "Gold", value: "#FFD700" },
      ],
      sizes: [],
    },
    {
      _id: "3",
      name: "Classic Leather Bag",
      price: 89.99,
      offer: "15% Off - Exclusive Deal",
      images: ["https://cdn.pixabay.com/photo/2016/11/29/09/41/bag-1868758_1280.jpg"],
      colors: [
        { name: "Brown", value: "#8B4513" },
        { name: "Black", value: "#000000" },
      ],
      sizes: [],
    },
  ]

  const handleWishlistUpdate = () => {
    // refresh navbar state here
    // or trigger context / store update
    console.log("Wishlist updated");
  };

  return (
    <div className="p-4 md:p-10 space-y-14">
      <div className="flex flex-col md:flex-row gap-10">
        <ProductImages images={product.images} />
        <ProductDetails
          product={product}
          onWishlistUpdate={handleWishlistUpdate}
        />
      </div>

      <RecommendedProducts items={recommended} />
    </div>
  );
}
