import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  dbPath: string;
}

export const config: Config = {
  port: Number(process.env.PORT) || 3000,
  dbPath: process.env.DB_PATH || "./data/database.db",
};
