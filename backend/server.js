const express = require("express");
const app = express();
const User = require("./models/UserTest");
const sequelize = require("./config/database");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/*req es request
pide algo del front end

 y el res es response
  (manda eso al front end o quien pidio / 
 osea entro a la pagina principal)
*/

app.get("/", (req, res) => {
  res.send("La API esta corriendo..");
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Conectado a la base de datos Postgre de Supabase de Detodito Market"
    );
    return sequelize.sync();
  })

  .then(() => {
    console.log("Modelos vinculados");
  })
  .catch((err) => console.error("DB error:", err));
app.listen(3001, () => console.log("Listening to port 3001"));

//Sincronizar la Base de Datos