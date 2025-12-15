const express = require("express");
const app = express();
const models = require("./models");
const sequelize = require("./config/database");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const comprasRoutes = require("./routes/comprasRoutes");
const detalleCompraRoutes = require("./routes/detalleCompraRoutes");
const notificacionesRoutes = require("./routes/notificaciones");
const caiRoutes = require("./routes/caiRoutes.js");
const detalleVentaRoutes = require("./routes/detalleVentaRoutes.js")
const rolesRoutes = require("./routes/roles");
const permisosRoutes = require("./routes/permisos");
const comprobantesRoutes = require("./routes/comprobantes");
const auditoriaRoutes = require("./routes/auditoria");

const facturaRoutes = require("./routes/facturaRoutes");
const detalleDeVentaRoutes = require("./routes/detalleDeVentaRoutes");

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DeToditoMarket API",
      version: "0.0.1",
      description: "Sistema de gestion de inventario y facturas para DeToditoMarket",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*cambio a un codigo mas entendible tambien eliminamos sync ya que no se usa
cuando usamos migrations */

async function authenticateDB() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");
    app.listen(3000, () => {
      console.log("Servidor corriendo en puerto 3000");
    });
  } catch (errr) {
    console.error("se encontro un error: ", errr);
    process.exit(1);
  }
}

authenticateDB();

/*req es request
pide algo del front end

 y el res es response
  (manda eso al front end o quien pidio / 
 osea entro a la pagina principal)
*/

app.use("/compra", comprasRoutes);
app.use("/detalleCompra", detalleCompraRoutes);
app.use("/notifications", notificacionesRoutes);
app.use("/roles", rolesRoutes);
app.use("/cai", caiRoutes);
app.use("/detalleVenta", detalleVentaRoutes);


app.use("/permisos", permisosRoutes);
app.use("/comprobantes", comprobantesRoutes);
app.use("/auditoria", auditoriaRoutes);


app.use("/factura", facturaRoutes);

app.use("/detalleDeVenta", detalleDeVentaRoutes);

app.get("/ping", (req, res) => res.send("pong"));

