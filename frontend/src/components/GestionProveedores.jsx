import './GestionProveedores.css';
import { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

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

     // FILTROS
    const [searchText, setSearchText] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("TODOS");

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
        setNewProvider({ ...provider,
            estado: provider.estado === "Anulado" ? "Activo" : provider.estado
        });
    };

    const closeForm = () => setFormVisible(false);

    const handleChange = (e) => {
        setNewProvider({ ...newProvider, [e.target.name]: e.target.value });
    };

    const handleForm = async (e) => {
        e.preventDefault();
        if (!newProvider.nombre || !newProvider.telefono || !newProvider.direccion || !newProvider.estado){
            toast.error("Llenar todos los campos.");
            return;
        }

        try {
            if (add) {
                await axiosInstance.post(`proveedor/addSupplier`, { ...newProvider });
                toast.success("Proveedor agregado con exito.");
            } else {
                await axiosInstance.put(`proveedor/editSupplier/${idProviderToEdit}`, { ...newProvider });
                toast.success("Proveedor editado con exito.");
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
            if(!id){
                toast.error("Id requerida.");
                return;
            }
            const confirm = window.confirm(`¿Desea anular este proveedor?`);
            if (!confirm) return;
            await axiosInstance.put(`proveedor/deleteSupplier/${id}`,{
                estado: "Anulado"
            });
            const res = await axiosInstance.get(`proveedor/getSuppliers`);
            setProviders(res.data);
            toast.success("Provedor anulado con exito");
        } catch (error) {
            console.error(error);
            toast.error("Error al anulado proveedor.");
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

    const filtrarProveedores = () => {
        return providers.filter(p => {
        const matchName = p.nombre.toLowerCase().includes(searchText.toLowerCase());
        const matchEstado = filtroEstado === "TODOS" || p.estado.toLowerCase() === filtroEstado.toLowerCase();

        return matchName && matchEstado;
        });
    };

    return (
        <div className='reportes-outer'>
            <div className='reportes-card'>
            <div className='actions-bar'>
                <h1 className='reportes-title'>Gestión de Proveedores</h1>
                <button className='btn-add-venta' onClick={openFormAdd}>+ Agregar Proveedor</button>
            </div>

            {/* BARRA DE FILTROS */}
        <div className="filter-bar">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Buscar por nombre o usuario..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
              <option value="TODOS">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Anulado">Anulado</option>
            </select>
          </div>

          <div className="filter-group">
            <button
              className="btn-gray"
              onClick={() => { setSearchText(""); setFiltroEstado("TODOS"); }}
            >
              Resetear Filtros
            </button>
          </div>
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
                        {filtrarProveedores().map(proveedor => (
                            <tr key={proveedor.id}>
                                <td>{proveedor.id}</td>
                                <td>{proveedor.nombre}</td>
                                <td>{proveedor.telefono}</td>
                                <td>{proveedor.direccion}</td>
                                <td>{proveedor.estado.charAt(0).toUpperCase() + proveedor.estado.slice(1)}</td>
                                <td>
                                    <div className='left-actions'>
                                        <button onClick={() => openFormEdit(proveedor)}><Icon.Edit/></button>
                                        <button onClick={() => deleteProvider(proveedor.id)}><Icon.Delete/></button>
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
        </div>
    );
};

export default GestionProveedores;
