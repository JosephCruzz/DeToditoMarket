const { cai } = require("../models");

exports.addCai = async (req, res) => {
  const {
    codigo_cai, 
    rango_inicial,
    rango_final, 
    fecha_autorizacion,
    fecha_limite_emision,
    estado,
    observaciones,
  } = req.body;

  if (
    !codigo_cai ||
    !rango_inicial ||
    !rango_final ||
    !fecha_autorizacion ||
    !fecha_limite_emision
  ) {
    return res.status(400).json({
      message:
        "Los campos codigo_cai, rango_inicial, rango_final, y campos fechas son obligatorios",
    });
  }

  const fechaAth = new Date(fecha_autorizacion);
  const fechaLimiteEm = new Date(fecha_limite_emision);

  if (isNaN(fechaAth.getTime()) || isNaN(fechaLimiteEm.getTime())) {
    return res.status(400).json({
      message: "Por favor ingresar una fecha válida YYYY-MM-DD, y real",
    });
  }

  if (fechaAth > fechaLimiteEm) {
    return res.status(400).json({
      message:
        "La fecha de autorización no puede ser mayor que la fecha límite",
    });
  }

  try {
    const addC = await cai.create({
      codigo_cai,
      rango_inicial,
      rango_final,
      fecha_autorizacion,
      fecha_limite_emision,
      estado,
      observaciones: observaciones || "Ninguna Observación",
    });
    res.status(201).json(addC);
  } catch (err) {
    if(err.name === "SequelizeUniqueConstraintError"){
      return res.status(409).json({
        message: "El campo codigo_cai es unique no puede repetirse."
      });
    }
    res.status(500).json({
      message: "No se pudo crear Cai",
      Error: err.message
    });
  }

};
exports.editCai = async (req,res) => {
 try{
   const {id} = req.params;
   const {
     codigo_cai,
     rango_inicial,
     rango_final,
     fecha_autorizacion,
     fecha_limite_emision,
     estado,
     observaciones
   } = req.body;

   const pkCai = await cai.findByPk(id);
   if(!pkCai){
     return res.status(404).json({
       message: "No se encontró el Cai con el id proporcionado"
     });
   }

   // Validar fechas si se proporcionan
   if(fecha_autorizacion && fecha_limite_emision){
     const fechaAth = new Date(fecha_autorizacion);
     const fechaLimiteEm = new Date(fecha_limite_emision);

     if (isNaN(fechaAth.getTime()) || isNaN(fechaLimiteEm.getTime())) {
       return res.status(400).json({
         message: "Por favor ingresar una fecha válida YYYY-MM-DD, y real",
       });
     }

     if (fechaAth > fechaLimiteEm) {
       return res.status(400).json({
         message: "La fecha de autorización no puede ser mayor que la fecha límite",
       });
     }
   }

   await pkCai.update({
     ...(codigo_cai && { codigo_cai }),
     ...(rango_inicial && { rango_inicial }),
     ...(rango_final && { rango_final }),
     ...(fecha_autorizacion && { fecha_autorizacion }),
     ...(fecha_limite_emision && { fecha_limite_emision }),
     ...(estado && { estado }),
     ...(observaciones !== undefined && { observaciones })
   });

   return res.status(200).json({
     message: "CAI actualizado exitosamente",
     cai: pkCai
   });

 } catch(e) {
   if(e.name === "SequelizeUniqueConstraintError"){
     return res.status(409).json({
       message: "El campo codigo_cai es unique no puede repetirse."
     });
   }
   return res.status(500).json({
     message: "Error al actualizar el CAI",
     error: e.message
   });
 }
}
