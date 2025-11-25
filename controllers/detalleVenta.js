const {DetalleVenta} = require("../models");



exports.addDetalleVenta = async (req,res) => {
   
    const {factura_id,producto_id, 
        fecha, cantidad, precio_unitario, descuento,
        total_linea, metodo_pago, observaciones
    } = req.body;
   
    if(!factura_id || !producto_id || !cantidad || !precio_unitario ||!descuento ,!metodo_pago) {
            return res.status(400).json({
            message: "Todos los campos excepto fecha, observaciones y total_linea son obligatorios"            
            })
        }

    let cantidadN = Number(cantidad);
    let precio_unitarioN = Number(precio_unitario);
    let descuentoN = Number(descuento);
    //const total_lineaN = Number(total_linea);
   
 

    if(isNaN(cantidadN) || isNaN(precio_unitarioN) || 
    isNaN(descuentoN)){
        return res.status(400).json({
            message: "Cantidad, precio_unitario, descuento, tiene que ser valores numericos"
        })
    }

    descuentoN = descuentoN /100;
    let total_lineaR = cantidadN * precio_unitarioN * descuentoN
    try {
        const addDetalleV = await DetalleVenta.create({
            factura_id,
            producto_id,
            fecha: Date.now(),
            cantidad,
            precio_unitario,
            descuento,
            total_linea: total_lineaR,
            metodo_pago,
            observaciones
        })

        return res.status(201).json(addDetalleV)
        
    } catch (err) {

        if(err.name === "SequelizeForeignKeyConstraintError"){
            res.status(400).json({
                message: "Los campos llenados en las llaves foraneas factura_id y producto_id una o las dos no son existentes"
            });
        }


        res.status(500).json({
            message: "No se pudo añadir detalle de Venta",
            error: err.message
        })
    }
}