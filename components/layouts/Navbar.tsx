"use client";

import { useState } from "react";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { CartPanel } from "./CartPanel";
import { SearchPanel } from "./SearchPanel";
import { WishlistPanel } from "./WishlistPanel";

export const Navbar = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const openPanel = (panel: string) => setActivePanel(panel);
  const closePanel = () => setActivePanel(null);

  const categories = ["Men", "Women", "Sport", "Underwear", "Jeans"];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              JimmyStickman
            </h1>
          </div>

          {/* Categories (Centered) */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {categories.map((cat) => (
              <Link
                key={cat}
                href="/product"
                className="text-gray-700 hover:text-black font-medium transition"
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Desktop Navigation (Right) */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded transition"
              onClick={() => openPanel("search")}
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>

            <button
              className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded relative transition"
              onClick={() => openPanel("wishlist")}
            >
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                3
              </span>
            </button>

            <button
              className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded relative transition"
              onClick={() => openPanel("cart")}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                2
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded transition"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-md z-50">
                  <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100">
                    <User className="h-4 w-4" />
                    My Account
                  </button>
                  <button className="w-full px-4 py-2 hover:bg-gray-100 text-left">
                    Settings
                  </button>
                  <button className="w-full px-4 py-2 hover:bg-gray-100 text-left">
                    Orders
                  </button>
                  <div className="border-t" />
                  <button className="w-full px-4 py-2 hover:bg-red-100 text-left text-red-600">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              className="p-2 hover:bg-gray-100 rounded transition"
              onClick={() => openPanel("search")}
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              className="relative p-2 hover:bg-gray-100 rounded transition"
              onClick={() => openPanel("wishlist")}
            >
              <Heart className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                3
              </span>
            </button>
            <button
              className="relative p-2 hover:bg-gray-100 rounded transition"
              onClick={() => openPanel("cart")}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                2
              </span>
            </button>
            <div className="relative">
              <button
                className="p-2 hover:bg-gray-100 rounded transition"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <User className="h-4 w-4" />
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-md z-50">
                  <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100">
                    <User className="h-4 w-4" />
                    My Account
                  </button>
                  <button className="w-full px-4 py-2 hover:bg-gray-100 text-left">
                    Settings
                  </button>
                  <button className="w-full px-4 py-2 hover:bg-gray-100 text-left">
                    Orders
                  </button>
                  <div className="border-t" />
                  <button className="w-full px-4 py-2 hover:bg-red-100 text-left text-red-600">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Panels */}
      <SearchPanel isOpen={activePanel === "search"} onClose={closePanel} />
      <WishlistPanel isOpen={activePanel === "wishlist"} onClose={closePanel} />
      <CartPanel isOpen={activePanel === "cart"} onClose={closePanel} />
    </>
  );
};
