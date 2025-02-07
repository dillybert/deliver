'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import OptimizedImage from '../ui/OptimizedImage';
import FoodDetailsModal from './FoodDetailsModal';

interface FoodCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  prepTime?: string;
}

export default function FoodCard(props: FoodCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { name, description, price, image, rating = 4.5, prepTime = '20-30 min' } = props;

  return (
    <>
      <motion.div
        layout
        className="card relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
      >
        <motion.div 
          className="absolute top-2 right-2 z-10"
          whileTap={{ scale: 0.8 }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md"
          >
            <AnimatePresence mode="wait">
              {isLiked ? (
                <motion.div
                  key="filled"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <HeartSolid className="w-5 h-5 text-red-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="outline"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <HeartOutline className="w-5 h-5 text-gray-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        <motion.div
          className="relative h-36 -mx-4 -mt-4 mb-2 rounded-t-2xl overflow-hidden cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <OptimizedImage
            src={image}
            alt={name}
            width={400}
            height={300}
            className="absolute inset-0 w-full h-full"
            onHover={isHovered}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-2 left-2 flex items-center space-x-2">
            <div className="px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium">
              ⭐️ {rating}
            </div>
            <div className="px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium">
              🕒 {prepTime}
            </div>
          </div>
        </motion.div>

        <div 
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <h3 className="font-semibold text-sm">{name}</h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-[--primary-color]">
            ${price}
          </span>
          <motion.button 
            className="btn btn-primary py-1.5 px-3 text-sm"
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            Add
          </motion.button>
        </div>
      </motion.div>

      <FoodDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        food={props}
      />
    </>
  );
} 