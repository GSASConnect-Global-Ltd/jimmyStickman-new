"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Heart } from "lucide-react";

import { IProduct } from "@/types/product";
import { addToWishlist } from "@/lib/api/wishlist";

interface Props {
  product: IProduct;
}

const Backend_URL = process.env.NEXT_PUBLIC_API_URL!;

const ProductCard = ({ product }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [adding, setAdding] = useState(false);

  const handleAddToWishlist = async () => {
    try {
      setAdding(true);

      const productId = product._id;
      if (!productId) throw new Error("Product ID missing");

      const variant = product.sizes?.[0] || product.colors?.[0]?.name;

      await addToWishlist(
        productId,
        variant?.toString(),
        product.colors?.[0]?.value
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
    <div className="group relative">
      {/* IMAGE AREA */}
      <div className="relative overflow-hidden bg-gray-100">
        {/* Wishlist (hidden until hover) */}
        <button
          onClick={handleAddToWishlist}
          disabled={adding}
          className="absolute top-3 right-3 z-10 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
        >
          <Heart
            className={`h-4 w-4 ${
              adding ? "text-gray-400" : "text-red-500"
            }`}
          />
        </button>

        {/* Swiper */}
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          onSwiper={(s) => (swiperRef.current = s)}
          className="h-[420px]"
        >
          {product.images.map((img, index) => (
            <SwiperSlide key={index}>
              <Link href={`/product/${product._id}`}>
                <img
                  src={Backend_URL + img}
                  alt={product.name}
                  className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Quick View (ZARA-style hover CTA) */}
        <Link href={`/product/${product._id}`}>
          <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition">
            QUICK VIEW
          </button>
        </Link>
      </div>

      {/* TEXT AREA */}
      <div className="mt-3 space-y-1">
        <p className="text-sm font-medium uppercase tracking-wide">
          {product.name}
        </p>

        <p className="text-sm text-gray-800">
          ₦{product.price}
        </p>

        {product.offer && (
          <p className="text-xs text-red-500">{product.offer}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
