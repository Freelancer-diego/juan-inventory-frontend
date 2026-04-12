import { api } from '../../../shared/api/client';
import type { Product } from '../../../types';

export const shopService = {
    getAllProducts: async () => {
        // Assuming public endpoint is /products (or same as admin for now if no auth required for GET)
        const { data } = await api.get<Product[]>('/products');
        return data.filter(p => p.stock > 0); // Only show available products
    },

    getProductById: async (id: string) => {
        const { data } = await api.get<Product>(`/products/${id}`);
        return data;
    }
};
