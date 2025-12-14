import { useEffect, useState } from "react";
import axios from "axios";
import "./ComprasReport.css";
import Navbar from "../nav/navbar.jsx";
import NavLinks from "../nav/NavLinks.jsx";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function ComprasReport() {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCompras() {
      try {
        const { data } = await axios.get(`${API_BASE}/compra/`);
        setCompras(Array.isArray(data) ? data : []);
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          err.message ||
          "No se pudieron cargar las compras";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchCompras();
  }, []);

  const rows = compras.map((compra) => {
    const id =
      compra.id ?? compra.compra_id ?? compra.id_compra ?? compra.ID ?? "—";
    const proveedorNombre = compra.proveedor?.nombre ?? "—";
    const proveedorId = compra.proveedor_id ?? "—";
    const usuarioNombre = compra.user?.nombre_completo ?? compra.user?.username ?? "—";
    const usuarioId = compra.user_id ?? "—";
    const fecha = compra.fecha
      ? new Date(compra.fecha).toLocaleString('es-HN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      : "—";
    const fechaCreacion = compra.fecha_creacion
      ? new Date(compra.fecha_creacion).toLocaleString('es-HN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      : "—";
    const fechaActualizacion = compra.actualizado_en
      ? new Date(compra.actualizado_en).toLocaleString('es-HN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      : "—";

    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{proveedorId}</td>
        <td>{proveedorNombre}</td>
        <td>{usuarioId}</td>
        <td>{usuarioNombre}</td>
        <td>{fecha}</td>
        <td>{fechaCreacion}</td>
        <td>{fechaActualizacion}</td>
        <td>{compra.estado ?? "—"}</td>
      </tr>
    );
  });

  return (
    <div className="app">
      <Navbar />
      <NavLinks />
      <main className="content">
        <section className="report-header">
          <h1>Reporte de Compras</h1>
        </section>

        <section className="table-card">
          {loading && <p>Cargando compras...</p>}
          {error && !loading && <p className="error">{error}</p>}
          {!loading && !error && (
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID Proveedor</th>
                  <th>Nombre del Proveedor</th>
                  <th>ID Usuario</th>
                  <th>Usuario Responsable</th>
                  <th>Fecha</th>
                  <th>Fecha de Creación</th>
                  <th>Fecha de Actualización</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows
                ) : (
                  <tr>
                    <td colSpan="9">No hay compras registradas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default ComprasReport;