const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/database");
const userRoute = require("./routes/userRoutes");
const productoRoute = require("./routes/productoRoutes");
const cajaRoute = require("./routes/cajaRoutes");
const proveedorRoute = require("./routes/proveedorRoutes");
const auditRoute = require("./routes/auditoriaRoutes");
const caiRoute = require("./routes/caiRoutes");
const compraRoute = require("./routes/comprasRoutes");
const detalleCompraRoute = require("./routes/detalleCompraRoutes");
const comprobanteRoute = require("./routes/comprobanteRoutes");
const facturaRoute = require("./routes/facturaRoutes");
const detalleVentaRoute = require("./routes/detalleVentaRoutes");
const permisoRoute = require("./routes/permisoRoutes");
const rolRoute = require("./routes/rolRoutes");


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/proveedor", proveedorRoute);
app.use("/api/producto", productoRoute);
app.use("/api/audit", auditRoute);
app.use("/api/caja", cajaRoute);
app.use("/api/cai", caiRoute);
app.use("/api/compra", compraRoute);
app.use("/api/detalleCompra", detalleCompraRoute);
app.use("/api/comprobante", comprobanteRoute);
app.use("/api/factura", facturaRoute);
app.use("/api/detalleVenta", detalleVentaRoute);
app.use("/api/permiso", permisoRoute);
app.use("/api/rol", rolRoute);

app.get("/", (req, res) => {
  res.send("La API esta corriendo..");
});


sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos Postgre de Supabase de Detodito Market");
    return sequelize.sync({alter: true});
  })
  .then(() => {
    console.log("Modelos vinculados");
  })
  .catch((err) => console.error("DB error:", err));
app.listen(3001, () => console.log("Listening to port 3001"));

//Sincronizar la Base de Datos