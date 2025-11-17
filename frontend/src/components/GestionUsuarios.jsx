import './GestionUsuarios.css';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const GestionUsuarios = () => {
    
    const [formVisible, setFormVisible] = useState(false);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {   
        axiosInstance.get('/users')
        .then(response => {
            setUsers(response.data);
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
                <h1>Gestion de Usuarios</h1>
                <button onClick={()=>openFormAdd()}>+ Agregar Usuario</button>
            </div>
            <div className='table-container'>
                <table className='table-productos'>
                    <thead>
                        <tr>
                            <th>ID del Usuario</th>
                            <th>Nombre de usuario</th>
                            <th>Nombre Completo</th>
                            <th>Rol</th>
                            <th>Fecha de actualización</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <div className='body-scroll'>
                        <tbody>
                            {users.map((user)=>(
                                <tr>
                                    <td className='table-body'>{user.id}</td>
                                    <td className='table-body'>{user.username}</td>
                                    <td className='table-body'>{user.nombre_completo}</td>
                                    <td className='table-body'>{user.rol_id}</td>
                                    <td className='table-body'>{user.actualización }</td>
                                    <td className='table-body'>{user.estado}</td>
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
                                    <label>Nombre</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Nombre...'
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Apellido</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Apellido...'
                                    ></input>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Nombre de usuario</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='usuario123...'
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Contraseña</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='***'
                                    ></input>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Rol</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Rol'
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

export default GestionUsuarios;