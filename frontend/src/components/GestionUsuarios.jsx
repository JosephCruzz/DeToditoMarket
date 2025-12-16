import './GestionUsuarios.css';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from "react-toastify";

const GestionUsuarios = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [add, setAdd] = useState(false);
  const [users, setUsers] = useState([]);
  const [idUserToEdit, setIdUserToEdit] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",  
    nombre: "",  
    apellido: "",    
    rol_id: 0,
    email: "",
    estado: "activo"
  });
  
  // FILTROS
  const [searchText, setSearchText] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [filtroRol, setFiltroRol] = useState("TODOS");

  useEffect(() => {   
    axiosInstance.get('/user/getUsers')
      .then(response => setUsers(response.data))
      .catch(error => console.error('There was an error!', error));
  }, []);

  const filtrarUsuarios = () => {
    return users.filter(u => {
      const matchName =
        u.nombre_completo.toLowerCase().includes(searchText.toLowerCase()) ||
        u.username.toLowerCase().includes(searchText.toLowerCase());

      const matchEstado =
        filtroEstado === "TODOS" || u.estado.toLowerCase() === filtroEstado.toLowerCase();

      const rolNombre = u.rol_id === 1 ? "Administrador" : "Empleado";
      const matchRol =
        filtroRol === "TODOS" || rolNombre.toLowerCase() === filtroRol.toLowerCase();

      return matchName && matchEstado && matchRol;
    });
  };

  const openFormAdd = () => {
    setFormVisible(true);
    setAdd(true);
    setNewUser({
      username: "",
      password: "",  
      nombre: "",  
      apellido: "",    
      rol_id: 0,
      email: "",
      estado: "activo"
    });
  };

  const openFormEdit = (user) => {
    setFormVisible(true);
    setAdd(false);
    setIdUserToEdit(user.id);
    const partes_nombre = user.nombre_completo.trim().split(" ");
    const n = partes_nombre.shift();
    const a = partes_nombre.join(" ");
    setNewUser({
      username: user.username,
      password: "",
      nombre: n,    
      apellido: a,
      rol_id: user.rol_id,
      email: user.email,
      estado: user.estado === "Anulado" ? "Activo" : user.estado
    });
  };

  const closeForm = () => {
    setFormVisible(false);
    setAdd(false);
  };

  const handleChange = (event) =>{
      const {name, value} = event.target;
      setNewUser({...newUser, [name]: name === "rol_id" ? Number(value): value});
  };

  const handleForm = async (event) => {
    event.preventDefault();

    try {
      if (
        newUser.username.trim() === "" ||
        newUser.nombre.trim() === "" ||
        newUser.apellido.trim() === "" ||
        Number(newUser.rol_id) <= 0 ||
        newUser.estado.trim() === ""||
        newUser.email.trim()=== ""
      ){
        toast.error("Llenar todos los campos.");
        return;
      }

      const findusername = users.some(u => u.username === newUser.username && u.id !== idUserToEdit);
      const findemail = users.some(u => u.email === newUser.email && u.id !== idUserToEdit);
      if(findusername){
          toast.error("Este Nombre de usuario ya existe.");
          return;
      }else if(findemail){
          toast.error("Este Email ya esta en uso.");
          return;
      }

      const nombre_completo = `${newUser.nombre} ${newUser.apellido}`;

      if (add) {
        if (newUser.password.trim() === "") return;

        await axiosInstance.post("/user/addUser", {
          username: newUser.username,
          password: newUser.password,
          nombre_completo,
          rol_id: Number(newUser.rol_id),
          email: newUser.email,
          estado: newUser.estado
        });
        toast.success("Usuario agregado con exito.");
      } else {
        await axiosInstance.put(`/user/editUser/${idUserToEdit}`, {
          username: newUser.username,
          nombre_completo,
          rol_id: Number(newUser.rol_id),
          email: newUser.email,
          estado: newUser.estado
        });
        toast.success("Usuario editado con exito.");
      }

      const response = await axiosInstance.get("/user/getUsers");
      setUsers(response.data);
      setFormVisible(false);
    } catch (error) {
      console.error("Error en handleForm:", error);
    }
  };

  const deleteUser = async(id) => {
    try {
      if(!id){
        toast.error("Id requerida.");
        return;
      }
      const confirm = window.confirm(`¿Desea anular este usuario?`);
      if (!confirm) return; 
      await axiosInstance.put(`/user/deleteUser/${id}`,{
          estado: "Anulado"
      });
      const response = await axiosInstance.get(`user/getUsers`);
      setUsers(response.data);
      toast.success("Usuario anulado con exito.");
    } catch(error) {
      console.log(error);
      toast.error("Error al anular usuario.");
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
    <div className='reportes-outer'>
      <div className='reportes-card'>
        <div className='actions-bar'>
          <h1 className='reportes-title'>Gestión de Usuarios</h1>
          <button className='btn-add-venta' onClick={openFormAdd}>
            + Agregar Usuario
          </button>
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
            <select value={filtroRol} onChange={e => setFiltroRol(e.target.value)}>
              <option value="TODOS">Todos</option>
              <option value="Administrador">Administrador</option>
              <option value="Empleado">Empleado</option>
            </select>
          </div>

          <div className="filter-group">
            <button
              className="btn-gray"
              onClick={() => { setSearchText(""); setFiltroEstado("TODOS"); setFiltroRol("TODOS"); }}
            >
              Resetear Filtros
            </button>
          </div>
        </div>

        {/* TABLA */}
        <div className='tabla-wrapper'>
          <table className='ventas-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Actualización</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrarUsuarios().map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.nombre_completo}</td>
                  <td>{user.email}</td>
                  <td>{user.rol_id === 1 ? "Administrador" : "Empleado"}</td>
                  <td>{user.estado.charAt(0).toUpperCase() + user.estado.slice(1)}</td>
                  <td>{new Date(user.actualizado_en).toLocaleString()}</td>
                  <td>
                    <button onClick={() => openFormEdit(user)} className="options.edit-button">
                      <Icon.Edit />
                    </button>
                    <button onClick={() => deleteUser(user.id)} className="options.delete-button">
                      <Icon.Delete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL FORMULARIO */}
        {formVisible && (
        <div className='modal-overlay'>
            <form className='add-form' onSubmit={handleForm}>
            <div className='form-header'>
                <h2>{add ? "Agregar Usuario" : "Editar Usuario"}</h2>
            </div>

            <div className='form-row'>
                <div className='form-column-1'>
                <label>Nombre</label>
                <input
                    type='text'
                    name='nombre'
                    value={newUser.nombre}
                    onChange={handleChange}
                    placeholder='Nombre...'
                />
                </div>
                <div className='form-column-2'>
                <label>Apellido</label>
                <input
                    type='text'
                    name='apellido'
                    value={newUser.apellido}
                    onChange={handleChange}
                    placeholder='Apellido...'
                />
                </div>
            </div>

            <div className='form-row'>
                <div className='form-column-1'>
                <label>Usuario</label>
                <input
                    type='text'
                    name='username'
                    value={newUser.username}
                    onChange={handleChange}
                    placeholder='usuario123...'
                />
                </div>
                <div className='form-column-2'>
                <label>Rol</label>
                <select name='rol_id' value={newUser.rol_id} onChange={handleChange}>
                    <option value={0}>Selecciona un rol</option>
                    <option value={1}>Administrador</option>
                    <option value={2}>Empleado</option>
                </select>
                </div>
            </div>

            <div className='form-row'>
                {add && (
                <div className='form-column-1'>
                    <label>Contraseña</label>
                    <input
                    type='text'
                    name='password'
                    value={newUser.password}
                    onChange={handleChange}
                    placeholder='***'
                    />
                </div>
                )}
                <div className={add ? 'form-column-2' : 'form-column-1'}>
                <label>Estado</label>
                <select name='estado' value={newUser.estado} onChange={handleChange}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Anulado">Anulado</option>
                </select>
                </div>
            </div>

            <div className='form-row'>
                <div className='form-column-1'>
                    <label>Email</label>
                    <input
                    className='search-line'
                    type='text'
                    placeholder={add ? 'Email...' : newUser.email}
                    name='email'
                    value={newUser.email}
                    onChange={handleChange}
                    />
                </div>
            </div>

            <div className='form-buttons'>
                <button type='button' className='cancel-button' onClick={closeForm}>
                  Cancelar
                </button>
                <button type='submit' className='add-button'>
                  {add ? "Agregar" : "Editar"}
                </button>
            </div>
            </form>
        </div>
        )}
      </div>
    </div>
  );
};

export default GestionUsuarios;