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

  useEffect(() => {
    axiosInstance.get(`/producto/getInventory`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const openFormAdd = () => {
    setFormVisible(true);
    setAdd(true);
    setNewProduct({ nombre: "", precio: "", stock: "", stock_minimo: "", fecha_vencimiento: "" });
  };

  const openFormEdit = (product) => {
    setFormVisible(true);
    setAdd(false);
    setIDProductToEdit(product.id);
<<<<<<< HEAD
    setNewProduct({ ...product });
=======
    setNewProduct({ ...product,
      fecha_vencimiento: product.fecha_vencimiento 
      ? new Date(product.fecha_vencimiento).toISOString().split('T')[0]
      : ""
     });
>>>>>>> b2066ca774c1c4978cd3b74c5045aa867b7aa76f
  };

  const closeForm = () => setFormVisible(false);

  const handleChange = (e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value });

  const handleForm = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (!newProduct.nombre || Number(newProduct.precio) <= 0 || Number(newProduct.stock) <= 0 || Number(newProduct.stock_minimo) <= 0) return;
=======
    if (!newProduct.nombre || Number(newProduct.precio) <= 0 || Number(newProduct.stock) <= 0 || Number(newProduct.stock_minimo) <= 0){
      toast.error("Llenar todos los campos.");
      return;
    }
>>>>>>> b2066ca774c1c4978cd3b74c5045aa867b7aa76f

    try {
      if (add) {
        await axiosInstance.post(`/producto/addToInventory`, {
          ...newProduct,
<<<<<<< HEAD
=======
          id_user: 1,
>>>>>>> b2066ca774c1c4978cd3b74c5045aa867b7aa76f
          precio: Number(newProduct.precio),
          stock: Number(newProduct.stock),
          stock_minimo: Number(newProduct.stock_minimo)
        });
<<<<<<< HEAD
      } else {
        await axiosInstance.put(`/producto/editInventory/${idProductToEdit}`, {
          ...newProduct,
=======
        toast.success("Producto agregado con exito.");
      } else {
        await axiosInstance.put(`/producto/editInventory/${idProductToEdit}`, {
          ...newProduct,
          id_user: 1,
>>>>>>> b2066ca774c1c4978cd3b74c5045aa867b7aa76f
          precio: Number(newProduct.precio),
          stock: Number(newProduct.stock),
          stock_minimo: Number(newProduct.stock_minimo)
        });
<<<<<<< HEAD
=======
         toast.success("Producto editado con exito.");
>>>>>>> b2066ca774c1c4978cd3b74c5045aa867b7aa76f
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
<<<<<<< HEAD
      await axiosInstance.delete(`/producto/deleteFromInventory/${id}`);
      const res = await axiosInstance.get(`/producto/getInventory`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
=======
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
>>>>>>> b2066ca774c1c4978cd3b74c5045aa867b7aa76f
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
<<<<<<< HEAD
=======

  return (
    <div className='reportes-outer'>
      <div className='reportes-card'>
        <div className='actions-bar'>
          <h1 className='reportes-title'>Gestión de Productos</h1>
          <button className='btn-add-venta' onClick={openFormAdd}>+ Agregar Producto</button>
        </div>

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
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.nombre}</td>
                  <td>{product.stock}</td>
                  <td>{product.stock_minimo}</td>
                  <td>{product.precio}</td>
                  <td>{new Date(product.fecha_vencimiento).toLocaleString('es-HN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  })}</td>
                  <td>{new Date(product.fecha_vencimiento) < new Date() ? "Caducado" : product.estado}</td>
                  <td>
                    <div className='left-actions'>
                      <button onClick={() => openFormEdit(product)}><Icon.Edit /></button>
                      <button onClick={() => deleteProduct(product.id)}><Icon.Delete /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
>>>>>>> b2066ca774c1c4978cd3b74c5045aa867b7aa76f

  return (
    <div className='reportes-outer'>
      <div className='reportes-card'>
        <div className='actions-bar'>
          <h1 className='reportes-title'>Gestión de Productos</h1>
          <button className='btn-add-venta' onClick={openFormAdd}>+ Agregar Producto</button>
        </div>

        <div className='tabla-wrapper'>
          <table className='ventas-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Stock Min.</th>
                <th>Precio</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.nombre}</td>
                  <td>{product.stock}</td>
                  <td>{product.stock_minimo}</td>
                  <td>{product.precio}</td>
                  <td>
                    <div className='left-actions'>
                      <button onClick={() => openFormEdit(product)}><Icon.Edit /></button>
                      <button onClick={() => deleteProduct(product.id)}><Icon.Delete /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
