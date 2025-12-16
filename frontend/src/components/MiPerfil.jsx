import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import "./MiPerfil.css";
import userIcon from "../images/UserIcon.png"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MiPerfil = () =>{

    const {id} = useParams();

    const [reset, setReset] = useState({
        id: 0,
        username: "",
        nombre_completo: "",
        rol_id: 1,
        email: "",
        estado: ""
    });

    const [perfil, setPerfil] = useState({
        id: 0,
        username: "",
        nombre_completo: "",
        rol_id: 1,
        email: "",
        estado: ""
    });

    useEffect(()=>{
        const initPerfil = async() =>{
            try{
                const response = await axiosInstance.get(`user/getUser/${id}`)
                console.log(response.data);
                setPerfil(response.data);
                setReset(response.data);
            }catch(error){
                console.log(error);
                toast.error("Error al coseguir usuario. ");
            }
        }

        initPerfil();
    }, [id])

    const handleChange = (event) =>{
        setPerfil({...perfil, [event.target.name]: event.target.value});
    }

    const editProfile = async() =>{
        if (
            perfil.username.trim() === "" ||
            perfil.nombre_completo.trim() === "" ||
            Number(perfil.rol_id) <= 0 ||
            perfil.estado.trim() === ""||
            perfil.email.trim()=== ""
        ){
            toast.error("Llenar todos los campos.");
            return;
        }
        try{
            const response = await axiosInstance.get('/user/getUsers');
            const users = response.data;
            const findusername = users.some(u => u.username === perfil.username && u.id !== perfil.id);
            const findemail = users.some(u => u.email === perfil.email && u.id !== perfil.id);
            if(findusername){
                toast.error("Este Nombre de usuario ya existe.");
                return;
            }else if(findemail){
                toast.error("Este Email ya esta en uso.");
                return;
            }
        }catch(error){
            console.log(error);
            toast.error("Error consiguiendo los usuarios.");
            return;
        }

        try{
            const response = await axiosInstance.put(`user/editUser/${perfil.id}`, {
                username: perfil.username,
                nombre_completo: perfil.nombre_completo,
                rol_id: 1,
                email: perfil.email,
                estado: perfil.estado
            });
            setPerfil(response.data);
            toast.success("Usuario editado con exito.");

        }catch(error){
            toast.error("Error al editar el usuarios.");
        }
    }

    return(
        <div className="perfil-container">
            <div className="header-perfil">
                <img
                src={userIcon}
                alt="user"
                style={{width: '100px', height: '100px' }}
                ></img>
                <h1>Mi Perfil</h1>
            </div>
            <div className="pefil-info-container">
                <div className='perfil-row'>
                    <div>
                        <label>Nombre de Usuario</label>
                        <input
                        className='search-line'
                        type='text'
                        placeholder={perfil.username}
                        name='username'
                        value={perfil.username}
                        onChange={handleChange}
                        ></input>
                    </div>
                    <div>
                        <label>Correo</label>
                        <input
                        className='search-line'
                        type='text'
                        placeholder={perfil.username}
                        name='email'
                        value={perfil.email}
                        onChange={handleChange}
                        ></input>
                    </div>
                </div>
                <div className='perfil-row'>
                    <div>
                        <label>Nombre Completo</label>
                        <input
                        className='search-line'
                        type='text'
                        placeholder={perfil.username}
                        name='nombre_completo'
                        value={perfil.nombre_completo}
                        onChange={handleChange}
                        ></input>
                    </div>
                    <div>
                        <label>Estado</label>
                        <select
                        name='estado'
                        value={perfil.estado}
                        onChange={handleChange}
                        >
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                </div>
                <div className='perfil-row'>
                    <div>
                        <label>Rol</label>
                        <label className="rol-label">{perfil.rol_id === 1 ? "Administrador" : "Empleado"}</label>
                    </div>
                </div>
            </div>
            <div className="perfil-buttons">
                <button className="reset-button" onClick={() => setPerfil(reset)}>Resetear</button>
                <button className="edit-button" onClick={() => editProfile()}>Editar</button>
            </div>
        </div>
    );
};

export default MiPerfil;