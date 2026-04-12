import type { Product, Category } from '../../../../types';
import { SmartTable, type TableColumn } from '../../../../shared/components/SmartTable';
import { ProductImage } from './ProductImage';
import { StockBadge } from './StockBadge';
import { ProductActions } from './ProductActions';
import { Tag } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  categories: Category[];
}

const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);

export const ProductTable = ({ products, loading, onEdit, onDelete, categories }: ProductTableProps) => {
  const getCategoryName = (categoryId?: string) =>
    categories.find(c => c.id === categoryId)?.name;

  const columns: TableColumn<Product>[] = [
    {
      key: 'product',
      header: 'Producto',
      searchValue: item => item.name,
      render: item => (
        <div className="flex items-center gap-4">
          <ProductImage src={item.image} alt={item.name} />
          <span className="font-medium text-slate-900">{item.name}</span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Categoría',
      searchValue: item => getCategoryName(item.categoryId) ?? '',
      render: item => {
        const name = getCategoryName(item.categoryId);
        return name ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
            <Tag size={11} />
            {name}
          </span>
        ) : (
          <span className="text-xs text-slate-400">—</span>
        );
      },
    },
    {
      key: 'price',
      header: 'Precio',
      searchValue: item => item.price.toString(),
      render: item => (
        <span className="text-slate-700 font-medium">{formatCOP(item.price)}</span>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      searchValue: item => item.stock.toString(),
      render: item => <StockBadge stock={item.stock} />,
    },
    {
      key: 'actions',
      header: 'Acciones',
      headerClass: 'text-right',
      cellClass: 'text-right',
      render: item => (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ProductActions onEdit={() => onEdit(item)} onDelete={() => onDelete(item.id)} />
        </div>
      ),
    },
  ];

  return (
    <SmartTable
      data={products}
      columns={columns}
      loading={loading}
      emptyMessage="No hay productos en el inventario."
      pageSize={10}
      getKey={item => item.id}
      mobileCard={item => {
        const categoryName = getCategoryName(item.categoryId);
        return (
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <ProductImage src={item.image} alt={item.name} />
                <div>
                  <h3 className="font-medium text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-500">{formatCOP(item.price)}</p>
                  {categoryName && (
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                      <Tag size={10} />
                      {categoryName}
                    </span>
                  )}
                </div>
              </div>
              <ProductActions onEdit={() => onEdit(item)} onDelete={() => onDelete(item.id)} />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400">Estado del inventario:</span>
              <StockBadge stock={item.stock} />
            </div>
          </div>
        );
      }}
    />
  );
};
