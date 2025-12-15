import React from 'react';
import './Header.css';

const Header = ({ userName = "Usuario" }) => {
  return (
    <header className="header">
      <div className="logo">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <rect x="5" y="15" width="40" height="25" rx="2" fill="#FF9800"/>
          <path d="M15 15 L20 5 L30 5 L35 15" fill="#FFB74D"/>
          <circle cx="25" cy="27" r="8" fill="#FFF"/>
          <rect x="23" y="35" width="4" height="8" fill="#333"/>
          <rect x="18" y="43" width="14" height="2" fill="#333"/>
        </svg>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar Opciones..."
          className="search-input"
        />
        <button className="search-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
          </svg>
        </button>
      </div>

      <div className="user-info">
        <div className="user-avatar">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#616161"/>
            <circle cx="20" cy="15" r="6" fill="#FFF"/>
            <path d="M8 35c0-6.6 5.4-12 12-12s12 5.4 12 12" fill="#FFF"/>
          </svg>
        </div>
        <div className="user-details">
          <span className="user-name">{userName}</span>
          <span className="user-role">Rol de Usuario</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
