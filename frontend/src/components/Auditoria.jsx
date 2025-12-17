import './Auditoria.css';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const Auditoria = () => {
<<<<<<< HEAD
    
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
=======
    const [auditorias, setAuditorias] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {   
        fetchAuditorias();
    }, []);

    const fetchAuditorias = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/audit/');
            setAuditorias(response.data || []);
        } catch (error) {
            console.error('Error fetching auditorias:', error);
        }
        setLoading(false);
    };

    return (
        <div className="reportes-outer">
            <div className="reportes-card">
                <h1 className="reportes-title">Auditoría</h1>

                <div className="tabla-wrapper">
                    {loading ? (
                        <div className="spinner">Cargando...</div>
                    ) : (
                        <table className="ventas-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Usuario</th>
                                    <th>Producto</th>
                                    <th>Acción</th>
                                    <th>Descripción</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditorias.map(audit => (
                                <tr key={audit.id}>
                                    <td>{audit.id}</td>
                                    <td>{audit.usuario?.nombre_completo || audit.user_id}</td>
                                    <td>{audit.producto?.nombre || audit.producto_id}</td>
                                    <td>{audit.entrada_salida}</td>
                                    <td>{audit.descripcion || "N/A"}</td>
                                    <td>{audit.fecha || "N/A"}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auditoria;
>>>>>>> develop
