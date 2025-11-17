import './GestionProductos.css';
import { useState, useEffect } from 'react';

const GestionProductos = () => {

    const [formVisible, setFormVisible] = useState(false);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {   
        axiosInstance.get('/products')
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

    const openFormEdit = () => {
        setFormVisible(true);
        setEdit(true);
    }

    const closeForm = () => {
        setFormVisible(false);
        setAdd(true);
        setEdit(false);
    }

    return(
        <div className='gestion-container'>
            <div className='title-header'>
                <h1>Gestion de Productos</h1>
                <button onClick={()=>openFormAdd()}>+ Agregar Producto</button>
            </div>
            <div className='table-container'>
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
                    <div className='body-scroll'>
                        <tbody>
                            {products.map((product)=>(
                                <tr>
                                    <td className='table-body'>{product.id}</td>
                                    <td className='table-body'>{product.nombre}</td>
                                    <td className='table-body'>{product.stock}</td>
                                    <td className='table-body'>{product.stock_minimo}</td>
                                    <td className='table-body'>{product.precio}</td>
                                    <td className='table-body'>{product.estado}</td>
                                    <td className='table-body'>
                                        <div>
                                            <button className='options-button' onClick={()=>openFormEdit()}></button>
                                            <button className='options-button'></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </div>
                </table>
            </div>
            {/*FORM PARA AGREGAR*/}
            {formVisible &&(
                <div className='modal-overlay'>
                    <div className='add-form'>
                        <div className='form-header'>
                            <h2>Agregar Producto</h2>
                        </div>
                        <form>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Nombre del Producto</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Producto...'
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Nombre del Proveedor</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Proveedor...'
                                    ></input>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Stock</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Producto...'
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Stock minimo</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Producto...'
                                    ></input>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Precio de Compra</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Producto...'
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Precio Venta</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Producto...'
                                    ></input>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Fecha de Vencimiento</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Producto...'
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Estado</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder='Producto...'
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