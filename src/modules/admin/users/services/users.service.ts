import { api } from '../../../../shared/api/client';
import type { User } from '../../../../types';

interface CreateUserPayload {
  name?: string;
  email: string;
  password: string;
  mustChangePassword?: boolean;
}

interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
}

export const usersService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  create: async (payload: CreateUserPayload): Promise<User> => {
    const { data } = await api.post<User>('/users', payload);
    return data;
  },

  update: async (id: string, payload: UpdateUserPayload): Promise<User> => {
    const { data } = await api.put<User>(`/users/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
