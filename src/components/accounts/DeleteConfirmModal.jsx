import React from 'react';
import { TriangleAlert, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, accountName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
              <TriangleAlert size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Delete Account</h3>
              <p className="text-xs text-gray-500">This action cannot be undone.</p>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            Are you sure you want to delete{' '}
            <strong className="text-gray-900 font-semibold">{accountName}</strong>? This record will
            be permanently removed from your account list.
          </p>

          <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

