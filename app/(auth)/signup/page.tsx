"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { LucideFacebook, LucideApple } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    const res = await registerUser({
      name: formData.name,
      email: formData.email,
      // password: formData.password,
    });

    if (res?.error) {
      setMessage(res.error || "Registration failed");
    } else {
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => router.push("/verify"), 2000);
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-[#2d046e] text-white overflow-hidden">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-start pl-20 z-10">
        <h1 className="text-5xl mb-6">JimmyStickman</h1>
        <div className="flex flex-col gap-4 text-gray-400 text-lg">
          <span className="text-white font-semibold">Exclusive Deals</span>
          <span>Trending Styles</span>
          <span>Premium Quality</span>
          <span>Affordable Prices</span>
          <span>Worldwide Delivery</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center items-center relative z-10">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl"></div>

        <div className="relative bg-white/10 p-10 rounded-3xl shadow-2xl w-[420px]">
          <h2 className="text-2xl font-bold mb-2">CREATE ACCOUNT</h2>
          <p className="text-gray-300 mb-6">Join the JimmyStickman family!</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
  <input
    type="text"
    name="name"
    placeholder="Full Name"
    value={formData.name}
    onChange={handleChange}
    required
  />

  <input
    type="email"
    name="email"
    placeholder="Email address"
    value={formData.email}
    onChange={handleChange}
    required
  />

  <button type="submit" disabled={loading}>
    {loading ? "Creating Account..." : "Create Account →"}
  </button>
</form>


          {message && (
            <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
          )}

          <div className="my-6 flex items-center justify-center text-gray-400">
            <span className="text-sm">OR</span>
          </div>

          <div className="flex justify-center gap-6 text-2xl">
            <FcGoogle className="cursor-pointer hover:scale-110 transition" />
            <LucideFacebook
              size={28}
              className="cursor-pointer text-gray-300 hover:text-blue-500 transition"
            />
            <LucideApple
              size={28}
              className="cursor-pointer text-gray-300 hover:text-gray-100 transition"
            />
          </div>

          <p className="mt-6 text-sm text-gray-300 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-purple-400 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>

      {/* Right Image */}
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
