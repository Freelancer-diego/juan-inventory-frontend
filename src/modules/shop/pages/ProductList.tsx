import { Search } from 'lucide-react';
import { useShopProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/ProductGrid';
import { useSearchParams } from 'react-router-dom';


export const ProductList = () => {
    const { products, loading, error } = useShopProducts();
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || '';


    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center text-red-500">
            {error}
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


            {/* Main Content */}
            <div className="mb-6 flex items-end justify-between">

                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            {searchTerm ? `Resultados para "${searchTerm}"` : 'Catálogo Completo'}
                        </h2>
                        <p className="text-slate-500 mt-1">
                            {filteredProducts.length} productos disponibles
                        </p>
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <ProductGrid products={filteredProducts} />
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                        <div className="mx-auto h-12 w-12 text-slate-300 mb-4">
                            <Search size={48} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No encontramos resultados</h3>
                        <p className="text-slate-500">Intenta con otros términos de búsqueda.</p>

                    </div>
                )}
        </div>

    );
};
