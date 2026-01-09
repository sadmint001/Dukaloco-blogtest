
import { create } from 'zustand';
import { Post } from '../types/index';

interface UIState {
  activeTab: string;
  isModalOpen: boolean;
  isMobileMenuOpen: boolean;
  editingPost: Post | null;
  setActiveTab: (tab: string) => void;
  openModal: (post?: Post | null) => void;
  closeModal: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'dashboard',
  isModalOpen: false,
  isMobileMenuOpen: false,
  editingPost: null,

  setActiveTab: (tab) => set({ activeTab: tab, isMobileMenuOpen: false }),
  
  openModal: (post = null) => set({ 
    isModalOpen: true, 
    editingPost: post 
  }),
  
  closeModal: () => set({ 
    isModalOpen: false, 
    editingPost: null 
  }),

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));
