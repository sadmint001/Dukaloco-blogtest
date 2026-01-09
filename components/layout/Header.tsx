
import React from 'react';
import Logo from '../ui/Logo';
import { Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-20 flex items-center justify-between px-8 md:px-12">
      <div className="md:hidden flex items-center gap-3">
         <Logo className="w-8 h-8" />
         <h1 className="text-lg font-bold">Dukaloco</h1>
      </div>
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-indigo-400 cursor-pointer transition-colors">
          <Settings className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
