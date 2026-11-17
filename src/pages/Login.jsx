import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { login, selectCurrentUser, SYSTEM_USERS } from '../redux/authSlice';
import { Zap, Shield, Briefcase, Lock, Mail, ArrowRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  // Active Role Tab: 'admin' or 'sales_exec'
  const [activeRoleTab, setActiveRoleTab] = useState('admin');

  // If sales_exec, which executive: 'usr-se1' or 'usr-se2'
  const [selectedExecutiveId, setSelectedExecutiveId] = useState('usr-se1');

  const adminUser = SYSTEM_USERS.find((u) => u.role === 'admin');
  const se1User = SYSTEM_USERS.find((u) => u.id === 'usr-se1');
  const se2User = SYSTEM_USERS.find((u) => u.id === 'usr-se2');

  const activeUser =
    activeRoleTab === 'admin'
      ? adminUser
      : selectedExecutiveId === 'usr-se1'
      ? se1User
      : se2User;

  // Demo Password state initialized with active user's unique password
  const [password, setPassword] = useState(activeUser?.password || 'admin@123');

  // Automatically update the password state when switching roles/users
  useEffect(() => {
    if (activeUser?.password) {
      setPassword(activeUser.password);
    }
  }, [activeUser]);

  // If already logged in, redirect to Dashboard
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activeUser) return;

    // Strict validation against the specific user's password
    if (password !== activeUser.password) {
      toast.error(`Invalid password for ${activeUser.label}! Expected: ${activeUser.password}`);
      return;
    }

    dispatch(login(activeUser));
    toast.success(`Welcome back, ${activeUser.name}!`);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center p-4">
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
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500 text-slate-900 font-bold mb-3 shadow-lg shadow-amber-400/20">
            <Zap size={26} className='text-white' />
          </div>
          <h1 className="text-2xl font-bold text-primary-500 tracking-tight">Actify Business</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* Role Tab Switcher */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-100/80 m-4 mb-2 rounded-xl border border-slate-200/60">
            <button
              type="button"
              onClick={() => setActiveRoleTab('admin')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeRoleTab === 'admin'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield size={14} className={activeRoleTab === 'admin' ? 'text-blue-600' : 'text-slate-400'} />
              <span>Admin</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveRoleTab('sales_exec')}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeRoleTab === 'sales_exec'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase size={14} className={activeRoleTab === 'sales_exec' ? 'text-blue-600' : 'text-slate-400'} />
              <span>Sales Executive</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 pt-3 space-y-4">
            {/* Sales Executive Sub-Selector (Executive 1 vs 2) */}
            {activeRoleTab === 'sales_exec' && (
              <div className="space-y-1.5 animate-fade-in">
                <label className="block text-xs font-semibold text-gray-700">
                  Select Executive Account
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedExecutiveId('usr-se1')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedExecutiveId === 'usr-se1'
                        ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <p className="text-xs font-bold text-gray-900">Executive 1</p>
                    <p className="text-[10px] text-gray-500">50 assigned accounts</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedExecutiveId('usr-se2')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      selectedExecutiveId === 'usr-se2'
                        ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <p className="text-xs font-bold text-gray-900">Executive 2</p>
                    <p className="text-[10px] text-gray-500">49 assigned accounts</p>
                  </button>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Corporate Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={15} />
                </div>
                <input
                  type="email"
                  value={activeUser?.email || ''}
                  readOnly
                  className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-not-allowed select-none focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={15} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Demo Password Helper Pill */}
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-blue-50/70 border border-blue-100 text-[11px] text-blue-800">
              <span className="font-medium">
                Password for {activeUser?.label}: <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 text-blue-700 font-mono font-semibold">{activeUser?.password}</code>
              </span>
              <span className="text-[10px] text-blue-600 font-medium">Pre-filled</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <span>Sign In as {activeUser?.label}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-gray-600 mt-6">
          Actify Zone Inc.
        </p>
      </div>
    </div>
  );
}
