export function getWishlistId() {
  if (typeof window === "undefined") return "";

  let wishlistId = localStorage.getItem("wishlistId");

  if (!wishlistId) {
    wishlistId = crypto.randomUUID();
    localStorage.setItem("wishlistId", wishlistId);
  }

  return wishlistId;
}
