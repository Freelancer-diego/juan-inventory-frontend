import { api } from '../../../../shared/api/client';
import type { SalesTrendData, TopSellingProduct } from '../../../../types';

export interface DashboardSummary {
  revenue: number;
  revenueGrowth: number;
  orders: number;
  products: number;
  stockAlerts: number;
}

export interface StockRiskItem {
  id: string;
  name: string;
  stock: number;
  price: number;
}

export interface DashboardData {
  summary: DashboardSummary;
  stockRisks: StockRiskItem[];
  salesTrend: SalesTrendData[];
  topProducts: TopSellingProduct[];
}

export const DashboardService = {
  getData: async (from?: string, to?: string): Promise<DashboardData> => {
    const { data } = await api.get<DashboardData>('/dashboard', {
      params: {
        ...(from && { from }),
        ...(to && { to }),
      },
    });
    return data;
  },
};
