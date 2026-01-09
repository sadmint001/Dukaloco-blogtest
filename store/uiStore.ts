
import { create } from 'zustand';
import { Post } from '../types/index';

interface UIState {
  activeTab: string;
  isModalOpen: boolean;
  editingPost: Post | null;
  setActiveTab: (tab: string) => void;
  openModal: (post?: Post | null) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'dashboard',
  isModalOpen: false,
  editingPost: null,

  setActiveTab: (tab) => set({ activeTab: tab }),
  
  openModal: (post = null) => set({ 
    isModalOpen: true, 
    editingPost: post 
  }),
  
  closeModal: () => set({ 
    isModalOpen: false, 
    editingPost: null 
  }),
}));
