import { useState } from 'react';
import { useDashboardData } from './hooks/useDashboardData';
import { StatCard } from './components/StatCard';
import { StockChart } from './components/StockChart';
import { SalesStatusChart } from './components/SalesStatusChart';
import { TopProductsChart } from './components/TopProductsChart';
import { DateRangeFilter } from './components/DateRangeFilter';
import type { DateRange } from './components/DateRangeFilter';
import { Activity, Package, AlertCircle, Wallet } from 'lucide-react';
import '../admin.css';

const toISO = (d: Date) => d.toISOString().slice(0, 10);

const defaultRange = (): DateRange => {
  const now = new Date();
  const from = new Date(now);
  from.setDate(now.getDate() - 30);
  return { from: toISO(from), to: toISO(now) };
};

const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);

export const Dashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange>(defaultRange);
  const { summary, stockRisks, salesTrend, topProducts, loading, error } =
    useDashboardData(dateRange.from, dateRange.to);

  if (loading || !summary) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="text-slate-500 animate-pulse">Cargando Dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
          {error}
        </div>
      </div>
    );
  }

  const growthLabel = `${summary.revenueGrowth >= 0 ? '+' : ''}${summary.revenueGrowth}%`;
  const growthUp = summary.revenueGrowth >= 0;

  return (
    <div className="min-h-screen bg-slate-50/50 pt-2 pb-10">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Resumen General</h1>
            <p className="text-slate-500 text-sm mt-1">
              Vista actualizada del inventario ·{' '}
              <span className="font-medium text-slate-700">
                {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </p>
          </div>

          {/* ── Filtro de fechas ─────────────────────────────────── */}
          <DateRangeFilter value={dateRange} onChange={setDateRange} />
        </div>

        {/* ── Fila 1: KPIs ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Ingresos Totales"
            value={formatCOP(summary.revenue)}
            icon={<Wallet className="text-emerald-500" size={20} />}
            trend={growthLabel}
            trendUp={growthUp}
          />
          <StatCard
            title="Pedidos Pendientes"
            value={summary.orders}
            icon={<Activity className="text-amber-500" size={20} />}
            trend={summary.orders > 0 ? 'Requiere Acción' : 'Todo al día'}
            trendUp={summary.orders === 0}
          />
          <StatCard
            title="Alertas de Stock"
            value={summary.stockAlerts}
            icon={<AlertCircle className="text-red-500" size={20} />}
            trend={summary.stockAlerts > 0 ? 'Niveles Críticos' : 'Estable'}
            trendUp={summary.stockAlerts === 0}
          />
          <StatCard
            title="Productos Activos"
            value={summary.products}
            icon={<Package className="text-blue-500" size={20} />}
          />
        </div>

        {/* ── Fila 2: Tendencia de ventas (ancho completo) ──────────── */}
        <div className="h-[360px]">
          <SalesStatusChart sales={salesTrend} />
        </div>

        {/* ── Fila 3: Stock bajo + Más vendidos (mitad / mitad) ────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[420px]">
            <StockChart products={stockRisks as any} />
          </div>
          <div className="h-[420px]">
            <TopProductsChart data={topProducts} />
          </div>
        </div>

      </div>
    </div>
  );
};
