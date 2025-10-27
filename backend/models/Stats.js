import pool from "../config/db.js";

async function getGlobalStats() {
  const result = {};

  try {
    const usersRes = await pool.query(`SELECT COUNT(*) AS count FROM users`);
    result.usersCount = parseInt(usersRes.rows[0].count) || 0;

    const articlesRes = await pool.query(`SELECT COUNT(*) AS count FROM articles`);
    result.articlesCount = parseInt(articlesRes.rows[0].count) || 0;

    const concertsRes = await pool.query(`SELECT COUNT(*) AS count FROM concerts`);
    result.concertsCount = parseInt(concertsRes.rows[0].count) || 0;

    const musicsRes = await pool.query(`SELECT COUNT(*) AS count FROM musics`);
    result.musicsCount = parseInt(musicsRes.rows[0].count) || 0;

    const donationsRes = await pool.query(`SELECT COALESCE(SUM(amount), 0) AS total FROM donations`);
    result.totalDonations = parseFloat(donationsRes.rows[0].total) || 0;

    const rolesRes = await pool.query(`
      SELECT role, COUNT(*) AS count
      FROM users
      GROUP BY role
    `);

    result.rolesDistribution = {
      admin: 0,
      seller: 0,
      buyer: 0,
    };

    rolesRes.rows.forEach((row) => {
      const role = row.role;
      const count = parseInt(row.count);
      if (result.rolesDistribution[role] !== undefined) {
        result.rolesDistribution[role] = count;
      }
    });

    return result;
  } catch (error) {
    console.error("Erreur getGlobalStats :", error);
    throw error;
  }
}

export { getGlobalStats };
