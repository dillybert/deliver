'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FloatingCart() {
  const { state } = useCart();
  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  if (itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40"
      >
        <Link href="/cart">
          <motion.button
            className="btn btn-primary shadow-lg shadow-primary/20 px-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBagIcon className="w-5 h-5 mr-2" />
            <span className="font-medium">{itemCount} items</span>
            <span className="ml-2 font-medium">${state.total.toFixed(2)}</span>
          </motion.button>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
} 