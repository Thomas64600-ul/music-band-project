import pool from "../config/db.js";


export async function createDonation(user_id, amount, message, stripeSessionId, paymentIntent, currency = "eur") {
  const result = await pool.query(
    `
    INSERT INTO donations 
      (user_id, amount, message, stripe_session_id, stripe_payment_intent, currency, status, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, 'pending', NOW())
    RETURNING id, user_id, amount, message, stripe_session_id, stripe_payment_intent, currency, status, created_at
    `,
    [user_id || null, amount, message, stripeSessionId || null, paymentIntent || null, currency]
  );

  return result.rows[0];
}


export async function getAllDonations() {
  const result = await pool.query(
    `
    SELECT id, user_id, amount, currency, message, status, created_at
    FROM donations
    ORDER BY created_at DESC
    `
  );
  return result.rows;
}


export async function getDonationById(id) {
  const result = await pool.query(
    `
    SELECT id, user_id, amount, currency, message, status, stripe_session_id, stripe_payment_intent, created_at
    FROM donations
    WHERE id = $1
    `,
    [id]
  );
  return result.rows[0];
}


export async function getDonationsByUserId(user_id) {
  const result = await pool.query(
    `
    SELECT id, user_id, amount, currency, message, status, created_at
    FROM donations
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [user_id]
  );
  return result.rows;
}


export async function deleteDonation(id) {
  const result = await pool.query(
    `DELETE FROM donations WHERE id = $1`,
    [id]
  );
  return result.rowCount > 0;
}


export async function getDonationStats() {
  const result = await pool.query(
    `
    SELECT 
      COUNT(*)::int AS count,
      COALESCE(SUM(amount), 0)::float AS total
    FROM donations
    WHERE status = 'succeeded'
    `
  );
  return result.rows[0];
}


export async function updateDonationStatus(stripeSessionId, status, paymentIntent = null) {
  const result = await pool.query(
    `
    UPDATE donations
    SET status = $1,
        stripe_payment_intent = $2,
        updated_at = NOW()
    WHERE stripe_session_id = $3
    `,
    [status, paymentIntent, stripeSessionId]
  );
  return result.rowCount > 0;
}


export async function updateDonationById(id, data) {
  const { amount, message, currency, status } = data;

  const result = await pool.query(
    `
    UPDATE donations
    SET 
      amount = COALESCE($1, amount),
      message = COALESCE($2, message),
      currency = COALESCE($3, currency),
      status = COALESCE($4, status),
      updated_at = NOW()
    WHERE id = $5
    `,
    [amount, message, currency, status, id]
  );

  return result.rowCount > 0;
}
