import './GestionProveedores.css';
import { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";

const GestionProveedores = () => {
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
    }, []);

    const openFormAdd = () => {
        setFormVisible(true);
        setAdd(true);
        setNewProvider({ nombre: "", telefono: "", direccion: "", estado: "activo" });
    };

    const openFormEdit = (provider) => {
        setFormVisible(true);
        setAdd(false);
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
            </svg>
        ),
        Delete: (props) => (
            <svg viewBox="0 0 24 24" className={"w-5 h-5 " + (props.className || "")}>
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
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Dirección</label>
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
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestionProveedores;
