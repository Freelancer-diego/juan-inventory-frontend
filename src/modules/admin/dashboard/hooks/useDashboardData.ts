import { useEffect, useState } from 'react';
import { DashboardService } from '../services/dashboard.service';
import type { DashboardSummary, StockRiskItem } from '../services/dashboard.service';
import type { SalesTrendData, TopSellingProduct } from '../../../../types';

export const useDashboardData = (from?: string, to?: string) => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [stockRisks, setStockRisks] = useState<StockRiskItem[]>([]);
  const [salesTrend, setSalesTrend] = useState<SalesTrendData[]>([]);
  const [topProducts, setTopProducts] = useState<TopSellingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    DashboardService.getData(from, to)
      .then(data => {
        if (cancelled) return;
        setSummary(data.summary);
        setStockRisks(data.stockRisks);
        setSalesTrend(data.salesTrend);
        setTopProducts(data.topProducts);
      })
      .catch(err => {
        if (cancelled) return;
        console.error('Failed to load dashboard data:', err);
        setError('Error al cargar los datos del dashboard');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [from, to]);

  return { summary, stockRisks, salesTrend, topProducts, loading, error };
};
