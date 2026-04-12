import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/CartItem';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../../shared/utils/format';
import { useState } from 'react';
import { CheckoutModal } from '../components/CheckoutModal';
import { generateWhatsAppLink } from '../../../shared/utils/whatsapp';
import { api } from '../../../shared/api/client';

export const Cart = () => {
    const { items, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // Configurable Merchant Number (Replace with actual number)
    const MERCHANT_PHONE = '573218413213'; // Example Colombia number

    const handleConfirmCheckout = (customerData: { name: string; phone: string }) => {
        // Generar identificadores del pedido
        const saleId = crypto.randomUUID();
        const now = new Date();
        const datePart = `${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getFullYear()).slice(2)}`;
        const randPart = Math.random().toString(36).substring(2, 6).toUpperCase();
        const saleCode = `VTA-${datePart}-${randPart}`;

        // Resumen textual del pedido para almacenar y mostrar en admin
        const formatCOP = (v: number) =>
            new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(v);
        const orderSummary = items
            .map(item => `${item.quantity}x ${item.name} (${formatCOP(item.price * item.quantity)})`)
            .join('\n');

        // Registrar venta en el backend como PENDIENTE (fire & forget — no bloquea el flujo)
        api.post('/sales', {
            id: saleId,
            saleCode,
            orderSummary,
            customerName: customerData.name,
            customerPhone: customerData.phone,
            items: items.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                unitPrice: item.price,
                subtotal: item.price * item.quantity,
            })),
        }).catch(err => console.error('[Stockly] Error registrando venta:', err));

        // Abrir WhatsApp con mensaje modernizado que incluye el saleCode
        const link = generateWhatsAppLink(MERCHANT_PHONE, customerData, items, cartTotal, saleCode);
        window.open(link, '_blank');

        // Limpiar carrito y redirigir
        clearCart();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" className="p-2 -ml-2 text-slate-500 hover:bg-white rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Carrito de Compras</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.length > 0 ? (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                {items.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                                <p className="text-slate-500 mb-4">Tu carrito está vacío.</p>
                                <Link to="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Explorar Productos
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Summary / Sidebar */}
                    {items.length > 0 && (
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-8">
                                <h2 className="text-lg font-semibold text-slate-900 mb-4">Resumen</h2>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Envío</span>
                                        <span>{formatCurrency(0)}</span>
                                    </div>
                                    <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-slate-900 text-lg">
                                        <span>Total</span>
                                        <span>{formatCurrency(cartTotal)}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setIsCheckoutOpen(true)}
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-transform active:scale-[0.98] font-medium"
                                >
                                    <CreditCard size={18} />
                                    Proceder al Pago
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <CheckoutModal 
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onConfirm={handleConfirmCheckout}
                items={items}
                total={cartTotal}
            />
        </div>
    );
};
