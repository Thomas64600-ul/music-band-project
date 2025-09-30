import pool from "../config/db.js";


export async function createDonation(user_id, amount, message) {
  const [result] = await pool.query(
    `INSERT INTO donations (user_id, amount, message, created_at)
     VALUES (?, ?, ?, NOW())`,
    [user_id || null, amount, message]
  );
  return { id: result.insertId, user_id: user_id || null, amount, message };
}


export async function getAllDonations() {
  const [rows] = await pool.query(
    `SELECT id, user_id, amount, message, created_at 
     FROM donations 
     ORDER BY created_at DESC`
  );
  return rows;
}


export async function getDonationById(id) {
  const [rows] = await pool.query(
    `SELECT id, user_id, amount, message, created_at 
     FROM donations WHERE id = ?`,
    [id]
  );
  return rows[0];
}


export async function getDonationsByUserId(user_id) {
  const [rows] = await pool.query(
    `SELECT id, user_id, amount, message, created_at 
     FROM donations WHERE user_id = ? 
     ORDER BY created_at DESC`,
    [user_id]
  );
  return rows;
}

export async function deleteDonation(id) {
  const [result] = await pool.query(
    `DELETE FROM donations WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}


export async function getDonationStats() {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS count, SUM(amount) AS total FROM donations`
  );
  return { 
    count: rows[0].count || 0, 
    total: rows[0].total || 0 
  };
}

