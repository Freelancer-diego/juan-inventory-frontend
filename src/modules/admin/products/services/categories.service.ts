import { api } from '../../../../shared/api/client';
import type { Category } from '../../../../types';

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await api.get<Category[]>('/categories');
    return data;
  },
};
