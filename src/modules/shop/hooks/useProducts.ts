import { useState, useEffect } from 'react';
import type { Product } from '../../../types';
import { shopService } from '../services/shop.service';

export const useShopProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await shopService.getAllProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError('Error al cargar productos');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};
