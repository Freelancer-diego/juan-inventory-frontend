import { useState } from 'react';
import type { Sale, SaleStatus } from '../../../../types';
import { SmartTable, type TableColumn } from '../../../../shared/components/SmartTable';
import { SalesStatusBadge } from './SalesStatusBadge';
import { SaleDetailModal } from './SaleDetailModal';
import { CheckCircle, Phone, Eye } from 'lucide-react';

const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);

const SUMMARY_MAX_CHARS = 55;

/** Devuelve la primera línea del resumen truncada */
const summaryPreview = (orderSummary?: string, itemCount?: number): string => {
  if (!orderSummary?.trim()) return `${itemCount ?? 0} ítem${itemCount !== 1 ? 's' : ''}`;
  const firstLine = orderSummary.trim().split('\n')[0];
  return firstLine.length > SUMMARY_MAX_CHARS
    ? firstLine.slice(0, SUMMARY_MAX_CHARS) + '…'
    : firstLine;
};

interface SalesTableProps {
  sales: Sale[];
  loading: boolean;
  onValidate: (id: string) => void;
}

export const SalesTable = ({ sales, loading, onValidate }: SalesTableProps) => {
  const [detailSale, setDetailSale] = useState<Sale | null>(null);

  const columns: TableColumn<Sale>[] = [
    {
      key: 'code',
      header: 'Código',
      searchValue: item => item.saleCode ?? item.id,
      render: item => (
        <span className="font-mono text-xs font-semibold text-blue-600">
          {item.saleCode ? `#${item.saleCode}` : (
            <span className="text-slate-400 font-normal">{item.id.slice(0, 8)}…</span>
          )}
        </span>
      ),
    },
    {
      key: 'customer',
      header: 'Cliente',
      searchValue: item => `${item.customerName} ${item.customerPhone}`,
      render: item => (
        <div>
          <p className="font-medium text-slate-900 leading-tight">{item.customerName}</p>
          <p className="text-xs text-slate-400 mt-0.5">{item.customerPhone}</p>
        </div>
      ),
    },
    {
      key: 'summary',
      header: 'Pedido',
      searchValue: item => item.orderSummary ?? '',
      render: item => (
        <div className="flex items-center gap-2 max-w-[220px]">
          <span className="text-sm text-slate-600 truncate">
            {summaryPreview(item.orderSummary, item.items.length)}
          </span>
          <button
            onClick={() => setDetailSale(item)}
            className="shrink-0 p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Ver detalle del pedido"
          >
            <Eye size={14} />
          </button>
        </div>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      searchValue: item => item.total.toString(),
      render: item => (
        <span className="font-bold text-slate-900">{formatCOP(item.total)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      searchValue: item => item.status,
      render: item => <SalesStatusBadge status={item.status as SaleStatus} />,
    },
    {
      key: 'actions',
      header: 'Acciones',
      render: item =>
        item.status === 'PENDIENTE' ? (
          <button
            onClick={() => onValidate(item.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors shadow-sm shadow-green-600/20"
          >
            <CheckCircle size={13} />
            Validar
          </button>
        ) : null,
    },
  ];

  return (
    <>
      <SmartTable
        data={sales}
        columns={columns}
        loading={loading}
        emptyMessage="No hay ventas registradas."
        pageSize={10}
        getKey={item => item.id}
        mobileCard={item => (
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-slate-900">{item.customerName}</span>
                  <SalesStatusBadge status={item.status as SaleStatus} />
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-500">
                  <Phone size={12} />
                  {item.customerPhone}
                </div>
                {item.saleCode && (
                  <span className="inline-block mt-1 text-xs font-mono font-semibold text-blue-600">
                    #{item.saleCode}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-bold text-slate-900 text-sm">{formatCOP(item.total)}</span>
                <button
                  onClick={() => setDetailSale(item)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Ver detalle"
                >
                  <Eye size={15} />
                </button>
              </div>
            </div>

            {/* Resumen preview */}
            {item.orderSummary && (
              <p className="text-xs text-slate-500 border-t border-slate-100 pt-2 truncate">
                {summaryPreview(item.orderSummary, item.items.length)}
              </p>
            )}

            {item.status === 'PENDIENTE' && (
              <button
                onClick={() => onValidate(item.id)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                <CheckCircle size={15} />
                Validar Venta
              </button>
            )}
          </div>
        )}
      />

      {detailSale && (
        <SaleDetailModal sale={detailSale} onClose={() => setDetailSale(null)} />
      )}
    </>
  );
};
