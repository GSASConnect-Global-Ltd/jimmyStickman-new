"use client";

import { useState } from "react";
import axios from "axios";
import { MailCheck } from "lucide-react";

export default function RequestResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  interface ForgotPasswordResponse {
  message: string;
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post<ForgotPasswordResponse>(
  `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
  { email }
);

      setSuccess(res.data.message || "Reset link sent. Check your email."); 
      setEmail("");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-[#2d046e] px-4 text-white">
      <div className="relative w-full max-w-md bg-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur border border-gray-700">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-2xl rounded-3xl -z-10" />

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-full">
            <MailCheck size={36} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">
          Reset your password
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Enter your email and we’ll send you a password reset link.
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-400 text-center">{error}</p>
        )}

        {success && (
          <p className="mb-4 text-sm text-green-400 text-center">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
