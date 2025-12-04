// C:\Next\j\project\jimmyStickman\components\ui\ProductCard.tsx

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IProduct } from "@/app/types/Product";
import { Swiper as SwiperClass } from "swiper"; // Import Swiper type

interface ProductCardProps {
  product: IProduct;
  hideColors?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, hideColors = false }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null); // Correctly type the Swiper instance

  const selectColor = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="relative"> {/* Adjusted spacing to be very close */}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        className="relative group"
        onSwiper={(swiper) => (swiperRef.current = swiper)} // No error now
      >
        {product.images.map((image: string, imgIndex: number) => (
          <SwiperSlide key={imgIndex}>
            <div className="relative">
              <img src={image} alt="Product" className="w-[300px] h-[500px] object-cover" />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black bg-opacity-30 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.images.map((_, buttonIndex: number) => (
                  <button
                    key={buttonIndex}
                    className="w-3 h-3 bg-white rounded-full opacity-70 hover:opacity-100"
                    onClick={() => swiperRef.current?.slideTo(buttonIndex)} // No error now
                  ></button>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <h3 className="mt-4 text-lg font-light">{product.name}</h3>
      <h3 className="text-lg font-extralight">{product.price}</h3>
      <p className="text-red-500 font-medium">{product.offer}</p>

       {/* Hide colors if hideColors is true */}
       {!hideColors && product.colors && product.colors.length > 0 && (
        <div className="flex items-center space-x-2 mt-2">
          {product.colors.map((color) => (
            <button
              key={color.value}
              className={`w-6 h-6 cursor-pointer border ${
                selectedColor === color.value ? "border-black" : "border-gray-300"
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => selectColor(color.value)}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
