'use client';

import { useState } from 'react';
import { MinusIcon, PlusIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';

const initialCartItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    price: 12.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    options: ['Extra Cheese', 'Thin Crust'],
  },
  {
    id: 2,
    name: 'Classic Burger',
    price: 9.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    options: ['No Onions', 'Extra Sauce'],
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 py-3 flex items-center">
          <Link href="/main" className="mr-4">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Your Cart</h1>
        </div>
      </header>

      <div className="flex-1 p-4">
        <AnimatePresence mode="popLayout">
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link href="/main">
                <button className="btn btn-primary">
                  Browse Menu
                </button>
              </Link>
            </motion.div>
          ) : (
            <motion.div layout className="space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-2xl p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <OptimizedImage
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="w-full h-full"
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <p className="text-[--primary-color] font-semibold mt-1">
                        ${item.price}
                      </p>
                      {item.options && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item.options.join(' • ')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </motion.button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, -item.quantity)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {cartItems.length > 0 && (
        <motion.div
          layout
          className="border-t bg-white p-4 space-y-4"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <motion.button
            className="btn btn-primary w-full"
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCheckingOut(true)}
          >
            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
} 