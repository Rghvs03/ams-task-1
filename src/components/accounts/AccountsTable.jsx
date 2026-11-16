import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllAccounts, deleteAccount } from '../../redux/accountSlice';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
import {
  Search,
  X,
  FileSpreadsheet,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Ellipsis,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  SearchX,
} from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

const PAGE_SIZE = 10;

const TABLE_COLUMNS = [
  { key: 'accountName', label: 'Account Name', sortable: true, width: 'min-w-[175px]' },
  { key: 'email', label: 'Email', sortable: true, width: 'min-w-[210px]' },
  { key: 'phone', label: 'Phone No.', sortable: true, width: 'min-w-[140px]' },
  { key: 'website', label: 'Website', sortable: true, width: 'min-w-[190px]' },
  { key: 'industry', label: 'Industry', sortable: true, width: 'min-w-[165px]' },
  { key: 'status', label: 'Account Status', sortable: true, width: 'min-w-[130px]' },
  { key: 'remark', label: 'Remark', sortable: false, width: 'min-w-[190px]' },
];

export default function AccountsTable({ onEditAccount }) {
  const dispatch = useDispatch();
  const accounts = useSelector(selectAllAccounts);

  // Search & Filtering State
  const [searchTerm, setSearchTerm] = useState('');

  // Sorting State
  const [sortField, setSortField] = useState('accountName');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpPageInput, setJumpPageInput] = useState('');

  // Row Action Dropdown State
  const [activeDropdownRowId, setActiveDropdownRowId] = useState(null);

  // Delete Modal State
  const [accountToDelete, setAccountToDelete] = useState(null);

  // 1. Filter accounts based on real-time search term
  const filteredAccounts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return accounts;

    return accounts.filter((acc) => {
      const matchFields = [
        acc.accountName,
        acc.email,
        acc.phone,
        acc.website,
        acc.industry,
        acc.status,
        acc.remark,
      ];
      return matchFields.some((field) =>
        (field || '').toString().toLowerCase().includes(query)
      );
    });
  }, [accounts, searchTerm]);

  // 2. Sort filtered accounts
  const sortedAccounts = useMemo(() => {
    if (!sortField) return filteredAccounts;

    return [...filteredAccounts].sort((a, b) => {
      const valA = (a[sortField] || '').toString().toLowerCase();
      const valB = (b[sortField] || '').toString().toLowerCase();

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredAccounts, sortField, sortDirection]);

  // 3. Paginate sorted accounts
  const totalCount = sortedAccounts.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedAccounts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
    return sortedAccounts.slice(startIndex, startIndex + PAGE_SIZE);
  }, [sortedAccounts, safeCurrentPage]);

  // Handle column header click for sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle Excel Export using SheetJS
  const handleExportToExcel = () => {
    try {
      if (sortedAccounts.length === 0) {
        toast.error('No account records to export.');
        return;
      }

      // Map accounts to formatted columns for Excel
      const excelRows = sortedAccounts.map((acc) => ({
        'Account Name': acc.accountName,
        Email: acc.email,
        'Phone Number': acc.phone,
        Website: acc.website || '',
        Industry: acc.industry,
        'Account Status': acc.status,
        Remark: acc.remark || '',
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelRows);

      // Auto-fit column widths
      const columnKeys = Object.keys(excelRows[0]);
      worksheet['!cols'] = columnKeys.map((col) => ({
        wch: Math.max(
          col.length,
          ...excelRows.map((row) => String(row[col] || '').length)
        ) + 3,
      }));

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Accounts');

      const dateStr = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(workbook, `accounts_${dateStr}.xlsx`);

      toast.success(`Exported ${sortedAccounts.length} accounts to Excel!`);
    } catch (error) {
      console.error('Excel Export failed:', error);
      toast.error('Export failed. Please try again.');
    }
  };

  // Handle Delete Confirmation
  const confirmDelete = () => {
    if (!accountToDelete) return;
    dispatch(deleteAccount(accountToDelete.id));
    toast.success(`"${accountToDelete.accountName}" deleted.`);
    setAccountToDelete(null);

    // Adjust page if last item on page was deleted
    const remainingCount = sortedAccounts.length - 1;
    const newTotalPages = Math.max(1, Math.ceil(remainingCount / PAGE_SIZE));
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  };

  // Jump to specific page
  const handlePageJump = (e) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setJumpPageInput('');
    }
  };

  return (
    <div className="space-y-0">
      {/* Search Bar & Export Button Section */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 pt-3 pb-3 border-b border-gray-100 bg-white">
        {/* Search input with icon */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            id="global-search"
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Here..."
            className="w-full pl-8 pr-8 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 bg-white transition-colors"
            autoComplete="off"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setCurrentPage(1);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* View / Export to Excel Button (Matching green button in Image 1) */}
        <button
          type="button"
          onClick={handleExportToExcel}
          id="export-excel-button"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors shadow-sm self-start sm:self-auto"
          aria-label="Export to Excel"
          title="Export current view to Excel"
        >
          <FileSpreadsheet size={14} />
          <span>View</span>
        </button>
      </div>

      {/* Match Results Banner (When Search is Active) */}
      {searchTerm && (
        <div className="px-4 py-1.5 bg-blue-50 border-b border-blue-100 text-xs text-blue-700 font-medium">
          Found <strong>{totalCount}</strong> result{totalCount !== 1 ? 's' : ''} for “
          <strong>{searchTerm}</strong>”
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto scroll-smooth">
        <table className="min-w-[1300px] w-full divide-y divide-gray-100" role="grid" aria-label="Accounts table">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {TABLE_COLUMNS.map((col) => {
                const isActiveSort = sortField === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 tracking-wider whitespace-nowrap select-none ${col.width} ${
                      col.sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.label}</span>
                      {col.sortable && (
                        <span className="text-gray-400">
                          {isActiveSort ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp size={13} className="text-blue-600 font-bold" />
                            ) : (
                              <ChevronDown size={13} className="text-blue-600 font-bold" />
                            )
                          ) : (
                            <ChevronsUpDown size={12} className="opacity-60" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
              <th
                scope="col"
                className="px-4 py-3 text-center text-xs font-semibold text-gray-600 tracking-wider whitespace-nowrap uppercase min-w-[95px] w-[95px]"
              >
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {paginatedAccounts.length === 0 ? (
              <tr>
                <td colSpan={TABLE_COLUMNS.length + 1} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <SearchX size={36} className="mb-2 text-gray-300" />
                    <p className="text-sm font-semibold text-gray-700">No accounts found</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {searchTerm
                        ? `No records match your search query "${searchTerm}".`
                        : 'Your account list is currently empty.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedAccounts.map((account) => {
                const isDropdownOpen = activeDropdownRowId === account.id;

                return (
                  <tr key={account.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Account Name */}
                    <td className="px-4 py-3 text-xs text-gray-900 font-medium whitespace-nowrap min-w-[175px]">
                      {account.accountName}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap min-w-[210px]">
                      {account.email}
                    </td>

                    {/* Phone Number */}
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap min-w-[140px]">
                      {account.phone}
                    </td>

                    {/* Website */}
                    <td className="px-4 py-3 text-xs whitespace-nowrap min-w-[190px]">
                      {account.website ? (
                        <a
                          href={account.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {account.website.replace(/^https?:\/\//, '')}
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    {/* Industry */}
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap min-w-[165px]">
                      {account.industry}
                    </td>

                    {/* Account Status: EXACT display of true or false */}
                    <td className="px-4 py-3 text-xs whitespace-nowrap min-w-[130px]">
                      <span
                        className={
                          account.status === 'Active'
                            ? 'text-gray-800 font-medium'
                            : 'text-gray-400 font-medium'
                        }
                      >
                        {account.status === 'Active' ? 'true' : 'false'}
                      </span>
                    </td>

                    {/* Remark */}
                    <td className="px-4 py-3 text-xs text-gray-500 min-w-[190px] max-w-[240px]">
                      <span className="block truncate" title={account.remark}>
                        {account.remark || '—'}
                      </span>
                    </td>

                    {/* ACTIONS Column (Matching Image 1) */}
                    <td className="px-4 py-3 text-xs whitespace-nowrap relative text-center min-w-[95px] w-[95px]">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveDropdownRowId((prev) =>
                              prev === account.id ? null : account.id
                            )
                          }
                          className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                          aria-label="Actions menu"
                        >
                          <Ellipsis size={17} />
                        </button>

                        {/* Floating Action Dropdown Menu - Spacious & UX Friendly */}
                        {isDropdownOpen && (
                          <>
                            {/* Transparent click-away layer to close dropdown cleanly */}
                            <div
                              className="fixed inset-0 z-20"
                              onClick={() => setActiveDropdownRowId(null)}
                            />

                            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1.5 z-30 animate-fade-in">
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdownRowId(null);
                                  onEditAccount(account);
                                }}
                                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-left"
                              >
                                <Pencil size={15} className="text-gray-500" />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdownRowId(null);
                                  setAccountToDelete(account);
                                }}
                                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                              >
                                <Trash2 size={15} className="text-red-500" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 bg-white text-xs text-gray-600">
        <div>
          Showing{' '}
          <strong>
            {totalCount === 0 ? 0 : (safeCurrentPage - 1) * PAGE_SIZE + 1}
          </strong>{' '}
          to <strong>{Math.min(safeCurrentPage * PAGE_SIZE, totalCount)}</strong> of{' '}
          <strong>{totalCount}</strong> entries
        </div>

        <div className="flex items-center gap-3">
          {/* Page Jumper */}
          <form onSubmit={handlePageJump} className="flex items-center gap-1.5 text-xs">
            <span className="text-gray-400">Go to page:</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              placeholder={String(safeCurrentPage)}
              className="w-12 px-1.5 py-1 text-center border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="text-gray-400">of {totalPages}</span>
          </form>

          {/* Prev / Next Pagination Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safeCurrentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2 font-medium text-gray-800">
              {safeCurrentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={safeCurrentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(accountToDelete)}
        onClose={() => setAccountToDelete(null)}
        onConfirm={confirmDelete}
        accountName={accountToDelete?.accountName || ''}
      />
    </div>
  );
}

