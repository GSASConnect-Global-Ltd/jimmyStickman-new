"use client";

import { User, Mail, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/api/auth";

export default function AccountPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (err) {
        console.error("Failed to load user", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-gray-500">
        Loading account...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <p className="text-lg font-medium">You are not logged in</p>
        <a
          href="/login"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold">My Account</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Profile Information</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Security</h2>

          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            <p className="text-sm text-gray-600">
              Your account is protected using secure authentication.
            </p>
          </div>

          <button
            className="mt-6 w-full rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
            disabled
          >
            Change Password (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
