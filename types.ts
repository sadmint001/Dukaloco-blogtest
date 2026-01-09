
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  authorName?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}
