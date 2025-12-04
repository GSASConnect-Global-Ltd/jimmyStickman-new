"use client";
import { MailCheck } from "lucide-react";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-[#2d046e] text-white">
      <div className="relative bg-white/10 p-10 rounded-3xl shadow-2xl w-[400px] text-center backdrop-blur-sm border border-gray-700">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-2xl rounded-3xl -z-10"></div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-full">
            <MailCheck size={40} className="text-white" />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
        <p className="text-gray-300 mb-6">
          We’ve sent a verification link to your registered email address.
          Please check your inbox and click the link to verify your account.
        </p>

        {/* Optional resend or back link */}
        <div className="flex flex-col items-center gap-2 text-sm text-gray-400">
          <p>Didn’t receive the email?</p>
          <a
            href="#"
            className="text-purple-400 hover:underline hover:text-purple-300"
          >
            Resend Verification
          </a>
        </div>
      </div>
    </div>
  );
}
