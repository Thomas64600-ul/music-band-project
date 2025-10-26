import pool from "../config/db.js";


async function createMessage(name, email, message) {
  const result = await pool.query(
    `
    INSERT INTO messages (name, email, message, status, created_at, updated_at)
    VALUES ($1, $2, $3, 'unread', NOW(), NOW())
    RETURNING id, name, email, message, status, created_at, updated_at
    `,
    [name, email, message]
  );
  return result.rows[0];
}


async function getAllMessages() {
  const result = await pool.query(
    `
    SELECT id, name, email, message, status, created_at, updated_at
    FROM messages
    ORDER BY created_at DESC
    `
  );
  return result.rows;
}


async function getMessageById(id) {
  const result = await pool.query(
    `
    SELECT id, name, email, message, status, created_at, updated_at
    FROM messages
    WHERE id = $1
    `,
    [id]
  );
  return result.rows[0];
}


async function getMessagesByEmail(email) {
  const result = await pool.query(
    `
    SELECT id, name, email, message, status, created_at, updated_at
    FROM messages
    WHERE email = $1
    ORDER BY created_at DESC
    `,
    [email]
  );
  return result.rows;
}


async function getUnreadMessages() {
  const result = await pool.query(
    `
    SELECT id, name, email, message, status, created_at, updated_at
    FROM messages
    WHERE status = 'unread'
    ORDER BY created_at DESC
    `
  );
  return result.rows;
}


async function markMessageAsRead(id) {
  const result = await pool.query(
    `
    UPDATE messages
    SET status = 'read', updated_at = NOW()
    WHERE id = $1
    RETURNING id, name, email, message, status, created_at, updated_at
    `,
    [id]
  );
  return result.rows[0] || null;
}


async function deleteMessage(id) {
  const result = await pool.query(
    `DELETE FROM messages WHERE id = $1`,
    [id]
  );
  return result.rowCount > 0;
}


export {
  createMessage,
  getAllMessages,
  getMessageById,
  getMessagesByEmail,
  getUnreadMessages,
  markMessageAsRead,
  deleteMessage
};



