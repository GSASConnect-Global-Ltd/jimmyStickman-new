"use client";

import React, { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Heart } from "lucide-react";

import { IProduct } from "@/types/product";
import { addToWishlist } from "@/lib/api/wishlist";
interface Props {
  product: IProduct;
}

const Backend_URL = "http://localhost:5000";

const ProductCard = ({ product }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [adding, setAdding] = useState(false);

 const handleAddToWishlist = async () => {
  try {
    setAdding(true);

    const productId = product._id;
    if (!productId) {
      throw new Error("Product ID missing");
    }

    // Optional: if your products have size/color selected
    const variant = product.sizes?.[0] || product.colors?.[0]?.name;

    await addToWishlist(
      productId,
      // If you want to pass variant info:
      variant?.toString(), // size
      product.colors?.[0]?.value // color hex
    );

    alert("Added to wishlist ❤️");
  } catch (err: any) {
    console.error("Wishlist error:", err);
    alert(
      err?.response?.data?.message ||
      err.message ||
      "Failed to add to wishlist"
    );
  } finally {
    setAdding(false);
  }
};




  return (
    <Card className="p-2 shadow-sm hover:shadow-md transition relative">
      {/* Wishlist Button */}
      <button
        onClick={handleAddToWishlist}
        disabled={adding}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow hover:scale-110 transition"
      >
        <Heart
          className={`h-5 w-5 ${
            adding ? "text-gray-400" : "text-red-500"
          }`}
        />
      </button>

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        onSwiper={(s) => (swiperRef.current = s)}
      >
        {product.images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={Backend_URL + img}
              className="w-full h-60 object-cover rounded-md"
              alt={product.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-3">
        <p className="font-medium">{product.name}</p>
        <p className="text-gray-700">₦{product.price}</p>
        {product.offer && (
          <p className="text-red-500 text-sm">{product.offer}</p>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
