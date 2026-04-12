import { create } from 'zustand';
import type { Sale } from '../types/index';
import { saleService } from '../services/saleService';

interface SaleState {
  sales: Sale[];
  loading: boolean;
  error: string | null;
  fetchSales: () => Promise<void>;
  addSale: (sale: Omit<Sale, 'id'>) => Promise<void>;
  updateSale: (id: string, sale: Partial<Sale>) => Promise<void>;
  deleteSale: (id: string) => Promise<void>;
}

export const useSaleStore = create<SaleState>((set) => ({
  sales: [],
  loading: false,
  error: null,

  fetchSales: async () => {
    set({ loading: true, error: null });
    try {
      const sales = await saleService.getAll();
      set({ sales, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar ventas', loading: false });
    }
  },

  addSale: async (sale) => {
    set({ loading: true, error: null });
    try {
      const newSale = await saleService.create(sale);
      set((state) => ({
        sales: [...state.sales, newSale],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Error al crear venta', loading: false });
      throw error;
    }
  },

  updateSale: async (id, sale) => {
    set({ loading: true, error: null });
    try {
      const updatedSale = await saleService.update(id, sale);
      set((state) => ({
        sales: state.sales.map((s) => (s.id === id ? updatedSale : s)),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Error al actualizar venta', loading: false });
      throw error;
    }
  },

  deleteSale: async (id) => {
    set({ loading: true, error: null });
    try {
      await saleService.delete(id);
      set((state) => ({
        sales: state.sales.filter((s) => s.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Error al eliminar venta', loading: false });
      throw error;
    }
  },
}));
