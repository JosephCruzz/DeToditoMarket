const express = require("express");
const cors = require("cors");
const app = express();
<<<<<<< HEAD
=======
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
>>>>>>> develop
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

<<<<<<< HEAD

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
=======
var swaggerJsDoc = require('swagger-jsdoc');
var swaggerUI = require('swagger-ui-express');

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
>>>>>>> develop

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

<<<<<<< HEAD
=======
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

>>>>>>> develop
app.get("/", (req, res) => {
  res.send("La API esta corriendo..");
});

<<<<<<< HEAD
=======
const options = {
  definition: {
    openapi:"3.0.3",
    info: {
      title: "Detodito Market Api Documentation",
      version: "1.0",
  } ,
  servers: [
    {
      url: "http://localhost:3001/api",
    }
  ],
  components: {
    schemas: {}
  }
},
  apis: ["./routes/*.js"] 
} 

const specs = swaggerJsDoc(options)
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs))
>>>>>>> develop

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos Postgre de Supabase de Detodito Market");
    return sequelize.sync({alter: true});
  })
  .then(() => {
    console.log("Modelos vinculados");
<<<<<<< HEAD
=======
    console.log("Swagger corriendo en http://localhost:3001/api-docs/");
>>>>>>> develop
  })
  .catch((err) => console.error("DB error:", err));
app.listen(3001, () => console.log("Listening to port 3001"));

//Sincronizar la Base de Datos