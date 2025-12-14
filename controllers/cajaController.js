const db = require("../models");
const Caja = db.caja;

exports.abrirCaja = async(request, response) => {
    try{
        const { user_id, saldo_inicial } = request.body;

        const cajaAbierta = await Caja.findOne({ where: { estado: "abierta" } });
        if(cajaAbierta){
            return response.status(400).json({ message: "Una caja ya esta abierta." });
        }

        const newBox = await Caja.create({ user_id, saldo_inicial });
        response.json(newBox);
    }catch(error){
        response.status(500).json({ error: error.message });
    }
}

exports.getCaja = async(request, response) => {
    try{
        const { id } = request.params;
        
        const caja = await Caja.findByPk(id); 
        if(!caja){
            return response.status(404).json({ message: "Caja no encontrada" });
        }

        response.status(200).json(caja);
    }catch(error){
        response.status(500).json({ error: error.message });
    }
}

exports.deleteCaja = async(request, response) => {
    try{
        const { id } = request.params;
        
        const caja = await Caja.findByPk(id); 
        if(!caja){
            return response.status(404).json({ message: "Caja no encontrada" });
        }

        await caja.destroy();

        response.status(200).json({ message: "Caja eliminada con exito." });
    }catch(error){
        response.status(500).json({ error: error.message });
    }
}

exports.cerrarCaja = async(request, response) => {
    try{
        const { id } = request.params;
        const { saldo_final } = request.body;
        
        const caja = await Caja.findByPk(id); 
        if(!caja){
            return response.status(404).json({ message: "Caja no encontrada" });
        }

        const cajaCerrada = await caja.update({ 
            fecha_cierre: new Date(), 
            saldo_final: parseFloat(saldo_final).toFixed(2), 
            estado: "cerrada" 
        });

        response.status(200).json({ message: "Caja cerrada con exito." });
    }catch(error){
        response.status(500).json({ error: error.message });
    }
}