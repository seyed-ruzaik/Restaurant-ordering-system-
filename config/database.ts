import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
dotenv.config();

export const database = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD!,
  {
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    dialect: "mysql",
    models: [__dirname + "/../src/models"],
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
    define:{
      underscored: true
    }
  }
);
