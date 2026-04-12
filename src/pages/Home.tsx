import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home-hero">
        <h1 className="home-title">Sistema de Inventario y Ventas</h1>
        <p className="home-subtitle">
          Gestiona tus productos y ventas de manera eficiente
        </p>
      </div>

      <div className="home-cards">
        <Link to="/products" className="home-card">
          <div className="card-icon">📦</div>
          <h2>Productos</h2>
          <p>Administra tu inventario de productos</p>
        </Link>

        <Link to="/sales" className="home-card">
          <div className="card-icon">💰</div>
          <h2>Ventas</h2>
          <p>Registra y consulta tus ventas</p>
        </Link>

        <div className="home-card">
          <div className="card-icon">📊</div>
          <h2>Reportes</h2>
          <p>Próximamente</p>
        </div>
      </div>
    </div>
  );
};
