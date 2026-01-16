const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function checkAuth() {
  console.log("🔍 checkAuth() called");

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/user`, {
      method: "GET",
      credentials: "include", // send cookies
      cache: "no-store",
    });

    console.log("📡 Auth response status:", res.status);

    if (!res.ok) {
      console.log("❌ User NOT authenticated");
      return null;
    }

    const data = await res.json();
    console.log("✅ User authenticated:", data);

    return data; // user object
  } catch (err) {
    console.error("🔥 Auth check crashed:", err);
    return null;
  }
}
