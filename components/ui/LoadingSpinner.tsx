
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-32 gap-6">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Updating local cache...</p>
  </div>
);

export default LoadingSpinner;
