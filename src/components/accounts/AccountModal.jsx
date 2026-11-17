import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addAccount, updateAccount } from '../../redux/accountSlice';
import { selectCurrentUser } from '../../redux/authSlice';
import toast from 'react-hot-toast';
import { X, Lock } from 'lucide-react';

const INDUSTRIES = [
  'Information Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Manufacturing',
  'Education',
  'Real Estate',
  'Logistics',
  'Telecommunications',
  'Hospitality',
];

const SALES_EXECUTIVES = ['Sales Executive 1', 'Sales Executive 2'];

export default function AccountModal({ isOpen, onClose, accountToEdit }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = !currentUser || currentUser.role === 'admin';
  const isEditing = Boolean(accountToEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      accountName: '',
      email: '',
      phone: '',
      website: '',
      industry: '',
      status: 'Active',
      assignedTo: 'Sales Executive 1',
      remark: '',
    },
  });

  // Whenever the modal opens or the account to edit changes, reset the form values
  useEffect(() => {
    if (accountToEdit) {
      reset({
        accountName: accountToEdit.accountName || '',
        email: accountToEdit.email || '',
        phone: accountToEdit.phone || '',
        website: accountToEdit.website || '',
        industry: accountToEdit.industry || '',
        status: accountToEdit.status || 'Active',
        assignedTo: accountToEdit.assignedTo || 'Sales Executive 1',
        remark: accountToEdit.remark || '',
      });
    } else {
      reset({
        accountName: '',
        email: '',
        phone: '',
        website: '',
        industry: '',
        status: 'Active',
        assignedTo: 'Sales Executive 1',
        remark: '',
      });
    }
  }, [accountToEdit, reset, isOpen]);

  if (!isOpen) return null;

  const onSubmit = (formData) => {
    // Format optional website with https:// if omitted by user
    let formattedWebsite = formData.website?.trim() || '';
    if (formattedWebsite && !/^https?:\/\//i.test(formattedWebsite)) {
      formattedWebsite = `https://${formattedWebsite}`;
    }

    const payload = {
      accountName: formData.accountName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      website: formattedWebsite,
      industry: formData.industry,
      status: formData.status,
      assignedTo: formData.assignedTo || 'Sales Executive 1',
      remark: formData.remark?.trim() || '',
    };

    if (isEditing) {
      dispatch(updateAccount({ ...payload, id: accountToEdit.id }));
      toast.success('Account updated successfully!');
    } else {
      dispatch(
        addAccount({
          ...payload,
          id: `acc-${Date.now()}`,
          createdAt: new Date().toISOString(),
        })
      );
      toast.success('Account created successfully!');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              {isEditing ? 'Edit Account' : 'Add New Account'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isEditing
                ? `Editing: ${accountToEdit.accountName}`
                : 'Fill in the details to create a new account record.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Row 1: Account Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="accountName" className="block text-xs font-semibold text-gray-700 mb-1">
                Account Name <span className="text-red-500">*</span>
              </label>
              <input
                id="accountName"
                type="text"
                placeholder="e.g. Astra Solutions"
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                  errors.accountName
                    ? 'border-red-400 focus:ring-red-400 bg-red-50/20'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                }`}
                {...register('accountName', {
                  required: 'Account name is required',
                  minLength: { value: 2, message: 'Minimum 2 characters' },
                  maxLength: { value: 100, message: 'Maximum 100 characters' },
                })}
              />
              {errors.accountName && (
                <p className="text-[11px] text-red-500 mt-1">{errors.accountName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="contact@company.example.com"
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                  errors.email
                    ? 'border-red-400 focus:ring-red-400 bg-red-50/20'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                }`}
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Row 2: Phone Number & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="text"
                placeholder="+91-9876543210"
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                  errors.phone
                    ? 'border-red-400 focus:ring-red-400 bg-red-50/20'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                }`}
                {...register('phone', {
                  required: 'Phone number is required',
                  minLength: { value: 7, message: 'Please enter a valid phone number' },
                })}
              />
              {errors.phone && (
                <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="website" className="block text-xs font-semibold text-gray-700 mb-1">
                Website
              </label>
              <input
                id="website"
                type="text"
                placeholder="https://company.example.com"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                {...register('website')}
              />
            </div>
          </div>

          {/* Row 3: Industry & Account Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="industry" className="block text-xs font-semibold text-gray-700 mb-1">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                id="industry"
                className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 transition-colors bg-white cursor-pointer ${
                  errors.industry
                    ? 'border-red-400 focus:ring-red-400 bg-red-50/20'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                }`}
                {...register('industry', { required: 'Please select an industry' })}
              >
                <option value="">Select industry…</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
              {errors.industry && (
                <p className="text-[11px] text-red-500 mt-1">{errors.industry.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block text-xs font-semibold text-gray-700 mb-1">
                Account Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white cursor-pointer"
                {...register('status', { required: true })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Row 4: Assigned To (Sales Executive) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="assignedTo" className="block text-xs font-semibold text-gray-700">
                Assigned To (Sales Executive) <span className="text-red-500">*</span>
              </label>
              {!isAdmin && (
                <span className="inline-flex items-center gap-1 text-[10px] text-gray-400">
                  <Lock size={10} /> Locked (Admin managed)
                </span>
              )}
            </div>
            <select
              id="assignedTo"
              disabled={!isAdmin}
              className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none transition-colors ${
                !isAdmin
                  ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                  : 'bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer'
              }`}
              {...register('assignedTo', { required: 'Please select a sales executive' })}
            >
              {SALES_EXECUTIVES.map((exec) => (
                <option key={exec} value={exec}>
                  {exec}
                </option>
              ))}
            </select>
          </div>

          {/* Row 5: Remark */}
          <div>
            <label htmlFor="remark" className="block text-xs font-semibold text-gray-700 mb-1">
              Remark
            </label>
            <textarea
              id="remark"
              rows={3}
              placeholder="Add any internal remarks or notes..."
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
              {...register('remark')}
            />
          </div>

          {/* Form Actions Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
            >
              {isEditing ? 'Update Account' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

