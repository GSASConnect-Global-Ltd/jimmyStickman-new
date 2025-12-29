"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IProduct } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductDetailsProps {
  product: IProduct;
  onWishlistUpdate?: () => void; // callback to update wishlist count
}

export default function ProductDetails({ product, onWishlistUpdate }: ProductDetailsProps) {
  const { addItem } = useCart(); // ✅ use CartContext
  const [popup, setPopup] = useState<string | null>(null);
  const [color, setColor] = useState(product.colors?.[0]?.name || "");
  const [size, setSize] = useState(product.sizes?.[0] || "");
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [cartLoading, setCartLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);
      await addItem(product._id!, 1); // ✅ add 1 to cart
      alert("Added to cart!"); // optional feedback
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    setWishlistLoading(true);
    setWishlistMessage("");

    try {
      // Replace with your wishlist API call
      // await addToWishlist(product._id!, size, color);
      setWishlistMessage("Added to wishlist!");
      if (onWishlistUpdate) onWishlistUpdate();
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      setWishlistMessage("Failed to add to wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 space-y-6 p-4">
      <h1 className="text-4xl font-light">{product.name}</h1>
      <p className="text-xl">{`₦${product.price}`}</p>
      {product.offer && <p className="text-green-600">{product.offer}</p>}

      <Separator />

      {/* Colors */}
      <div>
        <p className="font-medium">
          Color: <span className="opacity-70">{color}</span>
        </p>
        <div className="flex gap-2 mt-2">
          {product.colors?.map((c) => (
            <button
              key={c.name}
              className={`w-8 h-8 rounded-full border ${color === c.name ? "border-black" : "border-gray-300"}`}
              style={{ backgroundColor: c.value }}
              onClick={() => setColor(c.name)}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <p className="font-medium">Size</p>
          <div className="grid grid-cols-4 gap-3 mt-2">
            {product.sizes.map((s) => (
              <Button
                key={s}
                variant={size === s ? "default" : "outline"}
                onClick={() => setSize(s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Add to Cart & Wishlist */}
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          className="w-full md:w-auto text-lg px-10 py-6"
          onClick={handleAddToCart}
          disabled={cartLoading}
        >
          {cartLoading ? "Adding..." : `Add to Cart • ₦${product.price}`}
        </Button>

        <Button
          className="w-full md:w-auto text-lg px-10 py-6"
          variant="outline"
          onClick={handleAddToWishlist}
          disabled={wishlistLoading}
        >
          {wishlistLoading ? "Adding..." : "Add to Wishlist"}
        </Button>
      </div>

      {wishlistMessage && <p className="text-sm text-blue-600">{wishlistMessage}</p>}

      <div className="space-y-4 pt-8">
        {["Product Detail", "Shipping", "Returns", "Reviews"].map((section) => (
          <p
            key={section}
            className="font-semibold cursor-pointer hover:underline"
            onClick={() => setPopup(section)}
          >
            {section}
          </p>
        ))}
      </div>

      <Dialog open={popup !== null} onOpenChange={() => setPopup(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{popup}</DialogTitle>
          </DialogHeader>
          <p>This is the {popup} content...</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
