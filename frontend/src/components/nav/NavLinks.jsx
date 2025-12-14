import "./NavLinks.css";

function NavLinks() {
  return (
    <nav className="nav-links">
      <a className="nav-item active" href="#">
        🏠 Dashboard
      </a>
      <a className="nav-item" href="#">
        👥 Usuarios
      </a>
      <a className="nav-item" href="#">
        🧾 Reportes
        <div className="dropdown">
          <div className="dropdown-item">Reportes de Ventas</div>
          <div className="dropdown-item">Reportes de Compras</div>
          <div className="dropdown-item">Auditoría</div>
        </div>
      </a>
      <a className="nav-item" href="#">
        📦 Inventario
      </a>
      <a className="nav-item" href="#">
        🍌 Proveedores
      </a>
    </nav>
  );
}

export default NavLinks;