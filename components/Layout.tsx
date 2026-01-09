
import React from 'react';
import { useAuthStore } from '../store/authStore';
import Logo from './ui/Logo';
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { user, logout } = useAuthStore();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'posts', label: 'Content Feed', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
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
                activeTab === item.id ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-500'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6">
          <button onClick={logout} className="w-full flex items-center justify-center gap-3 p-3 text-slate-400 hover:text-red-400">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
};

export default Layout;
