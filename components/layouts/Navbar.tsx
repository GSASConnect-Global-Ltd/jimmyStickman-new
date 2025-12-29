"use client";

import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartPanel } from "./CartPanel";
import { SearchPanel } from "./SearchPanel";
import { WishlistPanel } from "./WishlistPanel";
import { checkAuth } from "@/utils/checkAuth";
import { fetchWishlist } from "@/lib/api";

import { useWishlist } from "@/context/WishlistContext";



export const Navbar = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
   const { count: wishlistCount } = useWishlist();

  const router = useRouter();

  const openPanel = (panel: string) => setActivePanel(panel);
  const closePanel = () => setActivePanel(null);

  const categories = ["Men", "Women", "Sport", "Underwear", "Jeans"];

  // ✅ Check authentication on mount
  useEffect(() => {
  const verifyAuth = async () => {
    const authStatus = await checkAuth();
    setIsAuthenticated(authStatus);

    if (authStatus) {
      try {
        const wishlist = await fetchWishlist();
      } catch (error) {
        console.error("Failed to fetch wishlist count:", error);
      }
    }
  };
  verifyAuth();
}, []);

// const refreshWishlistCount = async () => {
//   try {
//     const wishlist = await fetchWishlist();
//     setWishlistCount(wishlist.products.length);
//   } catch (error) {
//     console.error("Failed to fetch wishlist count:", error);
//   }
// };



  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include", // to clear refresh token cookie
      });

      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setProfileMenuOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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

          {/* Categories */}
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

          {/* Desktop Right Side */}
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
                {wishlistCount}
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
                  {isAuthenticated ? (
                    <>
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
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-red-100 text-left text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-gray-100 text-left"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-4 py-2 hover:bg-gray-100 text-left"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
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
