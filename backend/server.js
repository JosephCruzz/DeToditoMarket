require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

// Debug: log loaded env vars (remove after testing)
console.log("DB_URL:", process.env.DB_URL ? "loaded" : "missing");
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "loaded" : "missing");

const express = require("express");
const app = express();
const cors = require("cors");
const models = require("./models");
const sequelize = require("./config/database");
const comprasRoutes = require("./routes/comprasRoutes");
const detalleCompraRoutes = require("./routes/detalleCompraRoutes");
const notificacionesRoutes = require("./routes/notificaciones");
const caiRoutes = require("./routes/caiRoutes.js");
const detalleVentaRoutes = require("./routes/detalleVentaRoutes.js");
const rolesRoutes = require("./routes/roles");
const permisosRoutes = require("./routes/permisos");
const comprobantesRoutes = require("./routes/comprobantes");
const auditoriaRoutes = require("./routes/auditoria");
const facturaRoutes = require("./routes/facturaRoutes");
const detalleDeVentaRoutes = require("./routes/detalleDeVentaRoutes");

// Dependencias opcionales (no fallar si no están instaladas)
let helmet = null;
let morgan = null;
try {
  helmet = require("helmet");
} catch (_) {}
try {
  morgan = require("morgan");
} catch (_) {}

const PORT = process.env.PORT || 3000;

// Configurar CORS con orígenes permitidos
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

console.log("Allowed CORS origins:", allowedOrigins);

// Middleware
app.use(
  cors({
    origin: (origin, cb) => {
      console.log("Request from origin:", origin);
      if (!origin) return cb(null, true); // permitir herramientas como curl o same-origin
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (helmet) app.use(helmet());
if (morgan) app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

/*cambio a un codigo mas entendible tambien eliminamos sync ya que no se usa
cuando usamos migrations */

async function authenticateDB() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (errr) {
    console.error("se encontro un error: ", errr);
    process.exit(1);
  }
}

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

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Error interno" });
});

// Iniciar servidor una vez autenticada la base de datos
authenticateDB();

