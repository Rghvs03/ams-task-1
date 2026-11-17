import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logout } from '../../redux/authSlice';
import { Menu, Bell, LogOut, Shield, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const pageTitle = titleMap[location.pathname] ?? 'Actify Business';

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    toast.success('Signed out successfully.');
    navigate('/login');
  };

  // Avatar initials
  const initials = currentUser?.name
    ? currentUser.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'A';

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
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold select-none shadow-xs ${
              currentUser?.role === 'admin' 
                ? 'bg-gradient-to-br from-slate-700 to-slate-900' 
                : currentUser?.label?.includes('1')
                ? 'bg-gradient-to-br from-blue-600 to-blue-800'
                : 'bg-gradient-to-br from-purple-600 to-purple-800'
            }`}>
              {initials}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-gray-800 leading-tight">
                {currentUser?.name || 'User'}
              </span>
              <span className="text-[10px] text-gray-400 leading-tight">
                {currentUser?.label || 'Account'}
              </span>
            </div>
          </button>

          {dropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />

              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-1.5 z-50 animate-fade-in divide-y divide-gray-100">
                {/* User Info Header */}
                <div className="px-4 py-2.5">
                  <p className="text-xs font-semibold text-gray-900">{currentUser?.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{currentUser?.email}</p>
                  <div className="mt-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      <Shield size={10} className="text-slate-500" />
                      {currentUser?.label}
                    </span>
                  </div>
                </div>

                {/* Profile Link */}
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <UserIcon size={14} className="text-gray-400" />
                    <span>View Profile</span>
                  </Link>
                </div>

                {/* Logout Button */}
                <div className="py-1">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut size={14} className="text-red-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
