import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  mustChangePassword: boolean;
  login: (token: string, mustChangePassword?: boolean) => void;
  logout: () => void;
  clearMustChangePassword: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  mustChangePassword: localStorage.getItem('mustChangePassword') === 'true',

  login: (token, mustChangePassword = false) => {
    localStorage.setItem('token', token);
    localStorage.setItem('mustChangePassword', String(mustChangePassword));
    set({ token, isAuthenticated: true, mustChangePassword });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mustChangePassword');
    set({ token: null, isAuthenticated: false, mustChangePassword: false });
  },

  clearMustChangePassword: () => {
    localStorage.removeItem('mustChangePassword');
    set({ mustChangePassword: false });
  },
}));
