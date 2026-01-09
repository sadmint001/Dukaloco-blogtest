import React from 'react';
import Logo from '../ui/Logo';
import { Settings, Menu } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const Header: React.FC = () => {
  const { toggleMobileMenu } = useUIStore();

  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-12 bg-slate-950/50 backdrop-blur-md sticky top-0 z-40 border-b border-white/5 md:border-none">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="md:hidden flex items-center gap-2">
           <Logo className="w-8 h-8" />
           <h1 className="text-lg font-bold text-white tracking-tight">Dukaloco</h1>
        </div>
      </div>
      
      <div className="flex-1"></div>
      
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-indigo-400 cursor-pointer transition-colors rounded-xl hover:bg-slate-800">
          <Settings className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;