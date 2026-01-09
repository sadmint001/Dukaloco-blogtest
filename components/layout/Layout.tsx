import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useUIStore } from '../../store/uiStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isMobileMenuOpen, setMobileMenuOpen } = useUIStore();

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[90] md:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Decorative Background Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/10 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-float"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-600/5 rounded-full blur-[70px] md:blur-[100px] -z-10"></div>

        <Header />

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 pb-12">
          <div className="max-w-6xl mx-auto py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;