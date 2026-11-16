import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllAccounts } from '../redux/accountSlice';
import {
  Building2,
  CircleCheck,
  CircleX,
  Activity,
  ArrowUpRight,
} from 'lucide-react';

export default function Dashboard() {
  const accounts = useSelector(selectAllAccounts);

  // Compute live KPI metrics dynamically from Redux store
  const totalAccounts = accounts.length;
  const activeCount = accounts.filter((acc) => acc.status === 'Active').length;
  const inactiveCount = accounts.filter((acc) => acc.status === 'Inactive').length;
  const activePercentage = totalAccounts > 0 ? Math.round((activeCount / totalAccounts) * 100) : 0;

  // Group accounts by industry & sort descending to find top 5 sectors
  const topIndustries = useMemo(() => {
    const counts = {};
    accounts.forEach((acc) => {
      const ind = acc.industry || 'Other';
      counts[ind] = (counts[ind] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([industry, count]) => ({
        industry,
        count,
        percentage: totalAccounts > 0 ? Math.round((count / totalAccounts) * 100) : 0,
      }));
  }, [accounts, totalAccounts]);

  // Unique industries count
  const totalIndustriesCount = useMemo(() => {
    const unique = new Set(accounts.map((a) => a.industry).filter(Boolean));
    return unique.size;
  }, [accounts]);

  // Top 5 most recent accounts
  const recentAccounts = useMemo(() => {
    return [...accounts].slice(0, 5);
  }, [accounts]);

  const kpiCards = [
    {
      label: 'Total Accounts',
      value: totalAccounts,
      icon: Building2,
      bgColor: 'bg-blue-600',
      subtitle: 'All records',
    },
    {
      label: 'Active',
      value: activeCount,
      icon: CircleCheck,
      bgColor: 'bg-emerald-500',
      subtitle: `${activePercentage}% of total`,
    },
    {
      label: 'Inactive',
      value: inactiveCount,
      icon: CircleX,
      bgColor: 'bg-gray-400',
      subtitle: 'Needs re-engagement',
    },
    {
      label: 'Industries',
      value: totalIndustriesCount,
      icon: Activity,
      bgColor: 'bg-violet-500',
      subtitle: 'Sectors covered',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Welcome back! Here's your business overview.
          </p>
        </div>

        <Link
          to="/accounts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors self-start sm:self-auto"
        >
          <span>View Accounts</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* 4 KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    {card.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{card.subtitle}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${card.bgColor} shadow-sm flex-shrink-0`}
                >
                  <IconComponent size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-Column Analytics Grid: Recent Accounts & Top Industries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Recent Accounts Feed */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-800">Recent Accounts</h2>
            <Link
              to="/accounts"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-gray-50 flex-1">
            {recentAccounts.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs">
                No recent accounts available.
              </div>
            ) : (
              recentAccounts.map((account) => {
                const initial = account.accountName?.charAt(0)?.toUpperCase() || 'A';
                return (
                  <div
                    key={account.id}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/70 transition-colors"
                  >
                    {/* Letter Avatar Box */}
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-blue-100">
                      {initial}
                    </div>

                    {/* Account Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">
                        {account.accountName}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">{account.email}</p>
                    </div>

                    {/* Status Pill Badge */}
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        account.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {account.status}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Card 2: Top Industries Distribution with Progress Bars */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-800">Top Industries</h2>
          </div>

          <div className="p-5 space-y-4 flex-1">
            {topIndustries.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs">
                No industry data available.
              </div>
            ) : (
              topIndustries.map((item) => (
                <div key={item.industry} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-700">{item.industry}</span>
                    <span className="font-semibold text-gray-900">
                      {item.count}{' '}
                      <span className="text-gray-400 font-normal">
                        ({item.percentage}%)
                      </span>
                    </span>
                  </div>
                  {/* Progress Bar Track & Fill */}
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${Math.min(100, Math.max(5, item.percentage))}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
