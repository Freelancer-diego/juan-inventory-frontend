import { api } from './api';
import type { Sale } from '../types/index';

export const saleService = {
  async getAll(): Promise<Sale[]> {
    const response = await api.get<Sale[]>('/sales');
    return response.data;
  },

  async getById(id: string): Promise<Sale> {
    const response = await api.get<Sale>(`/sales/${id}`);
    return response.data;
  },

  async create(sale: Omit<Sale, 'id'>): Promise<Sale> {
    const response = await api.post<Sale>('/sales', sale);
    return response.data;
  },

  async update(id: string, sale: Partial<Sale>): Promise<Sale> {
    const response = await api.put<Sale>(`/sales/${id}`, sale);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/sales/${id}`);
  },
};
