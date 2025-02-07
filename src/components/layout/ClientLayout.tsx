'use client';

import { CartProvider } from "@/context/CartContext";
import BottomNav from "./BottomNav";
import FloatingCart from "../cart/FloatingCart";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <main className="max-w-md mx-auto bg-white min-h-screen shadow-lg pb-16">
        {children}
        <FloatingCart />
        <BottomNav />
      </main>
    </CartProvider>
  );
} 