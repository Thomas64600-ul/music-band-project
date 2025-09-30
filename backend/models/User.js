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
    `SELECT id, firstname, lastname, email, role, created_at FROM users WHERE id = ?`,
    [id]
  );
  return rows[0];
}


export async function getUserByEmail(email) {
  const [rows] = await pool.query(
    `SELECT id, firstname, lastname, email, password, role, created_at 
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
