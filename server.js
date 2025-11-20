const express = require("express");
const app = express();
const models = require("./models");
const sequelize = require("./config/database");
const comprasRoutes = require("./routes/comprasRoutes")

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*cambio a un codigo mas entendible tambien eliminamos sync ya que no se usa
cuando usamos migrations */

async function authenticateDB(){
try {
  await sequelize.authenticate();
  console.log("Conectado a la base de datos");
  app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");    
  })
} catch (errr) {
  console.error("se encontro un error: ",errr);
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

app.use("/compras",comprasRoutes)



app.get("/ping", (req, res) => res.send("pong"));
