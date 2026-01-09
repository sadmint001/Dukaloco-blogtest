
import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import Logo from '../ui/Logo';
import { LayoutDashboard, FileText, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { activeTab, setActiveTab } = useUIStore();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'posts', label: 'Content Feed', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-slate-900/50 border-r border-slate-800 hidden md:flex flex-col">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <Logo className="w-12 h-12" />
          <span className="text-xl font-extrabold tracking-tighter">Dukaloco</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-300 ${
              activeTab === item.id
                ? 'bg-indigo-600/10 text-indigo-400 ring-1 ring-indigo-500/30 shadow-[0_0_20px_rgba(79,70,229,0.1)]'
                : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800/50">
        <div className="flex items-center gap-4 px-4 py-4 glass-card-light rounded-[24px] mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate leading-tight">{user?.name}</p>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-0.5">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
