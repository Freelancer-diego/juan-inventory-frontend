import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📦 Sistema de Inventario
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Inicio
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/products" className="navbar-link">
              Productos
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/sales" className="navbar-link">
              Ventas
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
