<<<<<<< HEAD
import "./ReportesCompras.css";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
=======
<<<<<<< HEAD
import './ReportesCompras.css';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
>>>>>>> develop

const ReportesCompras = () => {
  const [compras, setCompras] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);

  // FILTROS
  const [searchText, setSearchText] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // MODAL
  const [showAgregarCompra, setShowAgregarCompra] = useState(false);
  const [proveedorCompra, setProveedorCompra] = useState({ id: "", nombre: "", mostrarDropdown: false });
  const [productosCompra, setProductosCompra] = useState([]);

  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null); 


  // FETCH
  useEffect(() => {
    fetchCompras();
    fetchProveedores();
    fetchProductos();
  }, []);

  const fetchCompras = async () => {
    try {
      const res = await axiosInstance.get("/compra/");
      setCompras(res.data || []);
    } catch (err) {
      console.error("Error compras:", err);
    }
  };

  const fetchProveedores = async () => {
    try {
      const res = await axiosInstance.get("/proveedor/getSuppliers");
      setProveedores(res.data || []);
    } catch (err) {
      console.error("Error proveedores:", err);
    }
  };

  const fetchProductos = async () => {
    try {
      const res = await axiosInstance.get("/producto/getInventory");
      setProductosDisponibles(res.data || []);
    } catch (err) {
      console.error("Error productos:", err);
    }
  };

  // FILTROS
  const comprasFiltradas = compras.filter((c) => {
    const fecha = new Date(c.fecha_creacion);
    const search = searchText.toLowerCase();

    const matchText =
      c.id.toString().includes(search) ||
      c.proveedor?.nombre?.toLowerCase().includes(search) ||
      c.user?.nombre_completo?.toLowerCase().includes(search);

    let matchEstado = true;
    if (filtroEstado !== "TODOS") {
      matchEstado = c.estado?.toLowerCase() === filtroEstado.toLowerCase();
    }

    const matchFechaInicio = !fechaInicio || fecha >= new Date(fechaInicio);
    const matchFechaFin = !fechaFin || fecha <= new Date(fechaFin);

    return matchText && matchEstado && matchFechaInicio && matchFechaFin;
  });

  const resetearFiltros = () => {
    setSearchText("");
    setFiltroEstado("TODOS");
    setFechaInicio("");
    setFechaFin("");
  };

  // MODAL
  const abrirModal = () => {
    setShowAgregarCompra(true);
    setProveedorCompra({ id: "", nombre: "", mostrarDropdown: false });
    setProductosCompra([]);
  };

  const cerrarModal = () => setShowAgregarCompra(false);

  const agregarProducto = () => {
    setProductosCompra([
      ...productosCompra,
      { productoId: "", nombreProducto: "", cantidad: 1, precioUnitario: 0, mostrarDropdown: false },
    ]);
  };

  const seleccionarProducto = (idx, prod) => {
    const copia = [...productosCompra];
    copia[idx] = {
      ...copia[idx],
      productoId: prod.id,
      nombreProducto: prod.nombre,
      precioUnitario: Number(prod.precio) || 0,
      mostrarDropdown: false,
    };
    setProductosCompra(copia);
  };

  const actualizarProducto = (idx, field, value) => {
    const copia = [...productosCompra];
    copia[idx][field] =
      field === "cantidad" || field === "precioUnitario" ? Number(value) : value;
    setProductosCompra(copia);
  };

  const eliminarProducto = (idx) => {
    setProductosCompra(productosCompra.filter((_, i) => i !== idx));
  };

  const seleccionarProveedor = (p) => {
    setProveedorCompra({ id: p.id, nombre: p.nombre, mostrarDropdown: false });
  };

  const totalCompra = productosCompra.reduce(
    (acc, p) => acc + p.cantidad * p.precioUnitario,
    0
  );

  const guardarCompra = async () => {
    if (!proveedorCompra.id || productosCompra.length === 0) {
      alert("Seleccione proveedor y productos");
      return;
    }

    try {
      // Crear compra
      const compraRes = await axiosInstance.post("/compra/crear", {
        proveedor_id: proveedorCompra.id,
        user_id: 1,
      });
      const compra = compraRes.data;

      // Crear detalle de compra
      await axiosInstance.post(
        "/detalleCompra/bulk",
        productosCompra.map((p) => ({
          compra_id: compra.id,
          producto_id: p.productoId,
          cantidad: p.cantidad,
          precio_unitario: p.precioUnitario,
        }))
      );

      cerrarModal();
      fetchCompras();
    } catch (err) {
      console.error("Error guardar compra:", err);
      alert("Error al guardar la compra");
    }
  };

  return (
    <div className="reportes-outer">
      <div className="reportes-card">
        <h1 className="reportes-title">Reporte de Compras</h1>

        {/* FILTROS Y BOTON DE AGREGAR COMPRA */}
        <div className="filter-bar real-filters">
          <div className="filter-group">
            <label>Desde:</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="input-fecha"
            />
          </div>
          <div className="filter-group">
            <label>Hasta:</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="input-fecha"
            />
          </div>
          <div className="filter-group">
            <label>Estado:</label>
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="TODOS">Todos</option>
              <option value="activo">Activo</option>
              <option value="anulado">Anulado</option>
            </select>
          </div>
          <button
            className="btn-gray"
            onClick={() => {
              setFechaInicio("");
              setFechaFin("");
              setFiltroEstado("TODOS");
              setSearchText("");
            }}
          >
            Resetear Filtros
          </button>
          <button className="btn-add-venta" onClick={abrirModal}>
            + Agregar Compra
          </button>
        </div>

<<<<<<< HEAD
=======
export default ReportesCompras;
=======
import "./ReportesCompras.css";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ReportesCompras = () => {
  const [compras, setCompras] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);

  // FILTROS
  const [searchText, setSearchText] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // MODAL
  const [showAgregarCompra, setShowAgregarCompra] = useState(false);
  const [proveedorCompra, setProveedorCompra] = useState({ id: "", nombre: "", mostrarDropdown: false });
  const [productosCompra, setProductosCompra] = useState([]);

  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null); 


  // FETCH
  useEffect(() => {
    fetchCompras();
    fetchProveedores();
    fetchProductos();
  }, []);

  const fetchCompras = async () => {
    try {
      const res = await axiosInstance.get("/compra/");
      setCompras(res.data || []);
    } catch (err) {
      console.error("Error compras:", err);
    }
  };

  const fetchProveedores = async () => {
    try {
      const res = await axiosInstance.get("/proveedor/getSuppliers");
      setProveedores(res.data || []);
    } catch (err) {
      console.error("Error proveedores:", err);
    }
  };

  const fetchProductos = async () => {
    try {
      const res = await axiosInstance.get("/producto/getInventory");
      setProductosDisponibles(res.data || []);
    } catch (err) {
      console.error("Error productos:", err);
    }
  };

  // FILTROS
  const comprasFiltradas = compras.filter((c) => {
    const fecha = new Date(c.fecha_creacion);
    const search = searchText.toLowerCase();

    const matchText =
      c.id.toString().includes(search) ||
      c.proveedor?.nombre?.toLowerCase().includes(search) ||
      c.user?.nombre_completo?.toLowerCase().includes(search);

    let matchEstado = true;
    if (filtroEstado !== "TODOS") {
      matchEstado = c.estado?.toLowerCase() === filtroEstado.toLowerCase();
    }

    const matchFechaInicio = !fechaInicio || fecha >= new Date(fechaInicio);
    const matchFechaFin = !fechaFin || fecha <= new Date(fechaFin);

    return matchText && matchEstado && matchFechaInicio && matchFechaFin;
  });

  const resetearFiltros = () => {
    setSearchText("");
    setFiltroEstado("TODOS");
    setFechaInicio("");
    setFechaFin("");
  };

  // MODAL
  const abrirModal = () => {
    setShowAgregarCompra(true);
    setProveedorCompra({ id: "", nombre: "", mostrarDropdown: false });
    setProductosCompra([]);
  };

  const cerrarModal = () => setShowAgregarCompra(false);

  const agregarProducto = () => {
    setProductosCompra([
      ...productosCompra,
      { productoId: "", nombreProducto: "", cantidad: 1, precioUnitario: 0, mostrarDropdown: false },
    ]);
  };

  const seleccionarProducto = (idx, prod) => {
    const copia = [...productosCompra];
    copia[idx] = {
      ...copia[idx],
      productoId: prod.id,
      nombreProducto: prod.nombre,
      precioUnitario: Number(prod.precio) || 0,
      mostrarDropdown: false,
    };
    setProductosCompra(copia);
  };

  const actualizarProducto = (idx, field, value) => {
    const copia = [...productosCompra];
    copia[idx][field] =
      field === "cantidad" || field === "precioUnitario" ? Number(value) : value;
    setProductosCompra(copia);
  };

  const eliminarProducto = (idx) => {
    setProductosCompra(productosCompra.filter((_, i) => i !== idx));
  };

  const seleccionarProveedor = (p) => {
    setProveedorCompra({ id: p.id, nombre: p.nombre, mostrarDropdown: false });
  };

  const totalCompra = productosCompra.reduce(
    (acc, p) => acc + p.cantidad * p.precioUnitario,
    0
  );

  const guardarCompra = async () => {
    if (!proveedorCompra.id || productosCompra.length === 0) {
      alert("Seleccione proveedor y productos");
      return;
    }

    try {
      // Crear compra
      const compraRes = await axiosInstance.post("/compra/crear", {
        proveedor_id: proveedorCompra.id,
        user_id: 1,
      });
      const compra = compraRes.data;

      // Crear detalle de compra
      await axiosInstance.post(
        "/detalleCompra/bulk",
        productosCompra.map((p) => ({
          compra_id: compra.id,
          producto_id: p.productoId,
          cantidad: p.cantidad,
          precio_unitario: p.precioUnitario,
        }))
      );

      cerrarModal();
      fetchCompras();
    } catch (err) {
      console.error("Error guardar compra:", err);
      alert("Error al guardar la compra");
    }
  };

  return (
    <div className="reportes-outer">
      <div className="reportes-card">
        <h1 className="reportes-title">Reporte de Compras</h1>

        {/* FILTROS Y BOTON DE AGREGAR COMPRA */}
        <div className="filter-bar real-filters">
          <div className="filter-group">
            <label>Desde:</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="input-fecha"
            />
          </div>
          <div className="filter-group">
            <label>Hasta:</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="input-fecha"
            />
          </div>
          <div className="filter-group">
            <label>Estado:</label>
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="TODOS">Todos</option>
              <option value="activo">Activo</option>
              <option value="anulado">Anulado</option>
            </select>
          </div>
          <button
            className="btn-gray"
            onClick={() => {
              setFechaInicio("");
              setFechaFin("");
              setFiltroEstado("TODOS");
              setSearchText("");
            }}
          >
            Resetear Filtros
          </button>
          <button className="btn-add-venta" onClick={abrirModal}>
            + Agregar Compra
          </button>
        </div>

>>>>>>> develop
        {/* ACCIONES */}
        <div className="actions-bar">
          <div className="left-actions">
            <button className="btn-gray" onClick={fetchCompras}>Actualizar</button>
            <button
              className="btn-gray"
              onClick={() => setShowDetalleModal(true)}
              disabled={!selectedCompra}
            >
              Ver detalle
            </button>
            <button
              className="btn-gray"
              onClick={async () => {
                if (!selectedCompra) return;
                const confirm = window.confirm(`¿Anular compra ${selectedCompra.id}?`);
                if (!confirm) return;

                try {
                  await axiosInstance.put(`/compra/${selectedCompra.id}`, { estado: "anulado" });
                  fetchCompras();
                  setSelectedCompra(null);
                } catch (err) {
                  console.error(err);
                  alert(err.response?.data?.message || "Error al anular la compra");
                }
              }}
              disabled={!selectedCompra}
            >
              Anular Compra
            </button>
          </div>

          <input
            type="text"
            className="search-input"
            placeholder="Buscar proveedor, usuario o ID"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {showDetalleModal && selectedCompra && (
          <div className="modal-overlay" onClick={() => setShowDetalleModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Detalle de Compra {selectedCompra.id}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total Línea</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCompra.detalleCompra?.length > 0 ? (
                    selectedCompra.detalleCompra.map((d) => (
                      <tr key={d.id}>
                        <td>{d.producto?.nombre || "N/A"}</td>
                        <td>{d.cantidad}</td>
                        <td>L.{d.precio_unitario}</td>
                        <td>L.{(d.cantidad * d.precio_unitario).toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>No hay productos en esta compra.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button className="btn-gray" onClick={() => setShowDetalleModal(false)}>Cerrar</button>
            </div>
          </div>
        )}

        {/* TABLA */}
        <div className="tabla-wrapper">
          <table className="ventas-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Proveedor</th>
                <th>ID Usuario</th>
                <th>Usuario Responsable</th>
                <th>Fecha de Creación</th>
                <th>Fecha Actualización</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {comprasFiltradas.map((c) => (
                <tr
                  key={c.id}
                  className={selectedCompra?.id === c.id ? "selected-row" : ""}
                  onClick={() => setSelectedCompra(c)}
                >
                  <td>{c.id}</td>
                  <td className="proveedor-column">
                    {c.proveedor?.nombre || "-"}
                    <div className="proveedor-id">{c.proveedor_id}</div>
                  </td>
                  <td>{c.user_id}</td>
                  <td>{c.user?.nombre_completo || "-"}</td>
                  <td>{new Date(c.fecha_creacion).toLocaleString()}</td>
                  <td>{c.actualizado_en ? new Date(c.actualizado_en).toLocaleString() : "-"}</td>
                  <td>
                    {c.estado.toLowerCase() === "activo" ? (
                      <span className="estado success">● Activo</span>
                    ) : (
                      <span className="estado cancel">● Anulado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL AGREGAR COMPRA */}
        {showAgregarCompra && (
          <div className="modal-overlay" onClick={cerrarModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2>Agregar Nueva Compra</h2>

              {/* PROVEEDOR */}
              <div className="form-group" style={{ position: "relative" }}>
                <label>Proveedor:</label>
                <input
                  type="text"
                  placeholder="Buscar proveedor..."
                  value={proveedorCompra.nombre}
                  onChange={(e) =>
                    setProveedorCompra({ ...proveedorCompra, nombre: e.target.value, mostrarDropdown: true })
                  }
                  onFocus={() =>
                    setProveedorCompra({ ...proveedorCompra, mostrarDropdown: true })
                  }
                />
                {proveedorCompra.mostrarDropdown && (
                  <div className="lista-productos">
                    {proveedores
                      .filter(p => p.nombre.toLowerCase().includes(proveedorCompra.nombre.toLowerCase()))
                      .map(p => (
                        <div
                          key={p.id}
                          className="item-producto"
                          onMouseDown={() => setProveedorCompra({ id: p.id, nombre: p.nombre, mostrarDropdown: false })}
                        >
                          {p.nombre}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* PRODUCTOS */}
              <div className="producto-row producto-row-headers">
                <div>Producto</div>
                <div>Cantidad</div>
                <div>Precio Unitario</div>
                <div></div>
              </div>

              {productosCompra.map((p, idx) => (
                <div key={idx} className="producto-row">
                  <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={p.nombreProducto}
                    onChange={e => {
                      actualizarProducto(idx, "nombreProducto", e.target.value);
                      const copia = [...productosCompra];
                      copia[idx].mostrarDropdown = true;
                      setProductosCompra(copia);
                    }}
                    onFocus={() => {
                      const copia = [...productosCompra];
                      copia[idx].mostrarDropdown = true;
                      setProductosCompra(copia);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        const copia = [...productosCompra];
                        copia[idx].mostrarDropdown = false;
                        setProductosCompra(copia);
                      }, 150);
                    }}
                  />

                  {p.mostrarDropdown && productosDisponibles.length > 0 && (
                    <div className="lista-productos">
                      {productosDisponibles
                        .filter(prod =>
                          prod.nombre.toLowerCase().includes(p.nombreProducto.toLowerCase())
                        )
                        .map(prod => (
                          <div
                            key={prod.id}
                            className="item-producto"
                            onMouseDown={() => seleccionarProducto(idx, prod)}
                          >
                            <div>{prod.nombre}</div>
                            <div style={{ fontSize: "12px", color: "#555" }}>
                              Precio: L.{prod.precio ?? "0.00"} | Stock: {prod.stock ?? 0}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* SPINNERS */}
                  <input
                    type="number"
                    min="1"
                    value={p.cantidad}
                    onChange={e => actualizarProducto(idx, "cantidad", e.target.value)}
                  />
                  <div className="input-prefix">
                    <span>L.</span>
                    <input
                      type="number"
                      min="0"
                      value={p.precioUnitario}
                      onChange={e => actualizarProducto(idx, "precioUnitario", e.target.value)}
                    />
                  </div>

                  <button type="button" className="btn-eliminar" onClick={() => eliminarProducto(idx)}>X</button>
                </div>
              ))}

              <button className="btn-agregar-producto" onClick={agregarProducto}>
                + Agregar Producto
              </button>

              <div className="total-compra">Total: L.{totalCompra.toFixed(2)}</div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={cerrarModal}>Cancelar</button>
                <button className="btn-guardar" onClick={guardarCompra}>Guardar Compra</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportesCompras;
<<<<<<< HEAD
=======
>>>>>>> develop
>>>>>>> develop
