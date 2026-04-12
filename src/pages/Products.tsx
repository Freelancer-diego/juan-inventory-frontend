import React, { useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import './Products.css';

export const Products: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Productos</h1>
        <button className="btn-primary">+ Nuevo Producto</button>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h2>No hay productos</h2>
          <p>Comienza agregando tu primer producto</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <h3>{product.name}</h3>
                <span className={`stock-badge ${product.stock < 10 ? 'low' : ''}`}>
                  Stock: {product.stock}
                </span>
              </div>
              <div className="product-price">${product.price.toFixed(2)}</div>
              <div className="product-actions">
                <button className="btn-secondary">Editar</button>
                <button className="btn-danger">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
