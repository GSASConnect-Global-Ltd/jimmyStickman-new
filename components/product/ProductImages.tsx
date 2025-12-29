"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function ProductImages({ images }: { images: string[] }) {
  return (
    <div className="w-full md:w-1/2">
      {/* mobile carousel */}
      <div className="block md:hidden">
        <Carousel>
          <CarouselContent>
            {images.map((img, i) => {
              console.log(`Mobile image URL: http://localhost:5000${img}`);
              return (
                <CarouselItem key={i}>
                  <img
                    src={`http://localhost:5000${img}`}
                    className="w-full h-[500px] object-cover"
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
           console.log(`Desktop image URL: http://localhost:5000${img}`);
          return (
            <img
              key={i}
              src={`http://localhost:5000${img}`}
              className="w-full rounded-md h-[500px] object-cover"
            />
          );
        })}
      </div>
    </div>
  );
}
