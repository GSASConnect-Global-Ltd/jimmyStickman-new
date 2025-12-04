"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LucideFacebook, LucideApple } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();

  // State
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",   // ⭐ Required to receive cookies
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed. Please try again.");
      } else {
        setMessage("Login successful! Redirecting...");

        // Access Token comes in the JSON response
        // Refresh Token comes as httpOnly cookie (auto handled by browser)

        setTimeout(() => router.push("/dashboard"), 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Unable to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-[#2d046e] text-white overflow-hidden">
      
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-start pl-20 z-10">
        <h1 className="text-5xl mb-6">JimmyStickman</h1>
        <div className="flex flex-col gap-4 text-gray-400 text-lg">
          <span className="text-white font-semibold">New Arrivals</span>
          <span>Winters</span>
          <span>Women’s</span>
          <span>Men’s</span>
          <span>Kids</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center relative z-10">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl"></div>

        <div className="relative bg-white/10 p-10 rounded-3xl shadow-2xl w-[400px]">
          <h2 className="text-2xl font-bold mb-2">EXISTING MEMBER</h2>
          <p className="text-gray-300 mb-6">Welcome Back!</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="p-3 rounded-xl bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="p-3 rounded-xl bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Continue →"}
            </button>
          </form>

          {/* Messages */}
          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                message.includes("successful") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          <div className="my-6 flex items-center justify-center text-gray-400">
            <span className="text-sm">OR</span>
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-6 text-2xl">
            <FcGoogle
              className="cursor-pointer hover:scale-110 transition"
              onClick={() =>
                (window.location.href = "http://localhost:5000/api/auth/google")
              }
            />
            <LucideFacebook
              size={28}
              className="cursor-pointer text-gray-300 hover:text-blue-500 transition"
              onClick={() =>
                (window.location.href =
                  "http://localhost:5000/api/auth/facebook")
              }
            />
            <LucideApple
              size={28}
              className="cursor-pointer text-gray-300 hover:text-gray-100 transition"
            />
          </div>

          <p className="mt-6 text-sm text-gray-300 text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-purple-400 hover:underline">
              Register Now
            </a>
          </p>
        </div>
      </div>

      {/* Model Image */}
      <div className="absolute inset-y-0 right-[40%] flex justify-center items-center w-[700px]">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-3xl rounded-full"></div>

        <div className="relative w-[750px] h-[850px]">
          <Image
            src="/auth/model.PNG"
            alt="Model"
            fill
            className="object-contain opacity-90 drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
