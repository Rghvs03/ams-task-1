import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectScopedLeads } from '../redux/crmSlice';
import { selectCurrentUser } from '../redux/authSlice';
import { Search, X, TrendingUp, Building2, User, SearchX, ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 10;

const STAGE_STYLES = {
  'New': 'bg-blue-50 text-blue-700 border-blue-200',
  'Contacted': 'bg-sky-50 text-sky-700 border-sky-200',
  'Qualified': 'bg-amber-50 text-amber-700 border-amber-200',
  'Proposal Sent': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Negotiation': 'bg-orange-50 text-orange-700 border-orange-200',
  'Closed Won': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function Leads() {
  const leads = useSelector(selectScopedLeads);
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = !currentUser || currentUser.role === 'admin';

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpPageInput, setJumpPageInput] = useState('');

  // Filter leads in real-time
  const filteredLeads = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [l.leadTitle, l.accountName, l.contactName, l.value, l.stage, l.source].some(
        (val) => (val || '').toLowerCase().includes(q)
      )
    );
  }, [leads, searchTerm]);

  // Pagination calculations
  const totalCount = filteredLeads.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedLeads = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredLeads.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredLeads, safeCurrentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageJump = (e) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setJumpPageInput('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header / View Tab */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0">
          <button
            type="button"
            className="px-4 py-1.5 text-xs font-semibold rounded bg-gray-800 text-white border border-gray-800"
          >
            Leads Pipeline
          </button>
        </div>

        {/* Total Leads Counter */}
        <span className="text-xs text-gray-500 font-medium">
          Total: <strong className="text-gray-900">{leads.length}</strong> Leads
        </span>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
        {/* Search Toolbar */}
        <div className="p-3.5 border-b border-gray-200 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search leads by title, company, stage…"
              className="w-full pl-9 pr-8 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50/50 hover:bg-white"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                  Lead Opportunity
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                  Associated Account
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                  Key Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                  Estimated Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                  Pipeline Stage
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {paginatedLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <SearchX size={32} className="mb-2 text-gray-300" />
                      <p className="text-sm font-semibold text-gray-700">No leads found</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {searchTerm
                          ? `No leads match "${searchTerm}".`
                          : 'No active leads linked to your accounts.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedLeads.map((lead) => {
                  const stageStyle = STAGE_STYLES[lead.stage] || 'bg-gray-100 text-gray-700 border-gray-200';
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* Lead Title */}
                      <td className="px-4 py-3 text-xs text-gray-900 font-semibold whitespace-nowrap">
                        {lead.leadTitle}
                      </td>

                      {/* Associated Account */}
                      <td className="px-4 py-3 text-xs whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-gray-800 font-medium">
                          <Building2 size={13} className="text-gray-400" />
                          {lead.accountName}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5">
                          <User size={12} className="text-gray-400" />
                          {lead.contactName}
                        </span>
                      </td>

                      {/* Deal Value */}
                      <td className="px-4 py-3 text-xs font-bold text-gray-900 whitespace-nowrap">
                        {lead.value}
                      </td>

                      {/* Pipeline Stage Badge */}
                      <td className="px-4 py-3 text-xs whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${stageStyle}`}>
                          {lead.stage}
                        </span>
                      </td>

                      {/* Source */}
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {lead.source}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                        {lead.createdAt}
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
      </div>
    </div>
  );
}
