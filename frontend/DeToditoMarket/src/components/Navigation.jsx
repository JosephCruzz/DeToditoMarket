import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const [showReportesMenu, setShowReportesMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="nav-buttons">
        <Link to="/dashboard" className={`nav-button ${isActive('/dashboard') ? 'active' : ''}`}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
          <span>Dashboard</span>
        </Link>

        <Link to="/inventario" className={`nav-button ${isActive('/inventario') ? 'active' : ''}`}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z"/>
          </svg>
          <span>Inventario</span>
        </Link>

        <Link to="/usuarios" className={`nav-button ${isActive('/usuarios') ? 'active' : ''}`}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          <span>Usuarios</span>
        </Link>

        <div
          className="nav-button-wrapper"
          onMouseEnter={() => setShowReportesMenu(true)}
          onMouseLeave={() => setShowReportesMenu(false)}
        >
          <div className={`nav-button ${isActive('/reportes') ? 'active' : ''}`}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
            <span>Reportes</span>
          </div>
          {showReportesMenu && (
            <div className="reportes-submenu">
              <Link to="/reportes/ventas" className="submenu-item">
                Reportes de Ventas
              </Link>
              <Link to="/reportes/compras" className="submenu-item">
                Reportes de Compras
              </Link>
              <Link to="/reportes/auditoria" className="submenu-item">
                Auditoria
              </Link>
            </div>
          )}
        </div>

        <Link to="/proveedores" className={`nav-button ${isActive('/proveedores') ? 'active' : ''}`}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
          <span>Proveedores</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
