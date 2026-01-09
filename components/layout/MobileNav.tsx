
import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { LayoutDashboard, FileText } from 'lucide-react';

const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useUIStore();

  const items = [
    { id: 'dashboard', label: 'Hub', icon: <LayoutDashboard className="w-6 h-6" /> },
    { id: 'posts', label: 'Feed', icon: <FileText className="w-6 h-6" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[400px]">
      <div className="glass-card rounded-[32px] p-2 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10 ring-1 ring-white/5">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-3 px-8 rounded-[24px] transition-all duration-500 relative ${
                isActive ? 'text-indigo-400' : 'text-slate-500'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-indigo-500/10 rounded-[24px] animate-in fade-in zoom-in duration-300"></div>
              )}
              <div className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-1' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1 relative z-10">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
