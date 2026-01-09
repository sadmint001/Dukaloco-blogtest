
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState } from '../types/index';
import { MOCK_USERS } from '../constants/index';

interface AuthActions {
  login: (role: 'admin' | 'user') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: (role) => {
        const user = MOCK_USERS.find((u) => u.role === role);
        if (user) {
          set({ user, isAuthenticated: true });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'dukaloco-auth-storage',
    }
  )
);
