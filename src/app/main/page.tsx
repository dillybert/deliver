'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import Header from '@/components/layout/Header';
import FoodCard from '@/components/food/FoodCard';
import OptimizedImage from '@/components/ui/OptimizedImage';

const categories = [
  { id: 'all', name: 'All', emoji: '🍽️' },
  { id: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'burger', name: 'Burger', emoji: '🍔' },
  { id: 'sushi', name: 'Sushi', emoji: '🍱' },
  { id: 'salad', name: 'Salad', emoji: '🥗' },
  { id: 'pasta', name: 'Pasta', emoji: '🍝' },
  { id: 'dessert', name: 'Dessert', emoji: '🍰' },
];

const foodItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and our special sauce',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'pizza',
    rating: 4.8,
    prepTime: '20-25 min',
  },
  {
    id: 2,
    name: 'Classic Burger',
    description: 'Angus beef patty, lettuce, tomato, cheese, and special sauce',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'burger',
    rating: 4.5,
    prepTime: '15-20 min',
  },
  {
    id: 3,
    name: 'Dragon Roll',
    description: 'Fresh eel, cucumber, avocado topped with tobiko',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'sushi',
    rating: 4.9,
    prepTime: '25-30 min',
  },
  {
    id: 4,
    name: 'Greek Salad',
    description: 'Fresh cucumbers, tomatoes, olives, feta cheese with olive oil',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'salad',
    rating: 4.3,
    prepTime: '10-15 min',
  },
];

const specialOffers = [
  {
    id: 1,
    title: 'Free Delivery',
    description: 'On orders above $20',
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: '20% OFF',
    description: 'On your first order',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    color: 'bg-purple-500',
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(foodItems);

  useEffect(() => {
    const filtered = foodItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredItems(filtered);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pb-4">
      <Header />
      
      <div className="px-4">
        {/* Search Bar */}
        <div className="relative mt-4 mb-6">
          <input
            type="text"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-12 pr-12"
          />
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Special Offers */}
        <div className="mb-6 overflow-x-auto flex gap-4 -mx-4 px-4 scrollbar-hide">
          {specialOffers.map((offer) => (
            <motion.div
              key={offer.id}
              className={`flex-shrink-0 w-60 h-32 rounded-2xl overflow-hidden relative ${offer.color}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <OptimizedImage
                src={offer.image}
                alt={offer.title}
                width={400}
                height={200}
                className="absolute inset-0 w-full h-full mix-blend-overlay opacity-50"
              />
              <div className="relative p-4 text-white">
                <h3 className="text-2xl font-bold">{offer.title}</h3>
                <p className="mt-1 text-sm text-white/90">{offer.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Categories */}
        <div className="mb-6 overflow-x-auto flex gap-3 -mx-4 px-4 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`btn ${
                selectedCategory === category.id
                  ? 'btn-primary'
                  : 'bg-gray-100 text-gray-700'
              } whitespace-nowrap min-w-20`}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-1">{category.emoji}</span>
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Food Items */}
        <motion.div layout className="grid grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} {...item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 