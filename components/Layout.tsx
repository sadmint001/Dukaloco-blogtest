
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ICONS } from '../constants';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.Dashboard },
    { id: 'posts', label: 'Content Feed', icon: ICONS.Posts },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
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
              onClick={() => onTabChange(item.id)}
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
            {ICONS.Logout}
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 animate-float"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] -z-10"></div>

        <header className="h-20 flex items-center justify-between px-8 md:px-12">
          <div className="md:hidden flex items-center gap-3">
             <Logo className="w-8 h-8" />
             <h1 className="text-lg font-bold">Dukaloco</h1>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-indigo-400 cursor-pointer transition-colors">
              {ICONS.Settings}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 md:px-12 pb-12">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
