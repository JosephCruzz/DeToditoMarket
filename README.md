# DeToditoMarket

Sistema de gestión de inventario y facturas para DeToditoMarket.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm
- Base de datos PostgreSQL (Supabase)

## Configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/JosephCruzz/DeToditoMarket.git
cd DeToditoMarket
```

2. Instalar dependencias:
```bash
npm install
```


3. Ejecutar migraciones de base de datos:
```bash
npx sequelize-cli db:migrate
```

## Scripts Disponibles

- `npm start` - Iniciar el servidor en modo producción
- `npm run dev` - Iniciar el servidor en modo desarrollo con nodemon
- `npm test` - Ejecutar pruebas

## Estructura del Proyecto

```
├── config/          # Configuración de Sequelize y base de datos
├── migrations/      # Migraciones de base de datos
├── models/          # Modelos de Sequelize
├── server.js        # Punto de entrada de la aplicación
├── .env             # Plantilla de variables de entorno
└── package.json     # Dependencias y scripts
```

## Sobre dependencias

 /*
  Dependencias De desarrollo (osea que no se utilizarian en la produccion ya del sistema solo ayudas para el desarrollo)
  correr con npm run dev
  Nodemon: Automaticamente refresca los cambios realizados por un developer
  */
  ´´
  "devDependencies": {
    "nodemon": "^3.1.11"
  },´´
  /*
  dotenv: variables de entorno
  express es express .js para post get http sends
  pg postgres dependencia
  pg-hstore tambien algo de postgres
  sequelize es sequelize orm para base de datos
  y sequelize-cli es para migration sequelize interfaz linea de comandos

  --PORFAVOR SI AGREGA UNA NUEVA EXPLICAR PARA QUE ES
  ASI LLEVAMOS ORDEN SI UNA FALLA
  */

  ´´
  "dependencies": {
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "pg": "^8.16.3",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.37.7",
    "sequelize-cli": "^6.6.3"
  }´´

## Tecnologías Utilizadas

- **Express.js** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos (Supabase)
- **dotenv** - Gestión de variables de entorno

## Autores

- AndreaQuinn
- JosephCruz
- BryanBanegas