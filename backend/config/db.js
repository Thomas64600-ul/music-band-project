import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;


const connectionString =
  process.env.RENDER === "true"
    ? process.env.DATABASE_URL_INTERNAL
    : process.env.DATABASE_URL_EXTERNAL;


export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});


pool.on("connect", () => {
  console.log("Connecté à la base PostgreSQL !");
});

pool.on("error", (err) => {
  console.error("Erreur PostgreSQL :", err.message);
});

export default pool;
