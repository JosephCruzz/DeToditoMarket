import './GestionUsuarios.css';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

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
    rol_id: "",
    estado: "activo"
  });

  useEffect(() => {   
    axiosInstance.get('/user/getUsers')
      .then(response => setUsers(response.data))
      .catch(error => console.error('There was an error!', error));
  }, []);

  const openFormAdd = () => {
    setFormVisible(true);
    setAdd(true);
    setNewUser({
      username: "",
      password: "",  
      nombre: "",  
      apellido: "",    
      rol_id: "",
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
      estado: user.estado
    });
  };

  const closeForm = () => {
    setFormVisible(false);
    setAdd(false);
  };

  const handleChange = (event) => {
    setNewUser({...newUser, [event.target.name]: event.target.value});
  };

const handleForm = async (event) => {
  event.preventDefault();

  try {
    if (
      newUser.username.trim() === "" ||
      newUser.nombre.trim() === "" ||
      newUser.apellido.trim() === "" ||
      Number(newUser.rol_id) <= 0 ||
      newUser.estado.trim() === ""
    )
      return;

    const nombre_completo = `${newUser.nombre} ${newUser.apellido}`;

    if (add) {
      if (newUser.password.trim() === "") return;

      await axiosInstance.post("/user/addUser", {
        username: newUser.username,
        password: newUser.password,
        nombre_completo,
        rol_id: Number(newUser.rol_id),
        estado: newUser.estado,
      });
    } else {
      await axiosInstance.put(`/user/editUser/${idUserToEdit}`, {
        username: newUser.username,
        nombre_completo,
        rol_id: Number(newUser.rol_id),
        estado: newUser.estado,
      });
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
      await axiosInstance.delete(`/user/deleteUser/${id}`);
      const response = await axiosInstance.get(`user/getUsers`);
      setUsers(response.data);
    } catch(error) {
      console.log(error);
    }
  };

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

        <div className='tabla-wrapper'>
          <table className='ventas-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Nombre Completo</th>
                <th>Rol</th>
                <th>Actualización</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.nombre_completo}</td>
                  <td>{user.rol_id}</td>
                  <td>{user.estado}</td>
                  <td>{new Date(user.actualizado_en).toLocaleString('es-HN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  })}</td>
                  <td>
                    <div className='left-actions'>
                      <button onClick={() => openFormEdit(user)}><Icon.Edit /></button>
                      <button onClick={() => deleteUser(user.id)}><Icon.Delete /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
                    <option value='activo'>Activo</option>
                    <option value='inactivo'>Inactivo</option>
                </select>
                </div>
            </div>

            <div className='form-buttons'>
                <button
                type='button'
                className='cancel-button'
                onClick={closeForm}
                >
                Cancelar
                </button>
                <button
                type='submit'
                className='add-button'
                >
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
