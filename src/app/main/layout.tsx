'use client';

import { CartProvider } from '@/context/CartContext';
import BottomNav from '@/components/layout/BottomNav';
import FloatingCart from '@/components/cart/FloatingCart';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="pb-16 relative">
        {children}
        <FloatingCart />
        <BottomNav />
      </div>
    </CartProvider>
  );
} 