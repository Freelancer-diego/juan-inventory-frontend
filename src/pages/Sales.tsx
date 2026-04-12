import React, { useEffect } from 'react';
import { useSaleStore } from '../store/saleStore';
import { SaleStatus } from '../types/index';
import './Sales.css';

export const Sales: React.FC = () => {
  const { sales, loading, error, fetchSales } = useSaleStore();

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const getStatusColor = (status: SaleStatus) => {
    switch (status) {
      case SaleStatus.VALIDADA:
        return 'success';
      case SaleStatus.PENDIENTE:
        return 'warning';
      case SaleStatus.CANCELADA:
        return 'danger';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="sales-container">
        <div className="loading">Cargando ventas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sales-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="sales-container">
      <div className="sales-header">
        <h1>Ventas</h1>
        <button className="btn-primary">+ Nueva Venta</button>
      </div>

      {sales.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💰</div>
          <h2>No hay ventas</h2>
          <p>Comienza registrando tu primera venta</p>
        </div>
      ) : (
        <div className="sales-list">
          {sales.map((sale) => (
            <div key={sale.id} className="sale-card">
              <div className="sale-header">
                <div>
                  <h3>Venta #{sale.id.substring(0, 8)}</h3>
                  <span className={`status-badge ${getStatusColor(sale.status)}`}>
                    {sale.status}
                  </span>
                </div>
                <div className="sale-total">${sale.total.toFixed(2)}</div>
              </div>

              <div className="sale-items">
                <h4>Productos ({sale.items.length})</h4>
                {sale.items.map((item, index) => (
                  <div key={index} className="sale-item">
                    <span>Producto: {item.productId.substring(0, 8)}</span>
                    <span>Cantidad: {item.quantity}</span>
                    <span>Precio: ${item.unitPrice.toFixed(2)}</span>
                    <span className="item-subtotal">${item.subtotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="sale-actions">
                <button className="btn-secondary">Ver Detalles</button>
                <button className="btn-danger">Cancelar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
