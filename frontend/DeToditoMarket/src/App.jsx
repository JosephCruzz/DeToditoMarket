import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header userName="Diego Hatutel" />
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<div style={{ padding: '20px' }}>Página de Usuarios</div>} />
          <Route path="/reportes" element={<div style={{ padding: '20px' }}>Página de Reportes</div>} />
          <Route path="/reportes/ventas" element={<div style={{ padding: '20px' }}>Reportes de Ventas</div>} />
          <Route path="/reportes/compras" element={<div style={{ padding: '20px' }}>Reportes de Compras</div>} />
          <Route path="/reportes/auditoria" element={<div style={{ padding: '20px' }}>Auditoría</div>} />
          <Route path="/inventario" element={<div style={{ padding: '20px' }}>Página de Inventario</div>} />
          <Route path="/proveedores" element={<div style={{ padding: '20px' }}>Página de Proveedores</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
