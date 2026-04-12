import { useEffect, useState } from 'react';
import { api } from '../../../shared/api/client';
import type { Product, Sale } from '../../../types';
import '../admin.css';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingSales: 0,
    lowStock: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, salesRes] = await Promise.all([
          api.get<Product[]>('/products'),
          api.get<Sale[]>('/sales')
        ]);

        const products = productsRes.data;
        const sales = salesRes.data;

        setStats({
          totalProducts: products.length,
          lowStock: products.filter(p => p.stock < 10).length,
          pendingSales: sales.filter(s => s.status === 'PENDIENTE').length
        });
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '600' }}>Dashboard Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Products</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', margin: 0 }}>{stats.totalProducts}</p>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Pending Sales</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#eab308', margin: 0 }}>{stats.pendingSales}</p>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Low Stock Items</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>{stats.lowStock}</p>
        </div>
      </div>
    </div>
  );
};
