import './Auditoria.css';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from "react-toastify";

const Auditoria = () => {
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
<<<<<<< HEAD
=======
            toast.error("Error al conseguir auditorias.");
>>>>>>> b2066ca774c1c4978cd3b74c5045aa867b7aa76f
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
<<<<<<< HEAD
                                    <th>Fecha</th>
=======
>>>>>>> b2066ca774c1c4978cd3b74c5045aa867b7aa76f
                                </tr>
                            </thead>
                            <tbody>
                                {auditorias.map(audit => (
                                <tr key={audit.id}>
                                    <td>{audit.id}</td>
                                    <td>{audit.usuario?.nombre_completo || audit.user_id}</td>
                                    <td>{audit.producto?.nombre || audit.producto_id}</td>
                                    <td>{audit.entrada_salida}</td>
<<<<<<< HEAD
                                    <td>{audit.descripcion || "N/A"}</td>
                                    <td>{audit.fecha || "N/A"}</td>
=======
                                    <td>{audit.descripcion}</td>
>>>>>>> b2066ca774c1c4978cd3b74c5045aa867b7aa76f
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
