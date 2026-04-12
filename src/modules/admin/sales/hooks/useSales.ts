import { useState, useEffect, useCallback } from 'react';
import type { Sale } from '../../../../types';
import { salesService } from '../services/SalesService';
import { dialog } from '../../../../shared/utils/dialog';

export const useSales = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSales = useCallback(async () => {
        setLoading(true);
        try {
            const data = await salesService.getAll();
            setSales(data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch sales', err);
            setError('Error al cargar ventas');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSales();
    }, [fetchSales]);

    const handleValidate = async (id: string) => {
        const ok = await dialog.confirm({
            title: '¿Validar esta venta?',
            text: 'La venta pasará al estado VALIDADA.',
            confirmText: 'Sí, validar',
        });
        if (!ok) return;

        // Optimistic update
        const previousSales = [...sales];
        setSales(prev => prev.map(s => s.id === id ? { ...s, status: 'VALIDADA' } : s));

        try {
            await salesService.validate(id);
        } catch (err) {
            console.error('Validation failed', err);
            dialog.error('No se pudo validar la venta. Intenta de nuevo.');
            // Revert changes
            setSales(previousSales);
        }
    };

    return {
        sales,
        loading,
        error,
        handleValidate,
        fetchSales
    };
};
