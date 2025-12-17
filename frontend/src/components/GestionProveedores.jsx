import './GestionProveedores.css';
import { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";

const GestionProveedores = () => {
<<<<<<< HEAD

    const [formVisible, setFormVisible] = useState(false);
    const [add, setAdd] = useState(false);
    const [providers, setProviders] = useState([]);
    const [providerToEdit, setProviderToEdit] = useState(null);

    useEffect(() => {   
        axiosInstance.get('proveedor/getSuppliers')
        .then(response => {
            setProviders(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });     
=======
    const [formVisible, setFormVisible] = useState(false);
    const [add, setAdd] = useState(false);
    const [providers, setProviders] = useState([]);
    const [idProviderToEdit, setIdProviderToEdit] = useState(0);
    const [newProvider, setNewProvider] = useState({
        nombre: "",
        telefono: "",
        direccion: "",
        estado: "activo"
    });

    useEffect(() => {   
        axiosInstance.get('proveedor/getSuppliers')
        .then(response => setProviders(response.data))
        .catch(error => console.error(error));     
>>>>>>> develop
    }, []);

    const openFormAdd = () => {
        setFormVisible(true);
        setAdd(true);
<<<<<<< HEAD
    }
=======
        setNewProvider({ nombre: "", telefono: "", direccion: "", estado: "activo" });
    };
>>>>>>> develop

    const openFormEdit = (provider) => {
        setFormVisible(true);
        setAdd(false);
<<<<<<< HEAD
        setProviderToEdit(provider);
    }

    const closeForm = () => {
        setFormVisible(false);
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
=======
        setIdProviderToEdit(provider.id);
        setNewProvider({ ...provider });
    };

    const closeForm = () => setFormVisible(false);

    const handleChange = (e) => {
        setNewProvider({ ...newProvider, [e.target.name]: e.target.value });
    };

    const handleForm = async (e) => {
        e.preventDefault();
        if (!newProvider.nombre || !newProvider.telefono || !newProvider.direccion || !newProvider.estado) return;

        try {
            if (add) {
                await axiosInstance.post(`proveedor/addSupplier`, { ...newProvider });
            } else {
                await axiosInstance.put(`proveedor/editSupplier/${idProviderToEdit}`, { ...newProvider });
            }
            const res = await axiosInstance.get(`proveedor/getSuppliers`);
            setProviders(res.data);
            setFormVisible(false);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProvider = async (id) => {
        try {
            await axiosInstance.delete(`proveedor/deleteSupplier/${id}`);
            const res = await axiosInstance.get(`proveedor/getSuppliers`);
            setProviders(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const Icon = {
        Edit: (props) => (
            <svg viewBox="0 0 24 24" className={"w-5 h-5 " + (props.className || "")}>
                <path d="M4 20h4l10-10-4-4L4 16v4zM14 6l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
>>>>>>> develop
            </svg>
        ),
        Delete: (props) => (
            <svg viewBox="0 0 24 24" className={"w-5 h-5 " + (props.className || "")}>
<<<<<<< HEAD
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
                <h1>Gestion de Proveedores</h1>
                <button onClick={()=>openFormAdd()}>+ Agregar Proveedor</button>
            </div>
            <div className='table-container'>
                <div className='body-scroll'>
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
                        <tbody>
                            {providers.map((provider)=>(
                                <tr>
                                    <td className='table-body'>{provider.id}</td>
                                    <td className='table-body'>{provider.nombre}</td>
                                    <td className='table-body'>{provider.telefono}</td>
                                    <td className='table-body'>{provider.direccion}</td>
                                    <td className='table-body'>{provider.estado}</td>
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
                             <h2>{add ? "Agregar Proveedor" : "Editar Proveedor"}</h2>
                        </div>
                        <form>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Nombre del Proveedor</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder={add ? 'Proveedor...' : providerToEdit.nombre}
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Teléfono</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder={add ? 'Teléfono...' : providerToEdit.telefono}
                                    ></input>
=======
                <path d="M6 7h12M9 7V5h6v2m-8 0 1 12h8l1-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
        )
    };

    return (
        <div className='gestion-container'>
            <div className='title-header'>
                <h1>Gestión de Proveedores</h1>
                <button className='btn-add-venta' onClick={openFormAdd}>+ Agregar Proveedor</button>
            </div>

            <div className='table-container'>
                <table className='ventas-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {providers.map((provider) => (
                            <tr key={provider.id}>
                                <td>{provider.id}</td>
                                <td>{provider.nombre}</td>
                                <td>{provider.telefono}</td>
                                <td>{provider.direccion}</td>
                                <td>{provider.estado}</td>
                                <td>
                                    <div className='left-actions'>
                                        <button onClick={() => openFormEdit(provider)}><Icon.Edit/></button>
                                        <button onClick={() => deleteProvider(provider.id)}><Icon.Delete/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {formVisible && (
                <div className='modal-overlay'>
                    <div className='add-form'>
                        <div className='form-header'>
                            <h2>{add ? "Agregar Proveedor" : "Editar Proveedor"}</h2>
                        </div>
                        <form onSubmit={handleForm}>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Nombre</label>
                                    <input type='text' name='nombre' value={newProvider.nombre} onChange={handleChange} placeholder='Nombre...' />
                                </div>
                                <div className='form-column-2'>
                                    <label>Teléfono</label>
                                    <input type='text' name='telefono' value={newProvider.telefono} onChange={handleChange} placeholder='Teléfono...' />
>>>>>>> develop
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Dirección</label>
<<<<<<< HEAD
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder={add ? 'Dirección...' : providerToEdit.direccion}
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Estado</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder={add ? 'Estado...' : providerToEdit.estado}
                                    ></input>
                                </div>
                            </div>
                            <div className='form-buttons'>
                                <button className='cancel-button' onClick={()=>closeForm()}>Cancelar</button>
                                <button className='add-button'>Agregar</button>
=======
                                    <input type='text' name='direccion' value={newProvider.direccion} onChange={handleChange} placeholder='Dirección...' />
                                </div>
                                <div className='form-column-2'>
                                    <label>Estado</label>
                                    <select name='estado' value={newProvider.estado} onChange={handleChange}>
                                        <option value="activo">Activo</option>
                                        <option value="inactivo">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                            <div className='form-buttons'>
                                <button type='button' className='cancel-button' onClick={closeForm}>Cancelar</button>
                                <button type='submit' className='add-button'>{add ? "Agregar" : "Editar"}</button>
>>>>>>> develop
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
<<<<<<< HEAD
    )
}

export default GestionProveedores;
=======
    );
};

export default GestionProveedores;
>>>>>>> develop
