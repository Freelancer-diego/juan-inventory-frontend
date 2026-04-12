import type { Product, Category } from '../../../../types';
import { ProductImage } from './ProductImage';
import { StockBadge } from './StockBadge';
import { ProductActions } from './ProductActions';
import { Tag } from 'lucide-react';

interface ProductRowProps {
  product: Product;
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductRow = ({ product, categories, onEdit, onDelete }: ProductRowProps) => {
  const categoryName = categories.find(c => c.id === product.categoryId)?.name;

  return (
    <>
      {/* Desktop Row */}
      <tr className="hidden md:table-row hover:bg-slate-50 transition-colors cursor-default group">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-4">
            <ProductImage src={product.image} alt={product.name} />
            <div className="text-sm font-medium text-slate-900">{product.name}</div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {categoryName ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
              <Tag size={11} />
              {categoryName}
            </span>
          ) : (
            <span className="text-xs text-slate-400">—</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
          {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(product.price)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <StockBadge stock={product.stock} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ProductActions onEdit={() => onEdit(product)} onDelete={() => onDelete(product.id)} />
          </div>
        </td>
      </tr>

      {/* Mobile Card Layout */}
      <div className="md:hidden bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
        <div className="flex justify-between items-start">
           <div className="flex gap-3">
             <ProductImage src={product.image} alt={product.name} />
             <div>
                <h3 className="font-medium text-slate-900">{product.name}</h3>
                <p className="text-sm text-slate-500">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(product.price)}</p>
                {categoryName && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                    <Tag size={10} />
                    {categoryName}
                  </span>
                )}
             </div>
           </div>
           <ProductActions onEdit={() => onEdit(product)} onDelete={() => onDelete(product.id)} />
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400">Estado del inventario:</span>
            <StockBadge stock={product.stock} />
        </div>
      </div>
    </>
  );
};
