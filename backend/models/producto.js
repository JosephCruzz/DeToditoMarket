const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Producto = sequelize.define("Producto", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock_minimo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_vencimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    precio_unitario: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'producto',
    schema: 'public',
    timestamps: false,
    indexes: [
        {
        name: "producto_pkey",
        unique: true,
        fields: [
            { name: "id" },
        ]
        },
    ]
});

module.exports = Producto;