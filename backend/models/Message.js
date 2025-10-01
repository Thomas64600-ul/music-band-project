import pool from "../config/db.js";

export async function createMessage(name, email, message) {
  if (!name || !email || !message) {
    throw new Error("Tous les champs (name, email, message) sont obligatoires");
  }

  const [result] = await pool.query(
    `INSERT INTO messages (name, email, message, created_at, status)
     VALUES (?, ?, ?, NOW(), 'unread')`,
    [name, email, message]
  );

  return { id: result.insertId, name, email, message, status: "unread" };
}

export async function getAllMessages() {
  const [rows] = await pool.query(
    `SELECT id, name, email, message, status, created_at 
     FROM messages 
     ORDER BY created_at DESC`
  );
  return rows;
}

export async function getMessageById(id) {
  const [rows] = await pool.query(
    `SELECT id, name, email, message, status, created_at 
     FROM messages 
     WHERE id = ?`,
    [id]
  );
  return rows[0];
}

export async function getMessagesByEmail(email) {
  const [rows] = await pool.query(
    `SELECT id, name, email, message, status, created_at 
     FROM messages 
     WHERE email = ? 
     ORDER BY created_at DESC`,
    [email]
  );
  return rows;
}

export async function markMessageAsRead(id) {
  const [result] = await pool.query(
    `UPDATE messages SET status = 'read' WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}

export async function deleteMessage(id) {
  const [result] = await pool.query(
    `DELETE FROM messages WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}
