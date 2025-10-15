import pool from "../config/db.js";


export async function createMessage(name, email, message) {
  const result = await pool.query(
    `
    INSERT INTO messages (name, email, message, status)
    VALUES ($1, $2, $3, 'unread')
    RETURNING id, name, email, message, status, created_at
    `,
    [name, email, message]
  );

  return result.rows[0];
}


export async function getAllMessages() {
  const result = await pool.query(
    `
    SELECT id, name, email, message, status, created_at
    FROM messages
    ORDER BY created_at DESC
    `
  );
  return result.rows;
}


export async function getMessageById(id) {
  const result = await pool.query(
    `
    SELECT id, name, email, message, status, created_at
    FROM messages
    WHERE id = $1
    `,
    [id]
  );
  return result.rows[0];
}


export async function getMessagesByEmail(email) {
  const result = await pool.query(
    `
    SELECT id, name, email, message, status, created_at
    FROM messages
    WHERE email = $1
    ORDER BY created_at DESC
    `,
    [email]
  );
  return result.rows;
}


export async function getUnreadMessages() {
  const result = await pool.query(
    `
    SELECT id, name, email, message, status, created_at
    FROM messages
    WHERE status = 'unread'
    ORDER BY created_at DESC
    `
  );
  return result.rows;
}


export async function markMessageAsRead(id) {
  const result = await pool.query(
    `
    UPDATE messages
    SET status = 'read'
    WHERE id = $1
    `,
    [id]
  );
  return result.rowCount > 0;
}


export async function deleteMessage(id) {
  const result = await pool.query(
    `
    DELETE FROM messages
    WHERE id = $1
    `,
    [id]
  );
  return result.rowCount > 0;
}


