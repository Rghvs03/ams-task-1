import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/authSlice';
import AccountsTable from '../components/accounts/AccountsTable';
import AccountModal from '../components/accounts/AccountModal';
import { Pencil } from 'lucide-react';

export default function Accounts() {
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'create'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);

  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = !currentUser || currentUser.role === 'admin';

  // Triggered when user clicks "+ Create" or wants to add a new account
  const handleAddNew = () => {
    setAccountToEdit(null);
    setIsModalOpen(true);
    setActiveTab('create');
  };

  // Triggered when user clicks "Edit" on a table row
  const handleEdit = (account) => {
    setAccountToEdit(account);
    setIsModalOpen(true);
  };

  // Close modal and reset active tab to 'list'
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAccountToEdit(null);
    setActiveTab('list');
  };

  return (
    <div className="space-y-0">
      {/* Top Segmented View Switcher Buttons */}
      <div className="flex items-center gap-0 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('list')}
          className={`px-4 py-1.5 text-xs font-semibold border transition-colors ${
            isAdmin ? 'rounded-l' : 'rounded'
          } ${
            activeTab === 'list'
              ? 'bg-gray-800 text-white border-gray-800'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
          }`}
        >
          Account
        </button>
        {isAdmin && (
          <button
            type="button"
            onClick={handleAddNew}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-r border-t border-b border-r transition-colors ${
              activeTab === 'create'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Pencil size={12} />
            <span>Create</span>
          </button>
        )}
      </div>

      {/* Main Account Lists White Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Card Header Title */}
        <div className="px-5 pt-4 pb-3 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 leading-tight">
            Account Lists
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Here’s a list of your accounts.
          </p>
        </div>

        {/* Interactive Accounts Table */}
        <AccountsTable onEditAccount={handleEdit} />
      </div>

      {/* Add / Edit Account Modal (Matching Image 2) */}
      <AccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        accountToEdit={accountToEdit}
      />
    </div>
  );
}
