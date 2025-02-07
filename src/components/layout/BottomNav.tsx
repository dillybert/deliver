'use client';

import { HomeIcon, ShoppingBagIcon, UserIcon, ClockIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, ShoppingBagIcon as ShoppingBagIconSolid, UserIcon as UserIconSolid, ClockIcon as ClockIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/main', label: 'Home', Icon: HomeIcon, ActiveIcon: HomeIconSolid },
  { href: '/orders', label: 'Orders', Icon: ClockIcon, ActiveIcon: ClockIconSolid },
  { href: '/cart', label: 'Cart', Icon: ShoppingBagIcon, ActiveIcon: ShoppingBagIconSolid },
  { href: '/profile', label: 'Profile', Icon: UserIcon, ActiveIcon: UserIconSolid },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Handle root path redirect to main
  const currentPath = pathname === '/' ? '/main' : pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe-area">
      <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
        {navItems.map(({ href, label, Icon, ActiveIcon }) => {
          const isActive = currentPath === href;
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center justify-center w-16 h-full"
            >
              {isActive && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 w-16 h-16 bg-primary/5 rounded-full -top-2"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {isActive ? (
                <ActiveIcon className="w-6 h-6 text-[--primary-color]" />
              ) : (
                <Icon className="w-6 h-6 text-gray-500" />
              )}
              <span className={`text-fluid-xs mt-1 ${isActive ? 'text-[--primary-color] font-medium' : 'text-gray-500'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 