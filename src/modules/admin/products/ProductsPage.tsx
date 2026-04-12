import { Plus } from 'lucide-react';
import { useProducts } from './hooks/useProducts';
import { ProductTable } from './components/ProductTable';
import { ProductModal } from './components/ProductModal';

export const ProductsPage = () => {
  const { 
    products, 
    loading, 
    isModalOpen, 
    selectedProduct, 
    categories,
    openCreateModal, 
    openEditModal, 
    closeModal, 
    handleCreate, 
    handleUpdate, 
    handleDelete 
  } = useProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Inventario</h1>
           <p className="text-slate-500 text-sm mt-1">Gestiona tu catálogo de productos, precios y existencias.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Nuevo Producto
        </button>
      </div>

      <ProductTable 
        products={products} 
        loading={loading} 
        onEdit={openEditModal} 
        onDelete={handleDelete}
        categories={categories}
      />

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        product={selectedProduct}
        categories={categories}
        onSubmit={selectedProduct 
            ? (data) => handleUpdate(selectedProduct.id, data) 
            : handleCreate
        } 
      />
    </div>
  );
};
