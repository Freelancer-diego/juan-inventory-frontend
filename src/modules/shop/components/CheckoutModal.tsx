import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { formatCurrency } from '../../../shared/utils/format';
import type { CartItem } from '../store/cart.store';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (customerData: { name: string; phone: string }) => void;
    items: CartItem[];
    total: number;
}

export const CheckoutModal = ({ isOpen, onClose, onConfirm, items, total }: CheckoutModalProps) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({ name, phone });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                
                {/* Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900">Finalizar Pedido</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                        
                        {/* Order Summary Mini */}
                        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                            <p className="text-sm text-blue-800 mb-2 font-medium">Resumen rápido:</p>
                            <div className="space-y-1">
                                {items.slice(0, 3).map(item => (
                                    <div key={item.id} className="flex justify-between text-sm text-slate-600">
                                        <span>{item.quantity}x {item.name}</span>
                                        <span>{formatCurrency(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                                {items.length > 3 && (
                                    <p className="text-xs text-slate-400 mt-1 italic">...y {items.length - 3} más</p>
                                )}
                            </div>
                            <div className="flex justify-between mt-3 pt-3 border-t border-blue-100 font-bold text-blue-900">
                                <span>Total</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                    placeholder="Ej. Juan Pérez"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono / WhatsApp</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                                    placeholder="Ej. 300 123 4567"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] px-4 py-2.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                        >
                            <MessageCircle size={18} />
                            Enviar a WhatsApp
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
