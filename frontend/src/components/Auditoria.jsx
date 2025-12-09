import './Auditoria.css';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const Auditoria = () => {
    
    const [auditorias, setauditorias] = useState([]);

    useEffect(() => {   
        axiosInstance.get('audit/')
        .then(response => {
            setauditorias(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });     
    }, []);

    return(
        <div className='gestion-container'>
            <div className='title-header'>
                <h1>Auditoria</h1>
            </div>
            <div className='table-container'>
                <div className='body-scroll'>
                    <table className='table-productos'>
                        <thead>
                            <tr>
                                <th>ID de Auditoria</th>
                                <th>Usuario Responsable</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auditorias.map((audit)=>(
                                <tr>
                                    <td className='table-body'>{audit.id}</td>
                                    <td className='table-body'>{audit.user_id}</td>
                                    <td className='table-body'>{audit.producto_id}</td>
                                    <td className='table-body'>{audit.cantidad}</td>
                                    <td className='table-body'>{audit.fecha }</td>
                                    <td className='table-body'>{audit.entrada_salida}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Auditoria;