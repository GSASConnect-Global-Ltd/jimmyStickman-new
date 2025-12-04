import React from 'react';

// Reusable Section Component for paired product displays
const ProductPairSection = ({
  items,
  overlayOpacity = 'bg-black opacity-20',
  className = '',
}: {
  items: { title: string; image: string }[];
  overlayOpacity?: string;
  className?: string;
}) => (
  <div className={`w-screen h-screen flex flex-col sm:flex-row relative ${className}`}>
    {/* Overlay */}
    <div className={`absolute inset-0 ${overlayOpacity}`}></div>

    {/* Product Items */}
    {items.map((item, index) => (
      <div
        key={index}
        className="relative w-full sm:w-1/2 h-screen flex flex-col justify-end p-6"
      >
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-white text-center sm:text-left">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold mb-4">
            {item.title}
          </h2>
          <div className="flex justify-center sm:justify-start gap-6 text-lg sm:text-2xl font-light">
            <p className="pb-1 border-b-2 cursor-pointer hover:border-white transition">
              Shop Men's
            </p>
            <p className="pb-1 border-b-2 cursor-pointer hover:border-white transition">
              Shop Women's
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// MainContent Component
const MainContent = () => {
  return (
    <div className="w-full overflow-hidden">

      {/* === 1. HERO SECTION === */}
      <section className="relative w-screen h-screen flex flex-col sm:flex-row mt-2">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent sm:bg-black/30"></div>

        {/* Images */}
        <div className="w-full sm:w-1/2 h-full">
          <img
            src="https://cdn.pixabay.com/photo/2021/11/05/12/27/woman-6771288_1280.jpg"
            alt="Women's Fashion"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden sm:block sm:w-1/2 h-full">
          <img
            src="https://cdn.pixabay.com/photo/2024/11/08/05/28/man-9182458_1280.jpg"
            alt="Men's Fashion"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="absolute bottom-10 sm:bottom-16 left-1/2 transform -translate-x-1/2 text-white text-center w-11/12 sm:w-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 sm:mb-6 leading-tight">
            Weekend Ready
          </h2>
          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-light max-w-md mx-auto mb-6 sm:mb-8">
            Effortless comfort meets refined style—perfect for unwinding while looking polished.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 text-lg sm:text-2xl font-light">
            <a href="#" className="pb-2 border-b-2 border-white hover:opacity-80 transition">
              Shop Men's Pants
            </a>
            <a href="#" className="pb-2 border-b-2 border-white hover:opacity-80 transition">
              Shop Women's Pants
            </a>
          </div>
        </div>
      </section>

      {/* === 2. HOOD & JACKET SECTION === */}
      <ProductPairSection
        items={[
          {
            title: 'Hood',
            image: 'https://cdn.pixabay.com/photo/2022/10/30/07/45/mens-7556770_1280.jpg',
          },
          {
            title: 'Jacket',
            image: 'https://cdn.pixabay.com/photo/2024/12/15/16/59/girl-9269113_1280.jpg',
          },
        ]}
      />

      {/* === 3. DENIM & ACCESSORIES SECTION === */}
      <ProductPairSection
        className="mt-1"
        items={[
          {
            title: 'Denim',
            image: 'https://cdn.pixabay.com/photo/2022/01/05/15/16/woman-6917317_1280.jpg',
          },
          {
            title: 'Accessories',
            image: 'https://cdn.pixabay.com/photo/2017/08/01/16/32/people-2566433_1280.jpg',
          },
        ]}
      />

      {/* === 4. FULL-WIDTH BANNER === */}
      <section className="w-screen h-screen relative mt-1">
        <img
          src="https://cdn.pixabay.com/photo/2018/01/24/19/49/friendship-day-3104635_1280.jpg"
          alt="Friendship"
          className="w-full h-full object-cover object-center max-h-screen"
        />
      </section>

      {/* === 5. EXPLORE MORE SECTION === */}
      <section className="text-center py-16 bg-white">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-wide mb-6">
          Explore More
        </h2>
        <div className="flex justify-center gap-10 flex-wrap text-lg font-light">
          {["Men's Polo", "Women's Polo", "Kids' Polo", 'Accessories'].map((category, index) => (
            <p
              key={index}
              className="pb-2 border-b-2 border-gray-400 hover:border-black transition mt-3 cursor-pointer"
            >
              {category}
            </p>
          ))}
        </div>
      </section>

      {/* === 6. SIGNUP SECTION === */}
      <section className="relative w-full flex flex-col lg:flex-row justify-center items-center text-center lg:text-left gap-16 lg:gap-24 py-20 lg:py-28 px-6 lg:px-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        </div>

        {/* Text */}
        <div className="relative max-w-lg z-10">
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight">
            Sign Up
          </p>
          <div className="h-1 w-24 bg-black mx-auto lg:mx-0 my-4 rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-gray-800">
            With Jimmy Stickman
          </h2>
          <p className="text-gray-600 mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed">
            Enjoy <span className="font-semibold text-black">20% off</span> your first order and get early access to new drops and exclusive deals.
          </p>
        </div>

        {/* Form */}
        <div className="relative w-full max-w-md z-10">
          <div className="backdrop-blur-md bg-white/60  rounded-2xl p-6 sm:p-8 transition duration-300">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full flex-1 px-5 py-4 sm:py-5 border border-gray-300 rounded-xl text-lg md:text-xl focus:ring-2 focus:ring-black focus:outline-none placeholder-gray-400"
              />
              <button className="bg-black text-white w-full sm:w-auto px-8 py-4 sm:py-5 rounded-xl text-lg md:text-xl hover:bg-gray-800 active:scale-95 transition-all duration-200">
                Join Now
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center sm:text-left">
              By joining, you agree to receive exclusive emails from Jimmy Stickman.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default MainContent;
