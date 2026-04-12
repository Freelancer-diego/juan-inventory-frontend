import { X, Package } from 'lucide-react';
import type { Sale, SaleStatus } from '../../../../types';
import { SalesStatusBadge } from './SalesStatusBadge';

interface SaleDetailModalProps {
  sale: Sale;
  onClose: () => void;
}

const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

export const SaleDetailModal = ({ sale, onClose }: SaleDetailModalProps) => {
  const summaryLines = sale.orderSummary?.trim()
    ? sale.orderSummary.trim().split('\n')
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-slide-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Detalle del Pedido</h2>
            {sale.saleCode && (
              <span className="inline-block mt-1 text-xs font-mono font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                #{sale.saleCode}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors ml-4 shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Cliente */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">Cliente</p>
              <p className="font-semibold text-slate-900">{sale.customerName}</p>
              <p className="text-sm text-slate-500">{sale.customerPhone}</p>
            </div>
            <SalesStatusBadge status={sale.status as SaleStatus} />
          </div>

          {/* Productos */}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-2">
              Productos
            </p>
            {summaryLines ? (
              <ul className="space-y-1.5">
                {summaryLines.map((line, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <Package size={14} className="text-slate-400 mt-0.5 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400 italic">
                {sale.items.length} ítem{sale.items.length !== 1 ? 's' : ''} registrados
              </p>
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <span className="text-sm font-medium text-slate-600">Total</span>
            <span className="text-lg font-bold text-slate-900">{formatCOP(sale.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
