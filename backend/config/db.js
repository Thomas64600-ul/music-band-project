console.log("🔥 db.js est exécuté !");
console.log("DATABASE_URL =", process.env.DATABASE_URL);

import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;
console.log("🔥 db.js est exécuté !");
console.log("DATABASE_URL =", process.env.DATABASE_URL);

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL manquant dans les variables d'environnement !");
  process.exit(1);
}

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.on("connect", () => {
  console.log("✔ Connecté à PostgreSQL (Neon)");
});

pool.on("error", (err) => {
  console.error("Erreur PostgreSQL :", err.message);
});

export default pool;
