import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "dev";

const dbPort = env === "prod" ? process.env.DB_PORT : "";
const dbNombre = env === "prod" ? process.env.BD_NOMBRE : "";
const dbUser = env === "prod" ? process.env.BD_USER : "";
const dbPass = env === "prod" ? process.env.BD_PASS : "";
const dbHost = env === "prod" ? process.env.BD_HOST : "";

const db = new Sequelize(dbNombre, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: env === "prod" ? "mysql" : "sqlite",
  storage: env === "prod" ? "" : "./agencia.sqlite",
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorAliases: false
});

export default db;
