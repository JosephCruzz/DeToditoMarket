import './GestionProveedores.css';
import { useState, useEffect } from 'react';

const GestionProveedores = () => {

    const [formVisible, setFormVisible] = useState(false);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [providers, setProviders] = useState([]);

    useEffect(() => {   
        axiosInstance.get('/providers')
        .then(response => {
            setProviders(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });     
    }, []);

    const openFormAdd = () => {
        setFormVisible(true);
        setAdd(true);
    }

    const openFormEdit = () => {
        setFormVisible(true);
        setEdit(true);
    }

    const closeForm = () => {
        setFormVisible(false);
        setAdd(true);
        setEdit(false);
    }
    
    return(
        <div className='gestion-container'>
            <div className='title-header'>
                <h1>Gestion de Proveedores</h1>
                <button onClick={()=>openFormAdd()}>+ Agregar Proveedor</button>
            </div>
            <div className='table-container'>
                <table className='table-productos'>
                    <thead>
                        <tr>
                            <th>ID del Proveedor</th>
                            <th>Nombre del proveedor</th>
                            <th>Dirección</th>
                            <th>Telefono</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <div className='body-scroll'>
                        <tbody>
                            {providers.map((provider)=>(
                                <tr>
                                    <td className='table-body'>{provider.id}</td>
                                    <td className='table-body'>{provider.nombre}</td>
                                    <td className='table-body'>{provider.telefono}</td>
                                    <td className='table-body'>{provider.direccion}</td>
                                    <td className='table-body'>{provider.estado}</td>
                                    <td className='table-body'>
                                        <div>
                                            <button className='options-button' onClick={()=>openFormEdit()}></button>
                                            <button className='options-button'></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </div>
                </table>
            </div>
            {/*FORM PARA AGREGAR*/}
            {formVisible &&(
                <div className='modal-overlay'>
                    <div className='add-form'>
                        <div className='form-header'>
                            <h2>Agregar Producto</h2>
                        </div>
                        <form>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Nombre del Proveedor</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Proveedor...'
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Teléfono</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='1234-5678'
                                    ></input>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Dirección</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Producto...'
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Estado</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Estado'
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

export default GestionProveedores;