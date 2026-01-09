import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types/index';
import { MOCK_USERS } from '../constants/index';

interface AuthContextType extends AuthState {
  login: (role: 'admin' | 'user') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('dukaloco_user');
    if (savedUser) {
      setAuth({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuth((prev: AuthState) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = (role: 'admin' | 'user') => {
    const user = MOCK_USERS.find((u: User) => u.role === role);
    if (user) {
      localStorage.setItem('dukaloco_user', JSON.stringify(user));
      setAuth({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('dukaloco_user');
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
