import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">Weapon Management System</h1>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <Bell className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            {/* Add notification badge if needed */}
          </div>
          <div className="ml-4">
            <span className="text-gray-700">{user?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
