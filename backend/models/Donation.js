import pool from "../config/db.js";


export async function createDonation(user_id, amount, message, stripeSessionId, paymentIntent, currency = "eur") {
  const [result] = await pool.query(
    `INSERT INTO donations (user_id, amount, message, stripe_session_id, stripe_payment_intent, currency, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())`,
    [user_id || null, amount, message, stripeSessionId || null, paymentIntent || null, currency]
  );
  return {
    id: result.insertId,
    user_id: user_id || null,
    amount,
    message,
    stripe_session_id: stripeSessionId,
    stripe_payment_intent: paymentIntent,
    status: "pending",
  };
}


export async function getAllDonations() {
  const [rows] = await pool.query(
    `SELECT id, user_id, amount, currency, message, status, created_at 
     FROM donations 
     ORDER BY created_at DESC`
  );
  return rows;
}


export async function getDonationById(id) {
  const [rows] = await pool.query(
    `SELECT id, user_id, amount, currency, message, status, stripe_session_id, stripe_payment_intent, created_at 
     FROM donations WHERE id = ?`,
    [id]
  );
  return rows[0];
}


export async function getDonationsByUserId(user_id) {
  const [rows] = await pool.query(
    `SELECT id, user_id, amount, currency, message, status, created_at 
     FROM donations WHERE user_id = ? 
     ORDER BY created_at DESC`,
    [user_id]
  );
  return rows;
}


export async function deleteDonation(id) {
  const [result] = await pool.query(`DELETE FROM donations WHERE id = ?`, [id]);
  return result.affectedRows > 0;
}


export async function getDonationStats() {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS count, SUM(amount) AS total FROM donations WHERE status = 'succeeded'`
  );
  return { count: rows[0].count || 0, total: rows[0].total || 0 };
}


export async function updateDonationStatus(stripeSessionId, status, paymentIntent = null) {
  const [result] = await pool.query(
    `UPDATE donations 
     SET status = ?, stripe_payment_intent = ?, updated_at = NOW() 
     WHERE stripe_session_id = ?`,
    [status, paymentIntent, stripeSessionId]
  );
  return result.affectedRows > 0;
}


export async function updateDonationById(id, data) {
  const { amount, message, currency, status } = data;

  const [result] = await pool.query(
    `UPDATE donations 
     SET 
       amount = COALESCE(?, amount),
       message = COALESCE(?, message),
       currency = COALESCE(?, currency),
       status = COALESCE(?, status),
       updated_at = NOW()
     WHERE id = ?`,
    [amount, message, currency, status, id]
  );

  return result.affectedRows > 0;
}