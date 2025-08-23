import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative w-full h-screen bg-black">
      {/* Background Image */}
      <img 
        src="https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599559_1280.jpg" 
        alt="Fashion Model"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Catchy Text */}
      <div className="absolute text-white max-w-lg px-6 md:px-10 
              bottom-10 left-10 md:left-10 lg:left-16 
              flex flex-col items-start 
              md:items-start lg:items-start 
              sm:items-center sm:text-center
              sm:bottom-1/2 sm:translate-y-1/2">
          
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
          Elevate Your Style
        </h1>
        
        <p className="mt-3 text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Discover the latest trends & exclusive fashion collections. Shop now and redefine your wardrobe!
        </p>
        
        <Link href="/product" className="mt-5 inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
