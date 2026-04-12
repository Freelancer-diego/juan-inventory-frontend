import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { shopService } from '../services/shop.service';
import type { Product } from '../../../types';
import { useCart } from '../hooks/useCart';
import { ShopProductImage } from '../components/ShopProductImage';
import { formatCurrency } from '../../../shared/utils/format';

export const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        if (!id) return;
        shopService.getProductById(id)
            .then(setProduct)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-slate-400">Cargando producto...</div>
        </div>
    );
    if (!product) return (
        <div className="min-h-screen flex items-center justify-center text-slate-500">
            Producto no encontrado.
        </div>
    );

    const outOfStock = product.stock <= 0;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 text-sm font-medium transition-colors">
                    <ArrowLeft size={16} /> Volver al catálogo
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden grid md:grid-cols-2">
                    {/* ── Image ─────────────────────────────────────── */}
                    <div className="relative aspect-square w-full">
                        <ShopProductImage src={product.image} alt={product.name} />
                        {outOfStock && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
                                <span className="bg-slate-800 text-white text-sm font-bold px-4 py-2 rounded-full">
                                    Agotado
                                </span>
                            </div>
                        )}
                    </div>

                    {/* ── Info ──────────────────────────────────────── */}
                    <div className="flex flex-col justify-center p-8 gap-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                                {product.name}
                            </h1>
                            {product.stock > 0 && product.stock <= 5 && (
                                <span className="inline-block text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                                    Últimas {product.stock} unidades
                                </span>
                            )}
                        </div>

                        <p className="text-3xl font-bold text-slate-900 tracking-tight">
                            {formatCurrency(product.price)}
                        </p>

                        <button
                            onClick={() => addItem(product)}
                            disabled={outOfStock}
                            className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-700 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <ShoppingCart size={18} />
                            {outOfStock ? 'Sin stock disponible' : 'Agregar al carrito'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
