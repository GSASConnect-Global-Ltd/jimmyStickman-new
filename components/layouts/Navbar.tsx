"use client";

import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartPanel } from "./CartPanel";
import { SearchPanel } from "./SearchPanel";
import { WishlistPanel } from "./WishlistPanel";
import { checkAuth } from "@/utils/checkAuth";
import Image from "next/image";

import { getUser } from "@/lib/api/auth";
import { useWishlist } from "@/context/WishlistContext";

const Backend_URL = process.env.NEXT_PUBLIC_API_URL!;

export const Navbar = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  const { count: wishlistCount } = useWishlist();
  const router = useRouter();

  const openPanel = (panel: string) => setActivePanel(panel);
  const closePanel = () => setActivePanel(null);

 useEffect(() => {
  const verifyAuth = async () => {
    console.log("🚀 Navbar: verifying authentication...");

    const userData = await checkAuth();

    if (userData) {
      console.log("🟢 Navbar: user logged in");
      console.log("👤 User data:", userData);

      setIsAuthenticated(true);
      setUser(userData);
    } else {
      console.log("🔴 Navbar: user NOT logged in");

      setIsAuthenticated(false);
      setUser(null);
    }
  };

  verifyAuth();
}, []);



  const handleLogout = async () => {
    try {
      await fetch(`${Backend_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setUser(null);
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
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="JimmyStickman Logo"
                width={100}
                height={100}
                priority
              />
            </Link>

          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search, Wishlist, Cart */}
            <button
              onClick={() => openPanel("search")}
              className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded transition"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>

            <button
              onClick={() => openPanel("wishlist")}
              className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded relative transition"
            >
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {wishlistCount}
              </span>
            </button>

            <button
              onClick={() => openPanel("cart")}
              className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded relative transition"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                2
              </span>
            </button>

            {/* Profile */}
            {/* <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded transition"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <User className="h-4 w-4" />
                <span>{isAuthenticated ? user?.name : "Profile"}</span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-md z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        href="/account"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Account
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                      <div className="border-t" />
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div> */}

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
          <Link
            href="/account"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            My Account
          </Link>
          <div className="border-t" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-red-100 text-left text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
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
