import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/authSlice';
import {
  Zap,
  LayoutDashboard,
  Building2,
  ChartColumn,
  Upload,
  Users,
  TrendingUp,
  Handshake,
  MessageSquare,
  CircleUser,
  Inbox,
  Briefcase,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

const navGroups = [
  {
    id: 'account',
    label: 'Account',
    icon: Building2,
    children: [
      { to: '/accounts', label: 'Accounts', icon: Building2 },
      { to: '/account-report', label: 'Account Report', icon: ChartColumn },
      { to: '/account-upload', label: 'Account Upload', icon: Upload }
    ]
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Users,
    children: [
      { to: '/contacts', label: 'All Contacts', icon: Users }
    ]
  },
  {
    id: 'lead',
    label: 'Lead',
    icon: TrendingUp,
    children: [
      { to: '/leads', label: 'All Leads', icon: TrendingUp }
    ]
  },
  {
    id: 'deal',
    label: 'Deal',
    icon: Handshake,
    children: [
      { to: '/deals', label: 'All Deals', icon: Handshake }
    ]
  }
];

const secondaryLinks = [
  { to: '/profile', label: 'Profile', icon: CircleUser },
  { to: '/inbox', label: 'Inbox', icon: Inbox },
  { to: '/my-jobs', label: 'My Jobs', icon: Briefcase },
  { to: '/test-results', label: 'Test Results', icon: ClipboardList }
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);

  const initials = currentUser?.name
    ? currentUser.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'A';

  // Helper: check if a group has an active child
  const hasActiveChild = (group) =>
    group.children.some(
      (child) => location.pathname === child.to || location.pathname.startsWith(child.to + '/')
    );

  // Accordion state initialized based on active path
  const [openGroups, setOpenGroups] = useState(() => {
    const state = {};
    navGroups.forEach((group) => {
      state[group.id] = hasActiveChild(group);
    });
    // Default Account open if on accounts or dashboard
    if (state.account === undefined) state.account = true;
    return state;
  });

  // Keep accordion open if path changes to one of its children
  useEffect(() => {
    navGroups.forEach((group) => {
      if (hasActiveChild(group)) {
        setOpenGroups((prev) => ({ ...prev, [group.id]: true }));
      }
    });
  }, [location.pathname]);

  // Close mobile sidebar on route change
  useEffect(() => {
    onClose?.();
  }, [location.pathname]);

  const toggleGroup = (id) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const parentLinkClass = (isActive) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
    }`;

  const subLinkClass = (isActive) =>
    `flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Exact Sidebar Container: w-56, h-full */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-56 bg-white border-r border-gray-200 flex flex-col shadow-lg transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Main navigation"
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
              <Zap size={15} className="text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 leading-tight block">
                Actify
              </span>
              <span className="text-[9px] font-semibold text-blue-600 uppercase tracking-widest block">
                BUSINESS
              </span>
            </div>
          </NavLink>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5" role="navigation">
          {/* Dashboard */}
          <NavLink
            to="/"
            end
            className={({ isActive }) => parentLinkClass(isActive)}
          >
            {({ isActive }) => (
              <>
                <LayoutDashboard size={16} className={isActive ? 'text-white' : 'text-gray-500'} />
                <span>Dashboard</span>
              </>
            )}
          </NavLink>

          {/* Accordion Groups */}
          {navGroups.map((group) => {
            const isExpanded = !!openGroups[group.id];
            const isChildActive = hasActiveChild(group);
            const GroupIcon = group.icon;

            return (
              <div key={group.id}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isExpanded}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isChildActive ? 'text-gray-900 bg-gray-50' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <GroupIcon
                    size={16}
                    className={isChildActive ? 'text-gray-700' : 'text-gray-500'}
                  />
                  <span className="flex-1 text-left">{group.label}</span>
                  {isExpanded ? (
                    <ChevronDown size={14} className="text-gray-400" />
                  ) : (
                    <ChevronUp size={14} className="text-gray-400 rotate-180" />
                  )}
                </button>

                {/* Submenu with animated height */}
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-5 mt-0.5 pl-2 border-l-2 border-gray-100 space-y-0.5 py-0.5">
                    {group.children.map(({ to, label, icon: SubIcon }) => (
                      <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => subLinkClass(isActive)}
                      >
                        {({ isActive }) => (
                          <>
                            <SubIcon
                              size={13}
                              className={isActive ? 'text-white' : 'text-gray-400'}
                            />
                            <span>{label}</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Feedback */}
          <NavLink
            to="/feedback"
            className={({ isActive }) => parentLinkClass(isActive)}
          >
            {({ isActive }) => (
              <>
                <MessageSquare size={16} className={isActive ? 'text-white' : 'text-gray-500'} />
                <span>Feedback</span>
              </>
            )}
          </NavLink>

          {/* Divider */}
          <div className="my-2 border-t border-gray-100" />

          {/* Secondary Links */}
          {secondaryLinks.map(({ to, label, icon: SecIcon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => parentLinkClass(isActive)}
            >
              {({ isActive }) => (
                <>
                  <SecIcon size={16} className={isActive ? 'text-white' : 'text-gray-500'} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer User Card */}
        <div className="px-3 py-3 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2.5 p-2 rounded-md hover:bg-gray-50 transition-colors">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-xs">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-gray-800 truncate">
                {currentUser?.name || 'Actify'}
              </p>
              <p className="text-[10px] text-gray-400 truncate">
                {currentUser?.email || 'actify@example.io'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
