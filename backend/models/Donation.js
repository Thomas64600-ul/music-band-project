import pool from "../config/db.js";

export async function createDonation(
  user_id = null,
  amount,
  message = null,
  stripe_session_id = null,
  stripe_payment_intent = null,
  currency = "eur",
  email = null
) {
  const result = await pool.query(
    `
    INSERT INTO donations
      (user_id, amount, message, stripe_session_id, stripe_payment_intent, currency, email)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [user_id, amount, message, stripe_session_id, stripe_payment_intent, currency, email]
  );
  return result.rows[0];
}


export async function getAllDonations() {
  const result = await pool.query(`
    SELECT d.*, u.firstname, u.lastname, u.email AS user_email
    FROM donations AS d
    LEFT JOIN users AS u ON d.user_id = u.id
    ORDER BY d.created_at DESC
  `);
  return result.rows;
}


export async function getDonationById(id) {
  const result = await pool.query(
    `
    SELECT d.*, u.firstname, u.lastname, u.email AS user_email
    FROM donations AS d
    LEFT JOIN users AS u ON d.user_id = u.id
    WHERE d.id = $1
    `,
    [id]
  );
  return result.rows[0];
}


export async function getDonationsByUserId(user_id) {
  const result = await pool.query(
    `
    SELECT * FROM donations
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [user_id]
  );
  return result.rows;
}


export async function deleteDonation(id) {
  const result = await pool.query(`DELETE FROM donations WHERE id = $1`, [id]);
  return result.rowCount > 0;
}


export async function updateDonationStatus(session_id, status, payment_intent = null) {
  const result = await pool.query(
    `
    UPDATE donations
    SET status = $1,
        stripe_payment_intent = COALESCE($2, stripe_payment_intent),
        updated_at = NOW()
    WHERE stripe_session_id = $3
    `,
    [status, payment_intent, session_id]
  );
  return result.rowCount > 0;
}


export async function getDonationStats() {
  const result = await pool.query(`
    SELECT 
      COUNT(*) AS total_dons,
      SUM(amount) AS total_montant,
      COUNT(CASE WHEN user_id IS NULL THEN 1 END) AS dons_anonymes,
      COUNT(CASE WHEN user_id IS NOT NULL THEN 1 END) AS dons_connectes
    FROM donations;
  `);
  return result.rows[0];
}


export async function updateDonationById(id, data) {
  const fields = [];
  const values = [];
  let index = 1;

  
  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = $${index}`);
    values.push(value);
    index++;
  }

  if (fields.length === 0) return false;

  const query = `
    UPDATE donations
    SET ${fields.join(", ")}, updated_at = NOW()
    WHERE id = $${index}
    RETURNING *;
  `;

  values.push(id);
  const result = await pool.query(query, values);
  return result.rows[0] || null;
}


export {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationsByUserId,
  deleteDonation,
  updateDonationStatus,
  getDonationStats,
  updateDonationById 
};


