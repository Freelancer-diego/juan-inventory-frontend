import { useState, type FormEvent } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export const ShopHeader = () => {
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?q=${encodeURIComponent(searchTerm.trim())}`);
        } else {
            navigate('/');
        }
    };

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between gap-4">
                    {/* Logo & Mobile Menu */}
                    <div className="flex items-center gap-3">
                        <button 
                            className="p-1 md:hidden hover:bg-black/5 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <Link to="/" className="flex items-center gap-1 group">
                             <div className="font-extrabold text-2xl tracking-tighter text-slate-900 group-hover:opacity-80 transition-opacity">
                                TIENDA
                                <span className="text-blue-600">.</span>
                             </div>
                        </Link>
                    </div>

                    {/* Search Bar - Mercado Libre Style */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex relative">
                        <input
                            type="text"
                            placeholder="Buscar productos, marcas y más..."
                            className="w-full h-10 pl-4 pr-12 bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-sm focus:outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button 
                            type="submit" 
                            className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors"
                        >
                            <Search size={20} />
                        </button>
                    </form>

                    {/* Mobile Search Icon (visible only on mobile) */}
                    <div className="md:hidden flex-1 flex justify-end">
                         <button className="p-2 text-slate-800" onClick={() => navigate('/')}>
                             <Search size={24} />
                         </button>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <Link 
                            to="/cart" 
                            className="relative flex items-center gap-2 text-slate-800 hover:text-slate-600 transition-colors"
                        >
                            <ShoppingCart size={24} strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Search Bar (Expandable or always visible below?) 
                    Let's make it appear below on mobile if needed, or just let users use the main one if we redesign.
                    For now, I'll add a mobile search input below the header if on mobile.
                */}
                <div className="md:hidden pb-3">
                     <form onSubmit={handleSearch} className="relative flex shadow-sm">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Estoy buscando..."
                                className="block w-full pl-10 pr-3 py-2 border-none rounded-sm text-sm bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </header>
    );
};
