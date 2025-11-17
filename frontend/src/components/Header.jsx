import './Header.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';
import searchIcon from '../images/SearchIcon.png';
import userIcon from '../images/UserIcon.png';
import dashboardIcon from '../images/DashboardIcon.png';
import inventoryIcon from '../images/InventarioIcon.png';
import reportesIcon from '../images/ReportesIcon.png';
import usuariosIcon from '../images/UsuariosIcon.png';
import proveedoresIcon from '../images/ProveedoresIcon.png';

const Header = () => {

    const [navigateView, setNavigateView] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        switch(navigateView){
            case 0:
                navigate("/gestion/productos");
                break;
            case 1:
                navigate("/gestion/usuarios");
                break;
            case 2:
                navigate("/gestion/proveedores");
                break;
            default:
                break;
        }
    }, [navigateView, navigate]);

    return(
        <div>
            <div className='top-container'>
                <img
                src={logo}
                alt='Logo' 
                style={{width: '100px', height: '100px'}} 
                />
                <div className='search-input'>
                    <input
                    className='search-line'
                    type='text'
                    placeholder='Buscar Opciones...'
                    ></input>
                    <img
                    src={searchIcon}
                    alt='SearchIcon'
                    style={{width: '25px', height: '25px'}}
                    />
                </div>
                <div className='profile'>
                    <img
                    src={userIcon}
                    alt='userIcon'
                    style={{width: '40px', height: '40px'}}
                    />
                    <div className='user-info'>
                        <label className='username'>Usuario</label>
                        <label className='user-role'>Rol de Usuario</label>
                    </div>
                </div>
            </div>
            <div className='bottom-container'>
                <div className='options'>
                    <img
                    src={dashboardIcon}
                    alt='icon' 
                    style={{width: '50px', height: '50px'}} 
                    />
                    <label>Dashboard</label>
                </div>
                <div className='options' onClick={()=>setNavigateView(0)}>
                    <img
                    src={inventoryIcon}
                    alt='icon' 
                    style={{width: '50px', height: '50px'}} 
                    />
                    <label>Inventario</label>
                </div>
                <div className='options' onClick={()=>setNavigateView(1)}>
                    <img
                    src={usuariosIcon}
                    alt='icon' 
                    style={{width: '50px', height: '50px'}} 
                    />
                    <label>Usuarios</label>
                </div>
                <div className='options'>
                    <img
                    src={reportesIcon}
                    alt='icon' 
                    style={{width: '50px', height: '50px'}} 
                    />
                    <label>Reportes</label>
                </div>
                <div className='options' onClick={()=>setNavigateView(2)}>
                    <img
                    src={proveedoresIcon}
                    alt='icon' 
                    style={{width: '50px', height: '50px'}} 
                    />
                    <label>Proveedores</label>
                </div>
            </div>
        </div>
    )
}

export default Header;