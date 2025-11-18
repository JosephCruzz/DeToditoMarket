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

## Tecnologías Utilizadas

- **Express.js** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos (Supabase)
- **dotenv** - Gestión de variables de entorno

## Autores

- AndreaQuinn
- JosephCruz
- BryanBanegas