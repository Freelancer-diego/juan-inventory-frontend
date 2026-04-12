import type { CartItem as CartItemType } from '../store/cart.store';
import { QuantitySelector } from './QuantitySelector';
import { Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { ShopProductImage } from './ShopProductImage';
import { formatCurrency } from '../../../shared/utils/format';

interface CartItemProps {
    item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div className="flex gap-4 py-4 border-b border-slate-100 last:border-0">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                <ShopProductImage src={item.image} alt={item.name} />
            </div>
            
            <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <h4 className="font-medium text-slate-900 line-clamp-2 text-sm">{item.name}</h4>
                    <button 
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors ml-2"
                        title="Eliminar"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
                
                <div className="flex justify-between items-end mt-2">
                    <QuantitySelector 
                        quantity={item.quantity}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                    />
                    <div className="text-right">
                        <span className="block text-xs text-slate-500">Total</span>
                        <span className="font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
