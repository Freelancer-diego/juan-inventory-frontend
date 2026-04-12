import { api } from '../../../../shared/api/client';
import type { Sale } from '../../../../types';

export const salesService = {
    getAll: async () => {
        const { data } = await api.get<Sale[]>('/sales');
        return data;
    },

    validate: async (id: string) => {
        await api.post(`/sales/${id}/validate`);
    }
};
