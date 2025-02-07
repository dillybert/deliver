'use client';

import {
  UserIcon,
  MapPinIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
  {
    icon: MapPinIcon,
    label: 'Delivery Addresses',
    description: 'Manage your delivery locations',
  },
  {
    icon: CreditCardIcon,
    label: 'Payment Methods',
    description: 'Manage your payment options',
  },
  {
    icon: BellIcon,
    label: 'Notifications',
    description: 'Manage your notifications',
  },
  {
    icon: ShieldCheckIcon,
    label: 'Privacy & Security',
    description: 'Manage your privacy settings',
  },
  {
    icon: QuestionMarkCircleIcon,
    label: 'Help & Support',
    description: 'Get help with your orders',
  },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white p-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <UserIcon className="w-10 h-10 text-gray-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">John Doe</h1>
            <p className="text-gray-500 text-sm">+1 234 567 8900</p>
            <p className="text-gray-500 text-sm">john.doe@example.com</p>
          </div>
        </div>
        <button className="btn btn-primary w-full mt-6">
          Edit Profile
        </button>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="w-full bg-white p-4 rounded-2xl flex items-center space-x-4 active:scale-98 transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <ArrowRightIcon className="w-5 h-5 text-gray-400" />
            </button>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button className="btn w-full bg-red-50 text-red-500 hover:bg-red-100">
          Log Out
        </button>
      </div>
    </div>
  );
} 