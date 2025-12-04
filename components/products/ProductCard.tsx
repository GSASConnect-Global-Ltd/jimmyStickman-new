// C:\Next\j\project\jimmyStickman\components\products\ProductCard.tsx

"use client";

import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
// import { IProduct } from "@/types/product";

import { IProduct } from "@/types/product";

interface Props {
  product: IProduct;
}

const Backend_URL = "http://localhost:5000";

const ProductCard = ({ product }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Card className="p-2 shadow-sm hover:shadow-md transition cursor-pointer">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        onSwiper={(s) => (swiperRef.current = s)}
      >
        {product.images.map((img, index) => (
          
          <SwiperSlide key={index}>
            <img
              src={Backend_URL+img}
              className="w-full h-60 object-cover rounded-md"
              alt={product.name}
            />
          </SwiperSlide>
        ))}




        {
          product.images.map((img, index) =>{

            console.log("Image URL:", Backend_URL+img); // Debugging line

            return(
              <SwiperSlide key={index}>
            <img
              src={ Backend_URL+img}
              className="w-full h-60 object-cover rounded-md"
              alt={product.name}
            />
          </SwiperSlide>
            );
          })
        }
      </Swiper>

      <div className="mt-3">
        <p className="font-medium">{product.name}</p>
        <p className="text-gray-700">{product.price}</p>
        <p className="text-red-500 text-sm">{product.offer}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
