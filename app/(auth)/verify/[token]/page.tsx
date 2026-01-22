"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify/${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Verification failed");
    } else {
      setMessage("Account verified! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-black/40">
        <h2 className="text-xl mb-4">Set Your Password</h2>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button disabled={loading}>
          {loading ? "Verifying..." : "Verify Account"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
