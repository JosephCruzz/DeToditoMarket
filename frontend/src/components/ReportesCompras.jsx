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
  const [proveedorCompra, setProveedorCompra] = useState({
    id: "",
    nombre: "",
    mostrarDropdown: false,
  });
  const [productosCompra, setProductosCompra] = useState([]);

  useEffect(() => {
    fetchCompras();
    fetchProveedores();
    fetchProductos();
  }, []);

  const fetchCompras = async () => {
    try {
      const res = await axiosInstance.get("/compra");
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

  const comprasFiltradas = compras.filter((c) => {
    const fecha = new Date(c.fecha_creacion);

    const matchText =
      c.id.toString().includes(searchText) ||
      c.proveedor?.nombre?.toLowerCase().includes(searchText.toLowerCase());

    const matchEstado = filtroEstado === "TODOS" || c.estado === filtroEstado;
    const matchFechaInicio = !fechaInicio || fecha >= new Date(fechaInicio);
    const matchFechaFin = !fechaFin || fecha <= new Date(fechaFin);

    return matchText && matchEstado && matchFechaInicio && matchFechaFin;
  });

  const abrirModal = () => {
    setShowAgregarCompra(true);
    setProveedorCompra({ id: "", nombre: "", mostrarDropdown: false });
    setProductosCompra([]);
  };

  const cerrarModal = () => setShowAgregarCompra(false);

  const resetearFiltros = () => {
    setSearchText("");
    setFiltroEstado("TODOS");
    setFechaInicio("");
    setFechaFin("");
  };

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
      const compraRes = await axiosInstance.post("/compras", {
        proveedor_id: proveedorCompra.id,
        user_id: 1,
      });
      const compra = compraRes.data;

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
    }
  };

  return (
    <div className="reportes-outer">
      <div className="reportes-card">
        <h1 className="reportes-title">Reporte de Compras</h1>

        {/* FILTROS + SEARCH + AGREGAR COMPRA */}
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
              <option value="pendiente">Pendiente</option>
            </select>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar proveedor o ID"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="btn-gray" onClick={resetearFiltros}>
            Resetear filtros
          </button>
          <button className="btn-add-venta" onClick={abrirModal}>
            + Agregar Compra
          </button>
        </div>

        {/* TABLA */}
        <div className="tabla-wrapper">
          <table className="ventas-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {comprasFiltradas.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.proveedor?.nombre}</td>
                  <td>{new Date(c.fecha_creacion).toLocaleDateString()}</td>
                  <td>L.{c.detalle?.reduce((a, d) => a + d.cantidad * d.precio_unitario, 0) || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL AGREGAR COMPRA */}
        {showAgregarCompra && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Nueva Compra</h2>

              {/* PROVEEDOR */}
              <div className="form-group" style={{ position: "relative" }}>
                <label>Proveedor</label>
                <input
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
                  <div className="lista-dropdown">
                    {proveedores
                      .filter((p) => p.nombre.toLowerCase().includes(proveedorCompra.nombre.toLowerCase()))
                      .slice(0, 5)
                      .map((p) => (
                        <div key={p.id} className="item-dropdown" onClick={() => seleccionarProveedor(p)}>
                          {p.nombre} (ID: {p.id})
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* PRODUCTOS */}
              {productosCompra.map((p, idx) => (
                <div key={idx} className="producto-row">
                  <input
                    value={p.nombreProducto}
                    placeholder="Buscar producto..."
                    onChange={(e) => {
                      actualizarProducto(idx, "nombreProducto", e.target.value);
                      const copia = [...productosCompra];
                      copia[idx].mostrarDropdown = true;
                      setProductosCompra(copia);
                    }}
                  />
                  {p.mostrarDropdown && (
                    <div className="lista-dropdown">
                      {productosDisponibles
                        .filter((prod) => prod.nombre.toLowerCase().includes(p.nombreProducto.toLowerCase()))
                        .slice(0, 5)
                        .map((prod) => (
                          <div key={prod.id} className="item-dropdown" onClick={() => seleccionarProducto(idx, prod)}>
                            {prod.nombre} (Stock: {prod.stock ?? 0}) - L.{prod.precio ?? "0.00"}
                          </div>
                        ))}
                    </div>
                  )}
                  <input type="number" value={p.cantidad} onChange={(e) => actualizarProducto(idx, "cantidad", e.target.value)} />
                  <input type="number" value={p.precioUnitario} onChange={(e) => actualizarProducto(idx, "precioUnitario", e.target.value)} />
                  <button onClick={() => eliminarProducto(idx)}>X</button>
                </div>
              ))}

              <button onClick={agregarProducto}>+ Producto</button>
              <div className="total-venta">Total: L.{totalCompra.toFixed(2)}</div>

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
