// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Separator } from "@/components/ui/separator";

// // const cartItems = [
// //   { id: "1", name: "Luxury Watch", price: 199.99, qty: 1 },
// //   { id: "2", name: "Leather Bag", price: 89.99, qty: 2 },
// // ];

// // export default function OrderSummary() {
// //   const subtotal = cartItems.reduce(
// //     (sum, item) => sum + item.price * item.qty,
// //     0
// //   );
// //   const shipping = 10;
// //   const total = subtotal + shipping;

// //   return (
// //     <Card>
// //       <CardHeader>
// //         <CardTitle>Order Summary</CardTitle>
// //       </CardHeader>

// //       <CardContent className="space-y-4">
// //         {cartItems.map((item) => (
// //           <div key={item.id} className="flex justify-between text-sm">
// //             <span>
// //               {item.name} × {item.qty}
// //             </span>
// //             <span>${(item.price * item.qty).toFixed(2)}</span>
// //           </div>
// //         ))}

// //         <Separator />

// //         <div className="flex justify-between">
// //           <span>Subtotal</span>
// //           <span>${subtotal.toFixed(2)}</span>
// //         </div>

// //         <div className="flex justify-between">
// //           <span>Shipping</span>
// //           <span>${shipping.toFixed(2)}</span>
// //         </div>

// //         <Separator />

// //         <div className="flex justify-between font-semibold text-lg">
// //           <span>Total</span>
// //           <span>${total.toFixed(2)}</span>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }


// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { useCart } from "@/context/CartContext";

// export default function OrderSummary() {
//   const { cartItems } = useCart();

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.product.price * item.quantity,
//     0
//   );

//   const shipping = cartItems.length ? 10 : 0;
//   const total = subtotal + shipping;

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Order Summary</CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         {cartItems.map((item) => (
//           <div
//             key={item.product._id}
//             className="flex justify-between text-sm"
//           >
//             <span>
//               {item.product.name} × {item.quantity}
//             </span>
//             <span>
//               ₦{(item.product.price * item.quantity).toFixed(2)}
//             </span>
//           </div>
//         ))}

//         <Separator />

//         <div className="flex justify-between">
//           <span>Total</span>
//           <span className="font-semibold">
//             ₦{total.toFixed(2)}
//           </span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";

export default function OrderSummary() {
  const { cartItems } = useCart();

  const validItems = cartItems.filter(
    (item) => item.product && item.product.price
  );

  const subtotal = validItems.reduce(
    (sum, item) => sum + item.product!.price * item.quantity,
    0
  );

  const shipping = validItems.length ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {validItems.map((item) => (
          <div
            key={item.product!._id}
            className="flex justify-between text-sm"
          >
            <span>
              {item.product!.name} × {item.quantity}
            </span>
            <span>
              ₦{(item.product!.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <Separator />

        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-semibold">
            ₦{total.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
