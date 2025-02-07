'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import OptimizedImage from '../ui/OptimizedImage';
import { useCart } from '@/context/CartContext';

interface FoodDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  food: {
    id?: number;
    name: string;
    description: string;
    price: number;
    image: string;
    rating?: number;
    prepTime?: string;
    options?: {
      title: string;
      items: { id: string; name: string; price?: number }[];
    }[];
  };
}

const defaultOptions = [
  {
    title: 'Size',
    items: [
      { id: 'regular', name: 'Regular' },
      { id: 'large', name: 'Large', price: 2 },
      { id: 'extra-large', name: 'Extra Large', price: 4 },
    ],
  },
  {
    title: 'Extra Toppings',
    items: [
      { id: 'cheese', name: 'Extra Cheese', price: 1 },
      { id: 'mushrooms', name: 'Mushrooms', price: 1.5 },
      { id: 'olives', name: 'Olives', price: 1 },
    ],
  },
  {
    title: 'Special Instructions',
    items: [
      { id: 'spicy', name: 'Make it Spicy' },
      { id: 'well-done', name: 'Well Done' },
      { id: 'cut', name: 'Cut in Squares' },
    ],
  },
];

export default function FoodDetailsModal({ isOpen, onClose, food }: FoodDetailsModalProps) {
  const { dispatch } = useCart();
  const options = food.options || defaultOptions;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState('regular');

  const handleAddToCart = () => {
    const selectedExtras = options
      .flatMap(section => section.items)
      .filter(item => selectedOptions.includes(item.id));

    const extraCost = selectedExtras.reduce((total, item) => total + (item.price || 0), 0);
    const sizeOption = options[0].items.find(item => item.id === selectedSize);
    const sizeCost = sizeOption?.price || 0;

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: food.id || Math.random(),
        name: food.name,
        price: food.price + extraCost + sizeCost,
        quantity: 1,
        image: food.image,
        options: [
          `Size: ${sizeOption?.name || 'Regular'}`,
          ...selectedExtras.map(item => item.name),
        ],
      },
    });

    onClose();
  };

  const toggleOption = (id: string, section: string) => {
    if (section === 'Size') {
      setSelectedSize(id);
    } else {
      setSelectedOptions(prev =>
        prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <button
                  onClick={onClose}
                  className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>

                <div className="h-48 relative">
                  <OptimizedImage
                    src={food.image}
                    alt={food.name}
                    width={800}
                    height={400}
                    priority
                    className="h-full w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Dialog.Title className="text-fluid-xl font-bold">
                      {food.name}
                    </Dialog.Title>
                    <p className="text-fluid-sm text-white/90">{food.description}</p>
                  </div>
                </div>

                <div className="p-4 space-y-6">
                  {options.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-fluid-lg font-medium mb-3">{section.title}</h3>
                      <div className="space-y-2">
                        {section.items.map((item) => {
                          const isSelected = section.title === 'Size'
                            ? selectedSize === item.id
                            : selectedOptions.includes(item.id);

                          return (
                            <motion.button
                              key={item.id}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleOption(item.id, section.title)}
                              className={`w-full p-3 rounded-xl border flex items-center justify-between transition-colors ${
                                isSelected
                                  ? 'border-[--primary-color] bg-[--primary-color]/5'
                                  : 'border-gray-200 hover:border-[--primary-color] hover:bg-[--primary-color]/5'
                              }`}
                            >
                              <span className="text-fluid-base">{item.name}</span>
                              {item.price && (
                                <span className="text-fluid-sm text-gray-500">
                                  +${item.price.toFixed(2)}
                                </span>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn btn-primary text-fluid-base"
                      onClick={handleAddToCart}
                    >
                      Add to Cart - ${(
                        food.price +
                        (options[0].items.find(item => item.id === selectedSize)?.price || 0) +
                        selectedOptions.reduce((total, id) => {
                          const option = options.flatMap(s => s.items).find(item => item.id === id);
                          return total + (option?.price || 0);
                        }, 0)
                      ).toFixed(2)}
                    </motion.button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 