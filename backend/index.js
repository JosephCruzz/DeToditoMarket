require('dotenv').config(); // Carga variables de entorno
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {Pool} = require('pg');           
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || 'clave123',
  port: process.env.DB_PORT || 5432,
});

// Configuración de Express
const routes = require('./routes/routes');
const app = express();
app.use(cors());
app.use(morgan('dev')); 
app.use(express.json());  

//Aqui van las rutas
app.use('/api', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});