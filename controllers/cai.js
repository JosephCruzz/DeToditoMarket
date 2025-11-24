const {cai} = require("../models");

exports.addCai = async (req,res) => {
    const {codigo_cai, rango_inicial, rango_final, fecha_autorizacion, fecha_limite_emision, estado, observaciones} = req.body;


    //posibles verificaciones mas a fondo sobre 
    /*
    Si codigo rangos son int base de datos estan en varchar verificar eos
    verificar fecha y fecha que formato de fecha se utilizara en front end para ponerlo a
     */
    try {
    const addC = cai.create({
        codigo_cai,
        rango_inicial,
        rango_final,
        fecha_autorizacion, 
        fecha_limite_emision,
        estado,
        observaciones
    })
    res.status(201).json(addC);
    } catch (err) {
        res.status(500).json({
            message: "No se pudo crear Cai",
            Error: err.message
        })
    }
   
}