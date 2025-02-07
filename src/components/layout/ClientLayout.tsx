'use client';

import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import BottomNav from "./BottomNav";
import FloatingCart from "../cart/FloatingCart";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <CartProvider>
        <main className="max-w-md mx-auto bg-[--background-primary] min-h-screen shadow-lg pb-16">
          {children}
          <FloatingCart />
          <BottomNav />
        </main>
      </CartProvider>
    </ThemeProvider>
  );
} 