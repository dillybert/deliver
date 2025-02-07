'use client';

import { motion } from 'framer-motion';
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const orders = [
  {
    id: 1,
    date: '2024-02-06',
    time: '19:30',
    status: 'delivered',
    items: [
      { name: 'Margherita Pizza', quantity: 1 },
      { name: 'Classic Burger', quantity: 2 },
    ],
    total: 32.97,
  },
  {
    id: 2,
    date: '2024-02-06',
    time: '20:15',
    status: 'in-transit',
    items: [
      { name: 'California Roll', quantity: 1 },
      { name: 'Pasta Carbonara', quantity: 1 },
    ],
    total: 27.98,
  },
  {
    id: 3,
    date: '2024-02-06',
    time: '20:45',
    status: 'preparing',
    items: [
      { name: 'Greek Salad', quantity: 1 },
      { name: 'Tiramisu', quantity: 1 },
    ],
    total: 19.98,
  },
];

const statusConfig = {
  'delivered': {
    icon: CheckCircleIcon,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    label: 'Delivered',
  },
  'in-transit': {
    icon: TruckIcon,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    label: 'On the way',
  },
  'preparing': {
    icon: ClockIcon,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    label: 'Preparing',
  },
};

export default function OrdersPage() {
  return (
    <div className="p-4">
          <Link href="/main" className="mr-4">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      
      <div className="space-y-4">
        {orders.map((order, index) => {
          const status = statusConfig[order.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {order.date} at {order.time}
                  </p>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${status.bgColor}`}>
                  <StatusIcon className={`w-4 h-4 ${status.color}`} />
                  <span className={`text-sm font-medium ${status.color}`}>
                    {status.label}
                  </span>
                </div>
              </div>

              <div className="border-t border-b py-3 space-y-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="text-gray-500">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Amount</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>

              <button className="w-full btn bg-gray-100 text-gray-700 hover:bg-gray-200">
                View Details
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 