import './GestionUsuarios.css';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const GestionUsuarios = () => {
    
    const [formVisible, setFormVisible] = useState(false);
    const [add, setAdd] = useState(false);
    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {   
        axiosInstance.get('user/getUsers')
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
        setUserToEdit(null);
    }

    const openFormEdit = (user) => {
        setFormVisible(true);
        setAdd(false);
        setUserToEdit(user);
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
                <h1>Gestion de Usuarios</h1>
                <button onClick={()=>openFormAdd()}>+ Agregar Usuario</button>
            </div>
            <div className='table-container'>
                <div className='body-scroll'>
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
                                        <div className='option-buttons'>
                                            <button className='options-add-button' onClick={()=>openFormEdit()}>
                                                <Icon.Add/></button>
                                            <button className='options-edit-button'>
                                                <Icon.Edit/></button>
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
                            <h2>{add ? "Agregar Usuario" : "Editar Usuario"}</h2>
                        </div>
                        <form>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Nombre</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder={add ? 'Nombre...' : userToEdit.nombre_completo.split(" ")[0]}
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Apellido</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder={add ? 'Apellido...' : userToEdit.nombre_completo.split(" ")[1]}
                                    ></input>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Nombre de usuario</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder={add ? 'usuario123...' : userToEdit.username}
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
                                    <select>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                                <div className='form-column-2'>
                                    <label>Estado</label>
                                    <select>
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
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