import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';

const titleMap = {
  '/': 'Dashboard',
  '/accounts': 'Accounts',
  '/account-report': 'Account Report',
  '/account-upload': 'Account Upload',
  '/profile': 'Profile',
  '/inbox': 'Inbox',
  '/my-jobs': 'My Jobs',
  '/test-results': 'Test Results',
  '/contacts': 'Contact',
  '/leads': 'Lead',
  '/deals': 'Deal',
  '/feedback': 'Feedback',
  '/reports': 'Account Reports',
  '/settings': 'Settings'
};

export default function Header({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const pageTitle = titleMap[location.pathname] ?? 'Actify Business';

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center gap-4 shadow-sm flex-shrink-0">
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Open navigation menu"
        id="mobile-menu-button"
      >
        <Menu size={20} />
      </button>

      {/* Breadcrumb Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
          {pageTitle}
        </h1>
        <p className="text-[11px] text-gray-400 leading-tight hidden sm:block">
          Actify Business › {pageTitle}
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true" />
        </button>

        {/* User Pill with Dropdown */}
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold cursor-pointer select-none">
              A
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">
              Actify
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
