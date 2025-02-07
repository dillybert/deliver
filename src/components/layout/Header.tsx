'use client';

import { MapPinIcon, ChevronDownIcon, BellIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Deliver to</p>
            <button className="flex items-center space-x-1 mt-0.5">
              <MapPinIcon className="w-4 h-4 text-[--primary-color]" />
              <span className="font-medium">123 Main St</span>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-50"
          >
            <BellIcon className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[--primary-color]" />
          </motion.button>
        </div>
      </div>
    </header>
  );
} 