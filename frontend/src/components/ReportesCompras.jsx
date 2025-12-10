import './ReportesCompras.css';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const ReportesCompras = () => {
    
    const [formVisible, setFormVisible] = useState(false);
    const [add, setAdd] = useState(false);
    const [detalleCompra, setDetalleDeCompra] = useState(false);
    const [proveedor, setProveedor] = useState(false);
    const [user, setUser] = useState(false);
    const [compras, setCompras] = useState([]);

    {/*useEffect(() => {   
        axiosInstance.get('user/getUsers')
        .then(response => {
            setCompras(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });     
    }, []);*/}

    const openFormAdd = () => {
        setFormVisible(true);
        setAdd(true);
    }

    const closeForm = () => {
        setFormVisible(false);
        setAdd(false);
    }

    const Icon = {
        Search: (props) => (
            <svg
            viewBox="0 0 24 24"
            fill="none"
            className={"w-4 h-4 " + (props.className || "")}
            >
            <path
                d="M11 19a8 8 0 1 1 5.29-14.03A8 8 0 0 1 11 19Zm10 2-5.4-5.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            </svg>
        ),
        Sort: ({ active, dir }) => (
            <svg
            viewBox="0 0 24 24"
            className={"w-4 h-4 " + (active ? "text-white" : "text-white/70")}
            >
            <path
                d="M12 6l3 3H9l3-3z"
                fill="currentColor"
                opacity={dir === "asc" ? 1 : 0.35}
            />
            <path
                d="M12 18l-3-3h6l-3 3z"
                fill="currentColor"
                opacity={dir === "desc" ? 1 : 0.35}
            />
            </svg>
        ),
        Add: (props) => (
            <svg viewBox="0 0 24 24" className={"w-5 h-5 " + (props.className || "")}>
            <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            </svg>
        ),
        Edit: (props) => (
            <svg viewBox="0 0 24 24" className={"w-5 h-5 " + (props.className || "")}>
            <path
                d="M4 20h4l10-10-4-4L4 16v4zM14 6l4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            </svg>
        ),
        Delete: (props) => (
            <svg viewBox="0 0 24 24" className={"w-5 h-5 " + (props.className || "")}>
            <path
                d="M6 7h12M9 7V5h6v2m-8 0 1 12h8l1-12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            </svg>
        ),
        ChevronLeft: (props) => (
            <svg viewBox="0 0 24 24" className={"w-6 h-6 " + (props.className || "")}>
            <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            </svg>
        ),
        ChevronRight: (props) => (
            <svg viewBox="0 0 24 24" className={"w-6 h-6 " + (props.className || "")}>
            <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            </svg>
        ),
    };

    return(
        <div className='gestion-container'>
            <div className='title-header'>
                <h1>Reportes de Compras</h1>
                <button onClick={()=>openFormAdd()}>+ Agregar Compra</button>
            </div>
            <div className='table-container'>
                <div className='body-scroll'>
                    <table className='table-productos'>
                        <thead>
                            <tr>
                                <th>ID de Compra</th>
                                <th>Proveedor</th>
                                <th>Usuario Responsable</th>
                                <th>Fecha de Compra</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compras.map((compra)=>(
                                <tr>
                                    <td className='table-body'>{compra.id}</td>
                                    <td className='table-body'>{compra.proveedor_id}</td>
                                    <td className='table-body'>{compra.user_id}</td>
                                    <td className='table-body'>{compra.fecha}</td>
                                    <td className='table-body'>{compra.estado }</td>
                                    <td className='table-body'>
                                        <div className='option-buttons'>
                                            <button className='options-delete-button'>
                                                <Icon.Delete/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/*FORM PARA AGREGAR*/}
            {formVisible &&(
                <div className='modal-overlay'>
                    <div className='add-form'>
                        <div className='form-header'>
                            <h2>Agregar Compra</h2>
                        </div>
                        <form>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Proveedor</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Proveedor...'
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Usuario Responsable</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Usuario...'
                                    ></input>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Fecha de Compra</label>
                                    <input
                                    className='search-line'
                                    type='Date'
                                    placeholder='Fecha...'
                                    ></input>
                                </div>
                            </div>
                            <div className='form-buttons'>
                                <button className='cancel-button' onClick={()=>closeForm()}>Cancelar</button>
                                <button className='add-button'>Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReportesCompras;