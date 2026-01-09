
import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { LayoutDashboard, FileText } from 'lucide-react';

const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useUIStore();

  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-6 h-6" /> },
    { id: 'posts', label: 'Articles', icon: <FileText className="w-6 h-6" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
      <div className="glass-card rounded-[28px] p-1.5 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/10 ring-1 ring-white/5 max-w-md mx-auto">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-2.5 px-6 rounded-[22px] transition-all duration-500 relative flex-1 ${
                isActive ? 'text-indigo-400' : 'text-slate-500'
              }`}
            >
              <div className={`relative z-10 transition-transform duration-500 ${isActive ? 'scale-110 -translate-y-0.5' : 'scale-100'}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.15em] mt-1 relative z-10 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_#6366f1]"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
