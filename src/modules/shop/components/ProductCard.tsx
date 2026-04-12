import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../../../shared/utils/format';
import type { Product } from '../../../types';
import { useCart } from '../hooks/useCart';
import { ShopProductImage } from './ShopProductImage';

interface ProductCardProps {
  product: Product;
}

const StockBadge = ({ stock }: { stock: number }) => {
  if (stock <= 0)
    return (
      <span className="absolute top-3 left-3 bg-slate-800/80 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
        Agotado
      </span>
    );
  if (stock <= 5)
    return (
      <span className="absolute top-3 left-3 bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
        Últimas {stock}
      </span>
    );
  return null;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const outOfStock = product.stock <= 0;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col">

      {/* ── Image area ─────────────────────────────────────────── */}
      <div className="relative aspect-[4/3] w-full flex-shrink-0">
        <ShopProductImage
          src={product.image}
          alt={product.name}
          zoom={!outOfStock}
        />
        <StockBadge stock={product.stock} />

        {/* Dimming overlay when out of stock */}
        {outOfStock && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]" />
        )}
      </div>

      {/* ── Info area ──────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            {formatCurrency(product.price)}
          </span>

          <button
            onClick={() => addItem(product)}
            disabled={outOfStock}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-900 shadow-sm"
          >
            <ShoppingCart size={14} />
            {outOfStock ? 'Agotado' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
};
