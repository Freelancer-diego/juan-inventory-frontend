import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

export const QuantitySelector = ({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) => {
    return (
        <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1">
            <button 
                onClick={onDecrease}
                className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
                aria-label="Decrease quantity"
            >
                <Minus size={16} />
            </button>
            <span className="w-8 text-center font-mono font-medium text-sm">{quantity}</span>
            <button 
                onClick={onIncrease}
                className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
                aria-label="Increase quantity"
            >
                <Plus size={16} />
            </button>
        </div>
    );
};
