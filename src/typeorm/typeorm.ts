import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.TYPEORM_HOST,
  port: 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("initialized");
  })
  .catch((err) => {
    console.error("initiate fail", err);
  });
