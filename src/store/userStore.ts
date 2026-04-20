import { create } from 'zustand';
import type { User } from '../types';
import { usersService } from '../modules/admin/users/services/users.service';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (payload: { name?: string; email: string; password: string; mustChangePassword?: boolean }) => Promise<void>;
  updateUser: (id: string, payload: { name?: string; email?: string; password?: string }) => Promise<void>;
  removeUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await usersService.getAll();
      set({ users, loading: false });
    } catch {
      set({ error: 'Error al cargar usuarios', loading: false });
    }
  },

  addUser: async (payload) => {
    set({ loading: true, error: null });
    try {
      const newUser = await usersService.create(payload);
      set((state) => ({ users: [...state.users, newUser], loading: false }));
    } catch (error) {
      set({ error: 'Error al crear usuario', loading: false });
      throw error;
    }
  },

  updateUser: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const updated = await usersService.update(id, payload);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updated : u)),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Error al actualizar usuario', loading: false });
      throw error;
    }
  },

  removeUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await usersService.delete(id);
      set((state) => ({ users: state.users.filter((u) => u.id !== id), loading: false }));
    } catch (error) {
      set({ error: 'Error al eliminar usuario', loading: false });
      throw error;
    }
  },
}));
