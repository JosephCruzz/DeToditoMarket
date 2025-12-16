import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="user-section">
        <div className="user-avatar">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="50" fill="#E0E0E0" stroke="#333" strokeWidth="2"/>
            <circle cx="50" cy="40" r="18" fill="#333"/>
            <path d="M25 80c0-13.8 11.2-25 25-25s25 11.2 25 25" fill="#333"/>
          </svg>
        </div>
        <h3 className="user-title">USUARIO</h3>
      </div>

      <div className="sidebar-buttons">
        <button className="sidebar-btn primary">Abrir Caja</button>
        <button className="sidebar-btn secondary">Mi Perfil</button>
      </div>
    </aside>
  );
};

export default Sidebar;
