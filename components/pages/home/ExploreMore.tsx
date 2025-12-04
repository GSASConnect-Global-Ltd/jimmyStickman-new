"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const ExploreMore = () => {
  const items = [
    {
      img: "https://cdn.pixabay.com/photo/2016/11/29/01/34/man-1866572_1280.jpg",
      alt: "New Arrival",
      title: "New Arrival",
    },
    {
      img: "https://cdn.pixabay.com/photo/2018/01/24/19/49/friendship-day-3104635_1280.jpg",
      alt: "Jimmy Essentials",
      title: "Jimmy Essentials",
    },
    {
      img: "https://cdn.pixabay.com/photo/2018/01/24/19/49/friendship-day-3104635_1280.jpg",
      alt: "The Logo Shop",
      title: "The Logo Shop",
    },
    {
      img: "https://cdn.pixabay.com/photo/2018/01/24/19/49/friendship-day-3104635_1280.jpg",
      alt: "JimmyStickman Stories",
      title: "JimmyStickman Stories",
    },
  ];

  return (
    <div className="py-12 px-4 md:px-12">
      <h2 className="text-center text-3xl md:text-4xl font-normal text-gray-900 mb-10">
        Explore More
      </h2>

      {/* Swiper for Mobile View */}
      <div className="sm:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
          modules={[Pagination]}
          className="w-full"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="group relative text-center">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <p className="mt-3 text-lg font-medium text-gray-800 group-hover:text-black transition">
                  {item.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid Layout for Larger Screens */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <div key={index} className="group relative text-center">
            <img
              src={item.img}
              alt={item.alt}
              className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <p className="mt-3 text-lg font-medium text-gray-800 group-hover:text-black transition">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
