import './GestionProductos.css';
import { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";

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
        setNewProduct({
            nombre: "",
            precio: "",
            stock: "",
            stock_minimo: "",
            fecha_vencimiento: ""
        });
    }

    const openFormEdit = (product) => {
        setFormVisible(true);
        setAdd(false);
        setIDProductToEdit(product.id);
        setNewProduct({
            nombre: product.nombre,
            precio: product.precio,
            stock: product.stock,
            stock_minimo: product.stock_minimo,
            fecha_vencimiento: product.fecha_vencimiento
        });
    }

    const closeForm = () => {
        setFormVisible(false);
    }

    const handleChange = (event) =>{
        setNewProduct({...newProduct, [event.target.name]: event.target.value});
    }

    const handleForm = async(event) => {
        event.preventDefault();

        try{
            if(newProduct.nombre.trim()===""||Number(newProduct.precio)<=0||Number(newProduct.stock)<=0||
                Number(newProduct.stock_minimo)<=0||newProduct.fecha_vencimiento==="") return;
            
            if(add){
                await axiosInstance.post(`producto/addToInventory`,{
                    nombre: newProduct.nombre,
                    precio: Number(newProduct.precio),
                    stock: Number(newProduct.stock),
                    stock_minimo: Number(newProduct.stock_minimo),
                    fecha_vencimiento: newProduct.fecha_vencimiento
                });  
            }else{
                await axiosInstance.put(`producto/editInventory/${idProductToEdit}`,{
                    nombre: newProduct.nombre,
                    precio: Number(newProduct.precio),
                    stock: Number(newProduct.stock),
                    stock_minimo: Number(newProduct.stock_minimo),
                    fecha_vencimiento: newProduct.fecha_vencimiento
                });  
            }
            const response = await axiosInstance.get(`producto/getInventory`);
            setProducts(response.data);
            setFormVisible(false);
        }catch(error){
            console.log(error);
        };
    };

    const deleteProduct = async(id) =>{
        try{
            await axiosInstance.delete(`producto/deleteFromInventory/${id}`);
            const response = await axiosInstance.get(`producto/getInventory`);
            setProducts(response.data);
        }catch(error){
            console.log(error);
        }
    };

    const formatDateForInput = (isoDate) => {
        if (!isoDate) return "";
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

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
                                            <button className='options-edit-button' onClick={()=>openFormEdit(product)}>
                                                <Icon.Edit/></button>
                                            <button className='options-delete-button' onClick={()=>deleteProduct(product.id)}>
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
                        <form onSubmit={handleForm}>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Nombre del Producto</label>
                                    <input
                                    className='search-line'
                                    type='text'
                                    placeholder={add ? 'Producto...' : newProduct.nombre}
                                    name='nombre'
                                    value={newProduct.nombre}
                                    onChange={handleChange}
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Precio Venta</label>
                                    <input
                                    className='search-line'
                                    type='number'
                                    placeholder={add ? 0 : newProduct.precio}
                                    name='precio'
                                    value={newProduct.precio}
                                    onChange={handleChange}
                                    ></input>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Stock</label>
                                    <input
                                    className='search-line'
                                    type='number'
                                    placeholder={add ? 0 : newProduct.stock}
                                    name='stock'
                                    value={newProduct.stock}
                                    onChange={handleChange}
                                    ></input>
                                </div>
                                <div className='form-column-2'>
                                    <label>Stock minimo</label>
                                    <input
                                    className='search-line'
                                    type='number'
                                    placeholder={add ? 0 : newProduct.stock_minimo}
                                    name='stock_minimo'
                                    value={newProduct.stock_minimo}
                                    onChange={handleChange}
                                    ></input>
                                </div>
                            </div>
                            <div className='form-row'>
                                <div className='form-column-1'>
                                    <label>Fecha de Vencimiento</label>
                                    <input
                                    className='search-line'
                                    type='date'
                                    name='fecha_vencimiento'
                                    value={add? newProduct.fecha_vencimiento : formatDateForInput(newProduct.fecha_vencimiento)}
                                    onChange={handleChange}
                                    ></input>
                                </div>
                            </div>
                            <div className='form-buttons'>
                                <button className='cancel-button' type='button' onClick={()=>closeForm()}>Cancelar</button>
                                <button className='add-button' type='submit'>{add? "Agregar" : "Editar"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GestionProductos;