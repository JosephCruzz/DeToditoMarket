import "./ReportesVentas.css";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const ReportesVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // FILTROS (FECHA, ESTADO, METODO PAGO)
  const [searchText, setSearchText] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [filtroMetodo, setFiltroMetodo] = useState("TODOS");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // AGREGAR VENTA
  const [showAgregarVenta, setShowAgregarVenta] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState("");
  const [nuevoRTN, setNuevoRTN] = useState("");
  const [nuevoMetodo, setNuevoMetodo] = useState("EFECTIVO");
  const [productosVenta, setProductosVenta] = useState([]);
  const [productosDisponibles, setProductosDisponibles] = useState([]);

// ABRE EL MODAL DE AGREGAR VENTA
const openAgregarVentaModal = async () => {
  setShowAgregarVenta(true);
  setProductosDisponibles([]);
  try {
    const response = await axiosInstance.get("/producto/getInventory");
    setProductosDisponibles(response.data || []);
  } catch (err) {
    console.error("Error fetching productos:", err);
    alert("No se pudieron cargar los productos");
  }
};

  useEffect(() => {
    fetchVentas();
    fetchProductosDisponibles();
  }, []);

  // AL salirse del modal, resetea los campos
  const resetAgregarVenta = () => {
    setNuevoCliente("");
    setNuevoRTN("");
    setNuevoMetodo("EFECTIVO");
    setProductosVenta([]);
    setShowAgregarVenta(false);
  };

  //trae todas las facturas
  const fetchVentas = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/factura");
      if (response.data.status === "Success") {
        setVentas(response.data.message);
      } else {
        console.error("No se encontraron facturas");
      }
    } catch (err) {
      console.error("Error fetching ventas:", err);
    }
    setLoading(false);
  };

//esto es para el dropdown
const fetchProductosDisponibles = async () => {
  try {
    const response = await axiosInstance.get("/producto/getInventory");
    console.log("✅ Respuesta de getInventory:", response.data); // 🔹 log
    setProductosDisponibles(response.data);
  } catch (err) {
    console.error("❌ Error fetching productos:", err); // 🔹 log de error
  }
};

// FILTRA LAS VENTAS SEGUN LOS CRITERIOS
  const filtrarVentas = () => {
    return ventas.filter(v => {
      const fecha = new Date(v.fecha_emision);
      const vEstado = v.estado?.toString().trim().toUpperCase() || "";
      const vMetodo = v.metodo_pago?.toString().trim().toUpperCase() || "";

      const matchText =
        v.nombre_cliente.toLowerCase().includes(searchText.toLowerCase()) ||
        v.numero_factura.toString().includes(searchText) ||
        v.rtn_cliente.includes(searchText);

      const matchEstado = filtroEstado === "TODOS" || vEstado === filtroEstado;
      const matchMetodo = filtroMetodo === "TODOS" || vMetodo === filtroMetodo;
      const matchFechaInicio = !fechaInicio || fecha >= new Date(fechaInicio);
      const matchFechaFin = !fechaFin || fecha <= new Date(fechaFin);

      return matchText && matchEstado && matchMetodo && matchFechaInicio && matchFechaFin;
    });
  };

  // DESCARGA EL REPORTE EN CSV
  const downloadCSV = () => {
    const filtered = filtrarVentas();
    if (!filtered.length) return;

    const headers = [
      "Folio",
      "Cliente",
      "RTN Cliente",
      "Fecha Venta",
      "Hora Venta",
      "Forma de Pago",
      "Cant.",
      "Estado",
      "Total"
    ];

    const rows = filtered.map(v => [
      `"${v.numero_factura}"`,
      `"${v.nombre_cliente}"`,
      `"${v.rtn_cliente}"`,
      `"${new Date(v.fecha_emision).toLocaleDateString()}"`,
      `"${new Date(v.fecha_emision).toLocaleTimeString()}"`,
      `"${v.metodo_pago}"`,
      v.detalle?.reduce((acc, p) => acc + p.cantidad, 0) || 0,
      `"${v.estado === "VIGENTE" ? "Venta Vigente" : "Venta Anulada"}"`,
      v.total
    ]);

    const bom = "\uFEFF";
    const csvContent = bom + [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Reporte_Ventas_${new Date().toLocaleDateString()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // AGREGA UN NUEVO PRODUCTO A LA VENTA
  const agregarProducto = () => {
    setProductosVenta([
      ...productosVenta,
      { productoId: "", nombreProducto: "", cantidad: 1, precioUnitario: 0, descuento: 0, mostrarDropdown: false }
    ]);
  };

//boton que elimina un producto de la venta
  const eliminarProducto = idx => {
    setProductosVenta(productosVenta.filter((_, i) => i !== idx));
  };

    //actualiza los campos de los productos en la venta
  const actualizarProducto = (idx, field, value) => {
    const copia = [...productosVenta];
    copia[idx][field] = field === "productoId" || field === "nombreProducto" ? value : Number(value);
    setProductosVenta(copia);
  };

    const seleccionarProducto = (idx, producto) => {
      const copia = [...productosVenta];
      copia[idx].productoId = producto.id;
      copia[idx].nombreProducto = producto.nombre; 
      copia[idx].precioUnitario = Number(producto.precio) || 0; // el 0 es por si hay null ya q creo que esta como allowNull
      copia[idx].mostrarDropdown = false;
      setProductosVenta(copia);
    };

    const calcularTotal = () => {
      return productosVenta.reduce((acc, p) => {
        const subtotal = p.cantidad * p.precioUnitario;
        const descuento = subtotal * (p.descuento / 100); // aplica porcentaje
        return acc + subtotal - descuento;
      }, 0);
    };
//estas de arriba son self explanatory 

// GUARDA LA NUEVA VENTA
 const guardarVenta = async () => {
  if (!nuevoCliente || !nuevoRTN || productosVenta.length === 0) {
    alert("Complete todos los campos y agregue al menos un producto.");
    return;
  }

  try {
    const subtotal = productosVenta.reduce(
      (acc, p) => acc + Number(p.cantidad) * Number(p.precioUnitario),
      0
    );

    const totalDescuento = productosVenta.reduce((acc, p) => {
      const sub = Number(p.cantidad) * Number(p.precioUnitario);
      return acc + sub * (Number(p.descuento) / 100);
    }, 0);

    const impuestos = 0;
    const total = subtotal - totalDescuento + impuestos;

    const responseFactura = await axiosInstance.post("/factura/crear", {
      nombre_cliente: nuevoCliente,
      rtn_cliente: nuevoRTN,
      metodo_pago: nuevoMetodo,
      moneda: "HNL",
      subtotal,
      impuestos,
      total,
      fecha_emision: new Date().toISOString().split("T")[0],
      observaciones: ""
    });

    const facturaCreada = responseFactura.data.message;

    const detalle = productosVenta.map(p => {
      const sub = Number(p.cantidad) * Number(p.precioUnitario);
      const desc = sub * (Number(p.descuento) / 100);
      return {
        factura_id: facturaCreada.id,
        producto_id: p.productoId,
        cantidad: Number(p.cantidad),
        precio_unitario: Number(p.precioUnitario),
        descuento: Number(p.descuento),
        total_linea: sub - desc,
        metodo_pago: nuevoMetodo,
        observaciones: ""
      };
    });

    await axiosInstance.post("/detalleVenta/bulk", detalle);

    resetAgregarVenta();
    fetchVentas();

  } catch (err) {
    console.error("Error al guardar la venta:", err);
    alert(err.response?.data?.message || "Error al guardar la venta");
  }
};

  return (
    <div className="reportes-outer">
      <div className="reportes-card">
        <h1 className="reportes-title">Ventas</h1>

        {/* FILTROS Y BOTON DE AGREGAR VENTA */}
        <div className="filter-bar real-filters">
          <div className="filter-group">
            <label>Desde:</label>
            <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} className="input-fecha" />
          </div>
          <div className="filter-group">
            <label>Hasta:</label>
            <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} className="input-fecha" />
          </div>
          <div className="filter-group">
            <label>Estado:</label>
            <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
              <option value="TODOS">Todos</option>
              <option value="VIGENTE">Vigente</option>
              <option value="ANULADA">Anulada</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Método Pago:</label>
            <select value={filtroMetodo} onChange={e => setFiltroMetodo(e.target.value)}>
              <option value="TODOS">Todos</option>
              <option value="EFECTIVO">Efectivo</option>
              <option value="TRANSFERENCIA">Transferencia</option>
            </select>
          </div>
          <button
            className="btn-gray"
            onClick={() => {
              setFechaInicio(""); setFechaFin(""); setFiltroEstado("TODOS"); setFiltroMetodo("TODOS"); setSearchText("");
            }}
          >
            Resetear Filtros
          </button>
          <button className="btn-add-venta" onClick={openAgregarVentaModal}>+ Agregar Venta</button>
        </div>

        {/* ACCIONES */}
        <div className="actions-bar">
          <div className="left-actions">
            <button className="btn-gray" onClick={fetchVentas}>Actualizar</button>
            <button className="btn-gray" onClick={downloadCSV}>Descargar</button>
            <button className="btn-gray" onClick={() => setShowModal(true)} disabled={!selectedFactura}>Ver detalle</button>
            <button className="btn-gray"
              onClick={async () => {
                if (!selectedFactura) return;
                const confirm = window.confirm(`¿Anular factura ${selectedFactura.numero_factura}?`);
                if (!confirm) return;
                try {
                  await axiosInstance.delete(`/factura/anular/${selectedFactura.numero_factura}`);
                  fetchVentas();
                  setSelectedFactura(null);
                } catch (err) {
                  console.error(err);
                  alert(err.response?.data.message || "Error al anular la factura");
                }
              }}
              disabled={!selectedFactura}
            >
              Anular Factura
            </button>
          </div>
          <input type="text" className="search-input" placeholder="Buscar cliente, número o RTN"
            value={searchText} onChange={e => setSearchText(e.target.value)}
          />
        </div>

        {/* TABLA DE FACTURAS/VENTAS */}
        <div className="tabla-wrapper">
          {loading ? <div className="spinner">Cargando...</div> :
            <table className="ventas-table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Cliente</th>
                  <th>Fecha Venta</th>
                  <th>Forma de Pago</th>
                  <th>Cant.</th>
                  <th>Estado</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {filtrarVentas().map(v => (
                  <tr key={v.id} className={selectedFactura?.id === v.id ? "selected-row" : ""} onClick={() => setSelectedFactura(v)}>
                    <td>{v.numero_factura}</td>
                    <td className="cliente-column">
                      {v.nombre_cliente}<div className="cliente-doc">{v.rtn_cliente}</div>
                    </td>
                    <td>{new Date(v.fecha_emision).toLocaleDateString()}<div className="hora">{new Date(v.fecha_emision).toLocaleTimeString()}</div></td>
                    <td>{v.metodo_pago}</td>
                    <td>{v.detalle?.reduce((acc, p) => acc + p.cantidad, 0) || 0}</td>
                    <td>{v.estado === "VIGENTE" ? <span className="estado success">● Venta Vigente</span> : <span className="estado cancel">● Venta Anulada</span>}</td>
                    <td className="total-col">L.{Number(v.total).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>

        {/* PAGINACION */}
        <div className="pagination">
          <span>N° Filas:</span>
          <select><option>10</option><option>25</option><option>50</option></select>
          <span className="total-registros">Total: {filtrarVentas().length} – Página 1 / 1</span>
          <button className="page-btn">←</button>
          <button className="page-btn">→</button>
        </div>

        {/* MODAL DEL DETALLE FACTURA (PARA VER LOS PRODUCTOS ASOCIADOS) */}
        {showModal && selectedFactura && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2>Detalle de Factura {selectedFactura.numero_factura}</h2>
              <table>
                <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th><th>Descuento</th><th>Total Línea</th><th>Observaciones</th></tr></thead>
                <tbody>
                  {selectedFactura.detalle?.length ? selectedFactura.detalle.map(d => (
                    <tr key={d.id}><td>{d.producto?.nombre || "N/A"}</td><td>{d.cantidad}</td><td>{d.precio_unitario}</td><td>{d.descuento}</td><td>{d.total_linea}</td><td>{d.observaciones}</td></tr>
                  )) : (
                    <tr><td colSpan={6}>No hay productos en esta factura.</td></tr>
                  )}
                </tbody>
              </table>
              <button className="btn-gray" onClick={() => setShowModal(false)}>Cerrar</button>
            </div>
          </div>
        )}

        {/* MODAL AGREGAR VENTA */}
        {showAgregarVenta && (
          <div className="modal-overlay" onClick={resetAgregarVenta}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2>Agregar Nueva Venta</h2>
              <div className="form-group"><label>Nombre Cliente:</label><input type="text" value={nuevoCliente} onChange={e => setNuevoCliente(e.target.value)} /></div>
              <div className="form-group"><label>RTN Cliente:</label><input type="text" value={nuevoRTN} onChange={e => setNuevoRTN(e.target.value)} /></div>
              <div className="form-group"><label>Método de Pago:</label>
                <select value={nuevoMetodo} onChange={e => setNuevoMetodo(e.target.value)}>
                  <option value="EFECTIVO">Efectivo</option>
                  <option value="TRANSFERENCIA">Transferencia</option>
                </select>
              </div>
                <div className="producto-row producto-row-headers">
                  <div>Producto</div>
                  <div>Cantidad</div>
                  <div>Precio Unitario</div>
                  <div>Descuento</div>
                  <div></div>
                </div>

                {productosVenta.map((p, idx) => (
                  <div key={idx} className="producto-row">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={p.nombreProducto}
                  onChange={e => {
                    actualizarProducto(idx, "nombreProducto", e.target.value);
                    const copia = [...productosVenta];
                    copia[idx].mostrarDropdown = true;
                    setProductosVenta(copia);
                  }}
                  onFocus={() => {
                    const copia = [...productosVenta];
                    copia[idx].mostrarDropdown = true;
                    setProductosVenta(copia);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      const copia = [...productosVenta];
                      copia[idx].mostrarDropdown = false;
                      setProductosVenta(copia);
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
                          onClick={() => seleccionarProducto(idx, prod)}
                        >
                          <div>{prod.nombre}</div>
                          <div style={{ fontSize: "12px", color: "#555" }}>
                            Precio: L.{prod.precio ?? "0.00"} | Stock: {prod.stock ?? 0}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

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

              <div className="input-prefix">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={p.descuento}
                  onChange={e => actualizarProducto(idx, "descuento", e.target.value)}
                />
                <span>%</span>
              </div>

                <button type="button" className="btn-eliminar" onClick={() => eliminarProducto(idx)}>X</button>
              </div>

                ))}
              <button type="button" className="btn-agregar-producto" onClick={agregarProducto}>+ Agregar Producto</button>

              <div className="total-venta">Total: L.{calcularTotal()}</div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={resetAgregarVenta}>Cancelar</button>
                <button className="btn-guardar" onClick={guardarVenta}>Guardar Venta</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportesVentas;
