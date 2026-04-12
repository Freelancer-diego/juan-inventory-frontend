import { useState, useEffect } from 'react';
import type { Product, Category } from '../../../../types';
import { useProductStore } from '../../../../store/productStore';
import { useToastStore } from '../../../../store/toast.store';
import { categoriesService } from '../services/categories.service';
import { dialog } from '../../../../shared/utils/dialog';

export const useProducts = () => {
    const {
        products,
        loading: storeLoading,
        error: storeError,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct: removeProduct
    } = useProductStore();
    const toast = useToastStore((state) => state.show);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        const loadCategories = async () => {
            setCategoriesLoading(true);
            try {
                const data = await categoriesService.getAll();
                setCategories(data);
            } catch (err) {
                console.error('Error cargando categorías:', err);
            } finally {
                setCategoriesLoading(false);
            }
        };
        loadCategories();
    }, []);

    const handleCreate = async (product: Omit<Product, 'id'>) => {
        try {
            await addProduct(product);
            setIsModalOpen(false);
            toast('Producto creado exitosamente');
        } catch {
            toast('Error al crear el producto', 'error');
        }
    };

    const handleUpdate = async (id: string, product: Partial<Product>) => {
        try {
            await updateProduct(id, product);
            setIsModalOpen(false);
            setSelectedProduct(undefined);
            toast('Producto actualizado exitosamente');
        } catch {
            toast('Error al actualizar el producto', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        const ok = await dialog.confirm({
            title: '¿Eliminar producto?',
            text: 'Esta acción no se puede deshacer.',
            confirmText: 'Sí, eliminar',
            variant: 'danger',
        });
        if (!ok) return;
        try {
            await removeProduct(id);
            toast('Producto eliminado');
        } catch {
            toast('Error al eliminar el producto', 'error');
        }
    };

    const openCreateModal = () => {
        setSelectedProduct(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(undefined);
    };

    return {
        products,
        loading: storeLoading,
        error: storeError,
        categories,
        categoriesLoading,
        isModalOpen,
        selectedProduct,
        openCreateModal,
        openEditModal,
        closeModal,
        handleCreate,
        handleUpdate,
        handleDelete
    };
};
