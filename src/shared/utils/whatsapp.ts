import type { CartItem } from '../../modules/shop/store/cart.store';

interface CustomerData {
    name: string;
    phone: string;
}

const formatCOP = (value: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

export const generateWhatsAppLink = (
    merchantPhone: string,
    customer: CustomerData,
    items: CartItem[],
    total: number,
    saleCode: string,
): string => {
    const itemLines = items
        .map(item => `  • ${item.quantity}x ${item.name} — ${formatCOP(item.price * item.quantity)}`)
        .join('\n');

    const message = [
        `🛍️ *Nuevo Pedido — Stockly*`,
        ``,
        `👤 *${customer.name}*`,
        `📱 ${customer.phone}`,
        ``,
        `📦 *Productos:*`,
        itemLines,
        ``,
        `💰 *Total: ${formatCOP(total)}*`,
        ``,
        `──────────────────`,
        `🔑 *Código de pedido: #${saleCode}*`,
        `_Menciona este código para confirmar tu pedido._`,
    ].join('\n');

    return `https://wa.me/${merchantPhone}?text=${encodeURIComponent(message)}`;
};
