// utils/checkAuth.ts
export async function checkAuth() {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const res = await fetch("http://localhost:5000/api/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return false;
    const data = await res.json();
    console.log("🔐 Authenticated user:", data);
    return true;
  } catch (err) {
    console.error("Auth check failed:", err);
    return false;
  }
}
