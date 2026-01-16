"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Backend_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function ProductImages({ images }: { images: string[] }) {
  return (
    <div className="w-full md:w-1/2">
      {/* mobile carousel */}
      <div className="block md:hidden">
        <Carousel>
          <CarouselContent>
            {images.map((img, i) => {
              console.log(`Mobile image URL: ${Backend_URL}${img}`);
              return (
                <CarouselItem key={i}>
                  <img
                    src={`${Backend_URL}${img}`}
                    className="w-full h-[500px] object-cover"
                    alt={`Product image ${i + 1}`}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      {/* desktop scroll */}
      <div className="hidden md:block max-h-[600px] overflow-y-scroll space-y-3 scrollbar-hide">
        {images.map((img, i) => {
          console.log(`Desktop image URL: ${Backend_URL}${img}`);
          return (
            <img
              key={i}
              src={`${Backend_URL}${img}`}
              className="w-full rounded-md h-[500px] object-cover"
              alt={`Product image ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
