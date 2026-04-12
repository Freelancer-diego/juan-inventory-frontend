import { SaleStatus } from '../../../../types';

interface SalesStatusBadgeProps {
    status: SaleStatus;
}

export const SalesStatusBadge = ({ status }: SalesStatusBadgeProps) => {
    const styles = {
        [SaleStatus.PENDIENTE]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        [SaleStatus.VALIDADA]: 'bg-green-100 text-green-800 border-green-200',
        [SaleStatus.CANCELADA]: 'bg-red-100 text-red-800 border-red-200',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
            {status}
        </span>
    );
};
