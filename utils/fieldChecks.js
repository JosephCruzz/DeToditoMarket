function validateFields(arrFields, reqbody, res) {
  for (const field of arrFields) {
    if (!reqbody[field.name] && reqbody[field.name] !== 0) {
      return res.status(400).json({
        status: "Error",
        message: "El campo " + field.name + " es obligatorio",
      });
    } else if (typeof reqbody[field.name] !== field.type) {
      return res.status(400).json({
        status: "Error",
        message:
          "El campo tiene que ser tipo " +
          field.type +
          " y no " +
          typeof reqbody[field.name] +
          ".",
      });
    }
  }
}

module.exports = validateFields;
