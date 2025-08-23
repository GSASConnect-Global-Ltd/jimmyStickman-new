"use client";

import React from "react";
import ProductDetails from "./ProductDetails";
import { IProduct } from "@/app/types/Product";
import ProductCard from "@/components/ui/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

const SingleProduct = () => {
  const product: IProduct & { id: string } = {
    id: "1",
    name: "Elegant Dress",
    price: "$49.99",
    offer: "20% Off - Limited Time",
    colors: [
      { name: "Red", value: "#FF0000" },
      { name: "Green", value: "#008000" },
      { name: "Orange", value: "#FFA500" },
    ],
    images: [
      "https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg",
      "https://cdn.pixabay.com/photo/2019/01/25/11/18/girl-3954232_1280.jpg",
      "https://cdn.pixabay.com/photo/2023/09/14/15/48/woman-8253239_1280.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  };

  const recommendedProducts: (IProduct & { id: string })[] = [
    {
      id: "2",
      name: "Luxury Wrist Watch",
      price: "$199.99",
      offer: "10% Off - Limited Stock",
      colors: [
        { name: "Silver", value: "#C0C0C0" },
        { name: "Gold", value: "#FFD700" },
      ],
      images: [
        "https://cdn.pixabay.com/photo/2017/03/20/15/13/wrist-watch-2159351_1280.jpg",
      ],
      sizes: [],
    },
    {
      id: "3",
      name: "Classic Leather Bag",
      price: "$89.99",
      offer: "15% Off - Exclusive Deal",
      colors: [
        { name: "Brown", value: "#8B4513" },
        { name: "Black", value: "#000000" },
      ],
      images: [
        "https://cdn.pixabay.com/photo/2016/11/29/09/41/bag-1868758_1280.jpg",
      ],
      sizes: [],
    },
  ];

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Mobile - Fullscreen Swiper */}
        <div className="block md:hidden w-full h-screen">
          <Swiper spaceBetween={10} slidesPerView={1} className="w-full h-full">
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt="Product" className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop - Scrollable Thumbnails */}
        <div className="hidden md:block w-full md:w-1/2 overflow-y-auto max-h-[600px] space-y-1 scrollbar-hide">
          {product.images.map((img, index) => (
            <img key={index} src={img} alt="Product" className="w-full h-[500px] object-cover" />
          ))}
        </div>

        {/* Product Details Section */}
        <ProductDetails product={product} />
      </div>

      {/* Recommended Products */}
      <h2 className="mt-10 text-2xl font-semibold">You May Also Like</h2>
      <div className="grid md:grid-cols-4 grid-cols-2 mt-6 gap-4">
        {recommendedProducts.map((item) => (
          <Link key={item.id} href={`/product/${item.id}`} className="block">
            <ProductCard product={item} hideColors={true} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SingleProduct;
