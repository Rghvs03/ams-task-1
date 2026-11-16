import React from 'react';
import { Clock } from 'lucide-react';

export default function Placeholder({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
        <Clock size={32} />
      </div>
      <h1 className="text-lg font-bold text-gray-800">{title || 'Module'}</h1>
      <p className="text-xs text-gray-400 mt-1 max-w-sm">
        {description || 'This module is coming soon. The Accounts and Dashboard sections are the primary functional modules for this assessment.'}
      </p>
    </div>
  );
}

