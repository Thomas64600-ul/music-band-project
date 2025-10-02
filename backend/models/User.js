import pool from "../config/db.js";


export async function createUser(firstname, lastname, email, password, role) {
  const [result] = await pool.query(
    `INSERT INTO users (firstname, lastname, email, password, role)
     VALUES (?, ?, ?, ?, ?)`,
    [firstname, lastname, email, password, role || "user"]
  );
  return { id: result.insertId, firstname, lastname, email, role: role || "user" };
}


export async function getAllUsers() {
  const [rows] = await pool.query(
    `SELECT id, firstname, lastname, email, role, created_at FROM users`
  );
  return rows;
}


export async function getUserById(id) {
  const [rows] = await pool.query(
    `SELECT id, firstname, lastname, email, role, created_at 
     FROM users WHERE id = ?`,
    [id]
  );
  return rows[0];
}


export async function getUserByEmail(email) {
  const [rows] = await pool.query(
    `SELECT id, firstname, lastname, email, password, role, created_at,
            reset_token, reset_token_expires
     FROM users WHERE email = ?`,
    [email]
  );
  return rows[0];
}


export async function updateUser(id, firstname, lastname, email, role) {
  const [result] = await pool.query(
    `UPDATE users 
     SET firstname = ?, lastname = ?, email = ?, role = ? 
     WHERE id = ?`,
    [firstname, lastname, email, role, id]
  );
  return result.affectedRows > 0;
}


export async function deleteUser(id) {
  const [result] = await pool.query(
    `DELETE FROM users WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}


export async function saveResetToken(userId, token, expiry) {
  const [result] = await pool.query(
    `UPDATE users 
     SET reset_token = ?, reset_token_expires = ? 
     WHERE id = ?`,
    [token, expiry, userId]
  );
  return result.affectedRows > 0;
}


export async function getUserByResetToken(token) {
  const [rows] = await pool.query(
    `SELECT id, firstname, lastname, email, reset_token, reset_token_expires
     FROM users 
     WHERE reset_token = ? AND reset_token_expires > NOW()`,
    [token]
  );
  return rows[0];
}


export async function updateUserPassword(userId, newPassword) {
  const [result] = await pool.query(
    `UPDATE users 
     SET password = ?, reset_token = NULL, reset_token_expires = NULL 
     WHERE id = ?`,
    [newPassword, userId]
  );
  return result.affectedRows > 0;
}
