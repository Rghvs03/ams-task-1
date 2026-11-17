import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/authSlice';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  // Protected Route: If no active session, redirect to Login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Toast Notifications - Styled for Actify Blue Theme & Centered */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '12.5px',
            fontWeight: '500',
            color: '#1e293b',
            background: '#ffffff',
            border: '1px solid #bfdbfe',
            boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.12), 0 8px 10px -6px rgba(37, 99, 235, 0.08)',
            borderRadius: '10px',
            padding: '10px 16px',
          },
          success: {
            iconTheme: {
              primary: '#2563eb',
              secondary: '#ffffff',
            },
            style: {
              border: '1px solid #93c5fd',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
            style: {
              border: '1px solid #fca5a5',
            },
          },
        }}
      />

      {/* Sidebar */}
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Container */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
