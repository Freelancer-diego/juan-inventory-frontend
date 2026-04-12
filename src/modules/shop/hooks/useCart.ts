import { useCartStore } from '../store/cart.store';
import { useMemo } from 'react';

export const useCart = () => {
    const store = useCartStore();

    const cartTotal = useMemo(() => {
        return store.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [store.items]);

    const cartCount = useMemo(() => {
        return store.items.reduce((count, item) => count + item.quantity, 0);
    }, [store.items]);

    return {
        ...store,
        cartTotal,
        cartCount
    };
};
