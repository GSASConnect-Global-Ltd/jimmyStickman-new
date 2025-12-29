"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import Footer from "@/components/footer/Footer";

export default function LayoutWrapper({
  children,
}: { 
  children: React.ReactNode;
}) { 
  const pathname = usePathname();

  const excludedRoutes = ["/login", "/signup", "/verify"];
  const hideLayout = excludedRoutes.includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="relative">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
