'use client';

import { MapPinIcon, ChevronDownIcon, BellIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-[--background-primary]/80 backdrop-blur-md border-b border-[--border-color]">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[--text-secondary]">Deliver to</p>
            <button className="flex items-center space-x-1 mt-0.5">
              <MapPinIcon className="w-4 h-4 text-[--primary-color]" />
              <span className="font-medium text-[--text-primary]">123 Main St</span>
              <ChevronDownIcon className="w-4 h-4 text-[--text-secondary]" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[--background-secondary]"
            >
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5 text-[--text-primary]" />
              ) : (
                <MoonIcon className="w-5 h-5 text-[--text-primary]" />
              )}
            </motion.button>
            
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[--background-secondary]"
            >
              <BellIcon className="w-6 h-6 text-[--text-primary]" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[--primary-color]" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
} 