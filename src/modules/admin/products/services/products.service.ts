import { api } from '../../../../shared/api/client';
import type { Product } from '../../../../types';

export const productsService = {
  getAll: async () => {
    const { data } = await api.get<Product[]>('/products');
    return data;
  },

  create: async (product: Omit<Product, 'id'>) => {
    const { data } = await api.post<Product>('/products', product);
    return data;
  },

  update: async (id: string, product: Partial<Product>) => {
    const { data } = await api.put<Product>(`/products/${id}`, product);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/products/${id}`);
  },

  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post<{ url: string }>('/products/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.url;
  },
};
