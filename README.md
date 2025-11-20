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
DETODITOMARKET/
├── 📁 config/
│   ├── config.js
│   └── database.js
├── 📁 controllers/
├── 📁 migrations/
├── 📁 models/
│   ├── index.js
│   └── UserTest.js
├── 📁 node_modules/ (deberia esta en .gitignore)
├── 📁 routes/
├── 📁 seeders/
├── 📄 .env
├── 📄 .gitignore
├── 📄 .sequelizerc
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
└── 📄 server.js (Este es equivalente a app.js)
```

### Descripción de Carpetas y Archivos

- **config/** - Configuración de Sequelize y base de datos
- **controllers/** - Controladores de la aplicación
- **migrations/** - Migraciones de base de datos
- **models/** - Modelos de Sequelize
- **routes/** - Rutas de la API
- **seeders/** - Datos de prueba para la base de datos
- **.env** - Variables de entorno
- **app.js** - Configuración de Express
- **server.js** - Punto de entrada de la aplicación
- **package.json** - Dependencias y scripts del proyecto

## Sobre dependencias

Dependecias son paquetes instalados ya sea por

```bash
npm install nodemon u otros tipos de comandos
```

u otros tipos de comandos, la estos se guardan en node_modules y pesan mucho por lo cualen clonar o hacer un push hace que el proyecto tarde mucho en subir, la razon por la cual ponemos eso en .gitignore

un poco sobre las dependencias ya instaladas las de desarrollo no son obligatorias a tener, pero las otras si, cuando clonemos el proyecto no las tendremos ya que node_modules no se pasaria porque esta ignroado simplemente corremos:

```bash
npm install
```

y todas las dependencias que estan en package.json se actualizarian,

si llega a tener un conflicto puede ser dependencias de dependecianas que estan en package-lock.json puede necesitar actualziarse o no som combatibles una version a la otra, en ese caso informarme para ayudar.

Dependencias De desarrollo (osea que no se utilizarian en la produccion ya del sistema solo ayudas para el desarrollo)
correr con npm run dev
Nodemon: Automaticamente refresca los cambios realizados por un developer

```json
 "devDependencies": {
   "nodemon": "^3.1.11"
 },
```

dotenv: variables de entorno,
express es express .js para post get http sends,
pg postgres dependencia,
pg-hstore tambien algo de postgres,
sequelize es sequelize orm para base de datos,
y sequelize-cli es para migration sequelize interfaz linea de comandos

--PORFAVOR SI AGREGA UNA NUEVA EXPLICAR PARA QUE ES
ASI LLEVAMOS ORDEN SI UNA FALLA

```json
 "dependencies": {
   "dotenv": "^17.2.3",
   "express": "^5.1.0",
   "pg": "^8.16.3",
   "pg-hstore": "^2.3.4",
   "sequelize": "^6.37.7",
   "sequelize-cli": "^6.6.3"
 }
```

## Tecnologías Utilizadas

- **Express.js** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos (Supabase)
- **dotenv** - Gestión de variables de entorno

## Autores

- AndreaQuinn
- JosephCruz
- BryanBanegas
