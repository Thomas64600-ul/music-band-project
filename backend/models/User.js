import pool from "../config/db.js";

/**
 * Crée un nouvel utilisateur
 */
export async function createUser(firstname, lastname, email, hashedPassword, role = "user", image_url = null) {
  const [result] = await pool.query(
    `
    INSERT INTO users (firstname, lastname, email, hashed_password, role, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [firstname, lastname, email, hashedPassword, role, image_url]
  );

  return {
    id: result.insertId,
    firstname,
    lastname,
    email,
    role,
    image_url
  };
}

/**
 * Récupère tous les utilisateurs
 */
export async function getAllUsers() {
  const [rows] = await pool.query(
    `
    SELECT id, firstname, lastname, email, role, image_url, created_at
    FROM users
    ORDER BY created_at DESC
    `
  );
  return rows;
}

/**
 * Récupère un utilisateur par ID
 */
export async function getUserById(id) {
  const [rows] = await pool.query(
    `
    SELECT id, firstname, lastname, email, role, image_url, created_at
    FROM users
    WHERE id = ?
    `,
    [id]
  );
  return rows[0];
}

/**
 * Récupère un utilisateur par email (pour login ou vérification)
 */
export async function getUserByEmail(email) {
  const [rows] = await pool.query(
    `
    SELECT id, firstname, lastname, email, hashed_password, role, image_url, created_at,
           reset_token, reset_token_expires_at
    FROM users
    WHERE email = ?
    `,
    [email]
  );
  return rows[0];
}

/**
 * Met à jour un utilisateur (admin)
 */
export async function updateUser(id, firstname, lastname, email, role, image_url = null) {
  const [result] = await pool.query(
    `
    UPDATE users
    SET firstname = ?, lastname = ?, email = ?, role = ?, image_url = ?
    WHERE id = ?
    `,
    [firstname, lastname, email, role, image_url, id]
  );

  return result.affectedRows > 0;
}

/**
 * Supprime un utilisateur
 */
export async function deleteUser(id) {
  const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
  return result.affectedRows > 0;
}

/**
 * Sauvegarde le token de réinitialisation du mot de passe
 */
export async function saveResetToken(userId, token, expiry) {
  const [result] = await pool.query(
    `
    UPDATE users
    SET reset_token = ?, reset_token_expires_at = ?
    WHERE id = ?
    `,
    [token, expiry, userId]
  );
  return result.affectedRows > 0;
}

/**
 * Récupère un utilisateur via un token de réinitialisation valide
 */
export async function getUserByResetToken(token) {
  const [rows] = await pool.query(
    `
    SELECT id, firstname, lastname, email, image_url
    FROM users
    WHERE reset_token = ? AND reset_token_expires_at > NOW()
    `,
    [token]
  );
  return rows[0];
}

/**
 * Met à jour le mot de passe et efface les tokens de reset
 */
export async function updateUserPassword(userId, newHashedPassword) {
  const [result] = await pool.query(
    `
    UPDATE users
    SET hashed_password = ?, reset_token = NULL, reset_token_expires_at = NULL
    WHERE id = ?
    `,
    [newHashedPassword, userId]
  );
  return result.affectedRows > 0;
}
