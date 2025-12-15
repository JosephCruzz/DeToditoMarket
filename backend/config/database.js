const { Sequelize } = require("sequelize");

const useSSL = (process.env.DB_SSL || "true").toString().toLowerCase() === "true";

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  logging: false,
};

if (useSSL) {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(options);

module.exports = sequelize;
