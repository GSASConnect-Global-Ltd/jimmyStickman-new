"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import Footer from "@/components/footer/Footer";

export default function LayoutWrapper({
  children,
}: { //error: Type annotations can only be used in TypeScript files.ts(8010)
  children: React.ReactNode;//error: Type annotations can only be used in TypeScript files.ts(8010) (property) children: ReactNode
}) { //error: Type annotations can only be used in TypeScript files.ts(8010)
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
