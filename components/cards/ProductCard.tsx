"use client";

import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { IProduct } from "@/types/product";


const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
export default function ProductCard({ product, hideColors = false }: { product: IProduct; hideColors?: boolean }) {
  return (
    <Card className="p-2 hover:shadow-xl transition cursor-pointer">
      <Carousel className="w-full">
        <CarouselContent>
          {product.images.map((img, i) => (
            <CarouselItem key={i}>
              <img className="w-full h-[350px] object-cover rounded-md" src={img} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-3">
        <h3 className="text-lg font-light">{product.name}</h3>
        <p className="text-gray-700">{product.price}</p>
        <p className="text-red-500 text-sm">{product.offer}</p>

       {!hideColors && product.colors && product.colors.length > 0 && (
  <div className="flex gap-2 mt-3">
    {product.colors.map((c) => (
      <span
        key={c.name}
        className="w-5 h-5 rounded-full border"
        style={{ backgroundColor: c.value }}
      />
    ))}
  </div>
)}

      </div>
    </Card>
  );
}
