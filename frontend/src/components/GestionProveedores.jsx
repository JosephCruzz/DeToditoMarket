import './GestionProductos.css';
import { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";
import { toast } from 'react-toastify';

const GestionProductos = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [add, setAdd] = useState(false);
  const [products, setProducts] = useState([]);
  const [idProductToEdit, setIDProductToEdit] = useState(0);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    precio: "",
    stock: "",
    stock_minimo: "",
    fecha_vencimiento: ""
  });

  // FILTROS
  const [searchText, setSearchText] = useState("");
  const [filtroStock, setFiltroStock] = useState("TODOS"); // NUEVO FILTRO

  useEffect(() => {
    axiosInstance.get(`/producto/getInventory`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const filtrarProductos = () => {
    return products.filter(product => {
      const matchName = product.nombre.toLowerCase().includes(searchText.toLowerCase());

      const matchStock =
        filtroStock === "TODOS" ||
        (filtroStock === "BAJO" && product.stock <= product.stock_minimo) ||
        (filtroStock === "SUFICIENTE" && product.stock > product.stock_minimo);

      return matchName && matchStock;
    });
  };

  const openFormAdd = () => {
    setFormVisible(true);
    setAdd(true);
    setNewProduct({ nombre: "", precio: "", stock: "", stock_minimo: "", fecha_vencimiento: "" });
  };

  const openFormEdit = (product) => {
    setFormVisible(true);
    setAdd(false);
    setIDProductToEdit(product.id);
    setNewProduct({ ...product,
      fecha_vencimiento: product.fecha_vencimiento 
        ? new Date(product.fecha_vencimiento).toISOString().split('T')[0]
        : ""
    });
  };

  const closeForm = () => setFormVisible(false);

  const handleChange = (e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value });

  const handleForm = async (e) => {
    e.preventDefault();
    if (!newProduct.nombre || Number(newProduct.precio) <= 0 || Number(newProduct.stock) <= 0 || Number(newProduct.stock_minimo) <= 0){
      toast.error("Llenar todos los campos.");
      return;
    }

    try {
      if (add) {
        await axiosInstance.post(`/producto/addToInventory`, {
          ...newProduct,
          id_user: 1,
          precio: Number(newProduct.precio),
          stock: Number(newProduct.stock),
          stock_minimo: Number(newProduct.stock_minimo)
        });
        toast.success("Producto agregado con exito.");
      } else {
        await axiosInstance.put(`/producto/editInventory/${idProductToEdit}`, {
          ...newProduct,
          id_user: 1,
          precio: Number(newProduct.precio),
          stock: Number(newProduct.stock),
          stock_minimo: Number(newProduct.stock_minimo)
        });
        toast.success("Producto editado con exito.");
      }
      const res = await axiosInstance.get(`/producto/getInventory`);
      setProducts(res.data);
      setFormVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      if(!id){
        toast.error("Id requerida.");
        return;
      }
      const confirm = window.confirm(`¿Desea anular este producto?`);
      if (!confirm) return;
      await axiosInstance.put(`/producto/deleteFromInventory/${id}`,{
          estado: "Anulado"
      });
      const res = await axiosInstance.get(`/producto/getInventory`);
      setProducts(res.data);
      toast.success("Producto anulado con exito!");
    } catch (err) {
      toast.error("Error al anular producto.");
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
          <h1 className='reportes-title'>Gestión de Productos</h1>
          <button className='btn-add-venta' onClick={openFormAdd}>+ Agregar Producto</button>
        </div>

        {/* BARRA DE BÚSQUEDA Y FILTROS */}
        <div className="filter-bar">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <select value={filtroStock} onChange={e => setFiltroStock(e.target.value)}>
              <option value="TODOS">Todos</option>
              <option value="BAJO">Stock Bajo</option>
              <option value="SUFICIENTE">Stock Suficiente</option>
            </select>
          </div>

          <div className="filter-group">
            <button
              className="btn-gray"
              onClick={() => { setSearchText(""); setFiltroStock("TODOS"); }}
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
                <th>Nombre</th>
                <th>Stock</th>
                <th>Stock Min.</th>
                <th>Precio</th>
                <th>Fecha de Vencimiento</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrarProductos().map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.nombre}</td>
                  <td>{product.stock}</td>
                  <td>{product.stock_minimo}</td>
                  <td>{product.precio}</td>
                  <td>{product.fecha_vencimiento ? new Date(product.fecha_vencimiento).toLocaleDateString('es-HN') : ""}</td>
                  <td>{product.estado === "Anulado" ? "Anulado" : (new Date(product.fecha_vencimiento) < new Date() ? "Caducado" : "Activo")}</td>
                  <td>
                    <div className='left-actions'>
                      <button onClick={() => openFormEdit(product)}><Icon.Edit/></button>
                      <button onClick={() => deleteProduct(product.id)}><Icon.Delete/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL FORMULARIO */}
        {formVisible && (
          <div className='modal-overlay'>
            <div className='add-form'>
              <div className='form-header'>
                <h2>{add ? "Agregar Producto" : "Editar Producto"}</h2>
              </div>
              <form onSubmit={handleForm}>
                <div className='form-row'>
                  <div className='form-column-1'>
                    <label>Nombre</label>
                    <input type='text' name='nombre' value={newProduct.nombre} onChange={handleChange} placeholder='Nombre...' />
                  </div>
                  <div className='form-column-2'>
                    <label>Precio</label>
                    <input type='number' name='precio' value={newProduct.precio} onChange={handleChange} placeholder='0' />
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-column-1'>
                    <label>Stock</label>
                    <input type='number' name='stock' value={newProduct.stock} onChange={handleChange} placeholder='0' />
                  </div>
                  <div className='form-column-2'>
                    <label>Stock Min.</label>
                    <input type='number' name='stock_minimo' value={newProduct.stock_minimo} onChange={handleChange} placeholder='0' />
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-column-1'>
                    <label>Fecha de Vencimiento</label>
                    <input type='date' name='fecha_vencimiento' value={newProduct.fecha_vencimiento || ""} onChange={handleChange} />
                  </div>
                </div>
                <div className='form-buttons'>
                  <button type='button' className='cancel-button' onClick={closeForm}>Cancelar</button>
                  <button type='submit' className='add-button'>{add ? "Agregar" : "Editar"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionProductos;
