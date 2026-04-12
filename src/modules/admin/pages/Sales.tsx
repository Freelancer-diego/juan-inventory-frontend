import { useSales } from '../sales/hooks/useSales';
import { SalesTable } from '../sales/components/SalesTable';
import { RefreshCw } from 'lucide-react';

export const Sales = () => {
  const { sales, loading, error, handleValidate, fetchSales } = useSales();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestión de Ventas</h1>
          <p className="text-sm text-slate-500 mt-1">
            Administra y valida los pedidos de tus clientes via WhatsApp.
          </p>
        </div>
        <button
          onClick={fetchSales}
          disabled={loading}
          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all disabled:opacity-50"
          title="Recargar ventas"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
          {error}
        </div>
      )}

      <SalesTable sales={sales} loading={loading} onValidate={handleValidate} />
    </div>
  );
};
