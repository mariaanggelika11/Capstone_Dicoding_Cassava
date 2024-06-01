import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DATABASE_NAME, "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log, // Tambahkan logging untuk debug
});

export default db;
