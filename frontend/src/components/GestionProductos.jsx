import './GestionProductos.css';
import { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";

const GestionProductos = () => {
<<<<<<< HEAD

    const [formVisible, setFormVisible] = useState(false);
    const [add, setAdd] = useState(false);
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState([]);

    useEffect(() => {   
        axiosInstance.get(`producto/getInventory`)
        .then(response => {
            setProducts(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });     
    }, []);

    const openFormAdd = () => {
        setFormVisible(true);
        setAdd(true);
    }

    const openFormEdit = (product) => {
        setFormVisible(true);
        setAdd(false);
        setProductToEdit(product);
    }

    const closeForm = () => {
        setFormVisible(false);
    }

    const Icon = {
        Search: (props) => (
            <svg
            viewBox="0 0 24 24"
            fill="none"
            className={"w-4 h-4 " + (props.className || "")}
            >
            <path
                d="M11 19a8 8 0 1 1 5.29-14.03A8 8 0 0 1 11 19Zm10 2-5.4-5.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            </svg>
        ),
        Sort: ({ active, dir }) => (
            <svg
            viewBox="0 0 24 24"
            className={"w-4 h-4 " + (active ? "text-white" : "text-white/70")}
            >
            <path
                d="M12 6l3 3H9l3-3z"
                fill="currentColor"
                opacity={dir === "asc" ? 1 : 0.35}
            />
            <path
                d="M12 18l-3-3h6l-3 3z"
                fill="currentColor"
                opacity={dir === "desc" ? 1 : 0.35}
            />
            </svg>
        ),
        Add: (props) => (
            <svg viewBox="0 0 24 24" className={"w-5 h-5 " + (props.className || "")}>
            <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            </svg>
        ),
        Edit: (props) => (
            <svg viewBox="0 0 24 24" className={"w-5 h-5 " + (props.className || "")}>
            <path
                d="M4 20h4l10-10-4-4L4 16v4zM14 6l4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            </svg>
        ),
        Delete: (props) => (
            <svg viewBox="0 0 24 24" className={"w-5 h-5 " + (props.className || "")}>
            <path
                d="M6 7h12M9 7V5h6v2m-8 0 1 12h8l1-12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            </svg>
        ),
        ChevronLeft: (props) => (
            <svg viewBox="0 0 24 24" className={"w-6 h-6 " + (props.className || "")}>
            <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            </svg>
        ),
        ChevronRight: (props) => (
            <svg viewBox="0 0 24 24" className={"w-6 h-6 " + (props.className || "")}>
            <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
            />
            </svg>
        ),
    };

    return(
        <div className='gestion-container'>
            <div className='title-header'>
                <h1>Gestion de Productos</h1>
                <button onClick={()=>openFormAdd()}>+ Agregar Producto</button>
            </div>
            <div className='table-container'>
                <div className='body-scroll'>
                    <table className='table-productos'>
                        <thead>
                            <tr>
                                <th>ID del Producto</th>
                                <th>Nombre de producto</th>
                                <th>Cantidad en Stock</th>
                                <th>Stock minimo</th>
                                <th>Precio</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product)=>(
                                <tr key={product.id}>
                                    <td className='table-body'>{product.id}</td>
                                    <td className='table-body'>{product.nombre}</td>
                                    <td className='table-body'>{product.stock}</td>
                                    <td className='table-body'>{product.stock_minimo}</td>
                                    <td className='table-body'>{product.precio}</td>
                                    <td className='table-body'>
                                        <div className='option-buttons'>
                                            <button className='options-add-button' onClick={()=>openFormEdit()}>
                                                <Icon.Add/></button>
                                            <button className='options-edit-button'>
                                                <Icon.Edit/></button>
                                            <button className='options-delete-button'>
                                                <Icon.Delete/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/*FORM PARA AGREGAR*/}
            {formVisible &&(
                <div className='modal-overlay'>
                    <div className='add-form'>
                        <div className='form-header'>
                            <h2>{add ? "Agregar Producto" : "Editar Producto"}</h2>
                        </div>
                        <form>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Nombre del Producto</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder={add ? 'Producto...' : productToEdit.nombre}
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Precio Venta</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder={add ? 'Precio...' : productToEdit.precio}
                                    ></input>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Stock</label>
                                    <input
                                    className='search-line'
                                    type='number'
                                    placeholder={add ? 'Stock...' : productToEdit.stock}
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Stock minimo</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder={add ? 'Stock minimo...' : productToEdit.stock_minimo}
                                    ></input>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Fecha de Vencimiento</label>
                                    <input
                                    className='search-line'
                                    type='date'
                                    placeholder={add ? 'Fecha...' : productToEdit.fecha_vencimiento}
                                    ></input>
                                </div>
                            </div>
                            <div className='form-buttons'>
                                <button className='cancel-button' onClick={()=>closeForm()}>Cancelar</button>
                                <button className='add-button'>Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GestionProductos;
=======
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
    setNewProduct({ ...product });
  };

  const closeForm = () => setFormVisible(false);

  const handleChange = (e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value });

  const handleForm = async (e) => {
    e.preventDefault();
    if (!newProduct.nombre || Number(newProduct.precio) <= 0 || Number(newProduct.stock) <= 0 || Number(newProduct.stock_minimo) <= 0) return;

    try {
      if (add) {
        await axiosInstance.post(`/producto/addToInventory`, {
          ...newProduct,
          precio: Number(newProduct.precio),
          stock: Number(newProduct.stock),
          stock_minimo: Number(newProduct.stock_minimo)
        });
      } else {
        await axiosInstance.put(`/producto/editInventory/${idProductToEdit}`, {
          ...newProduct,
          precio: Number(newProduct.precio),
          stock: Number(newProduct.stock),
          stock_minimo: Number(newProduct.stock_minimo)
        });
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
      await axiosInstance.delete(`/producto/deleteFromInventory/${id}`);
      const res = await axiosInstance.get(`/producto/getInventory`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
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
>>>>>>> develop
