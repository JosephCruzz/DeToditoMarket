import {useState} from 'react';
import "./Navbar.css"
function Navbar(){
    return (
        <header className="navbar">
         <div className="nav-left">
         <div className="logo">
             De todito Market
         </div>
         </div>
            <div className="nav-center">
                <input
                className="search"
                placeholder="Buscar opciones disponibles..."
                type="text"
                />
                <span className="search-icon">🔍</span>
            </div>

             <div className="nav-right">
                 <div className="user-avatar">👤</div>
                 <div className="user-info">
                     <div className="user-name">Bienvenido, Diego Matute!</div>
                     <div className="user-role">Administrador</div>
                 </div>
                 <button className="logout">Cerrar sesión</button>
             </div>

        </header>
    );
}

export default Navbar;