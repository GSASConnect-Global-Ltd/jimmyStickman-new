// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { startCheckout } from "@/lib/api/checkout";
// import { useCheckoutStore } from "@/store/useCheckoutStore";
// import { useRouter } from "next/navigation";

// interface AuthUser {
//   _id: string;
//   name: string;
//   email: string;
// }

// interface CheckoutFormProps {
//   user: AuthUser | null;
// }

// export default function CheckoutForm({ user }: CheckoutFormProps) {
//   const router = useRouter();
//   const setCheckout = useCheckoutStore((s) => s.setCheckout);

//   if (!user) return null;

//   const names = user.name.split(" ");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const cartItems = [
//         {
//           productId: "1",
//           name: "Luxury Watch",
//           price: 199.99,
//           quantity: 1,
//         },
//         {
//           productId: "2",
//           name: "Leather Bag",
//           price: 89.99,
//           quantity: 2,
//         },
//       ];

//       const response = await startCheckout({
//         userId: user._id,
//         email: user.email,
//         items: cartItems,
//       });

//       // ✅ Save checkout data to Zustand
//       setCheckout({
//         orderId: response.orderId,
//         amount: response.amount,
//         bankDetails: response.bankDetails,
//       });

//       // ✅ Redirect to waiting screen
//       router.push("/checkout/waiting");
//     } catch (error: any) {
//       console.error("Checkout error:", error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Shipping Information</CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label>First Name</Label>
//               <Input defaultValue={names[0] || ""} required />
//             </div>

//             <div>
//               <Label>Last Name</Label>
//               <Input defaultValue={names.slice(1).join(" ")} required />
//             </div>
//           </div>

//           <div>
//             <Label>Email</Label>
//             <Input type="email" defaultValue={user.email} required />
//           </div>

//           <div>
//             <Label>Address</Label>
//             <Input required />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label>City</Label>
//               <Input required />
//             </div>
//             <div>
//               <Label>Postal Code</Label>
//               <Input required />
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Button type="submit" className="w-full">
//         Place Order
//       </Button>
//     </form>
//   );
// }





"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { startCheckout } from "@/lib/api/checkout";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ user }: { user: any }) {
  const router = useRouter();
  const { cartItems } = useCart();
  const setCheckout = useCheckoutStore((s) => s.setCheckout);

  if (!user || cartItems.length === 0) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const items = cartItems.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    try {
      const response = await startCheckout({
        userId: user._id,
        email: user.email,
        items,
      });

      setCheckout({
        orderId: response.orderId,
        amount: response.amount,
        bankDetails: response.bankDetails,
      });

      // router.push("/checkout/waiting");
      if (response.devMode) {
  router.push("/checkout/success");
} else {
  router.push("/checkout/waiting");
}
    } catch (error) {
      console.error("Checkout failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input defaultValue={user.email} disabled />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Place Order
      </Button>
    </form>
  );
}
