import pool from "../config/db.js";


async function createUser(firstname, lastname, email, hashedPassword, role = "user", image_url = null) {
  const result = await pool.query(
    `
    INSERT INTO users (firstname, lastname, email, hashed_password, role, image_url, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW())
    RETURNING id, firstname, lastname, email, role, image_url, created_at
    `,
    [firstname, lastname, email, hashedPassword, role, image_url]
  );

  return result.rows[0];
}


async function getAllUsers() {
  const result = await pool.query(
    `
    SELECT id, firstname, lastname, email, role, image_url, created_at, updated_at
    FROM users
    ORDER BY created_at DESC
    `
  );
  return result.rows;
}


async function getUserById(id) {
  const result = await pool.query(
    `
    SELECT id, firstname, lastname, email, role, image_url, created_at, updated_at
    FROM users
    WHERE id = $1
    `,
    [id]
  );
  return result.rows[0];
}


async function getUserByEmail(email) {
  const result = await pool.query(
    `
    SELECT id, firstname, lastname, email, hashed_password, role, image_url, created_at,
           reset_token, reset_token_expires_at
    FROM users
    WHERE email = $1
    `,
    [email]
  );
  return result.rows[0];
}


async function updateUser(id, firstname, lastname, email, role, image_url = null) {
  const result = await pool.query(
    `
    UPDATE users
    SET firstname = $1,
        lastname = $2,
        email = $3,
        role = $4,
        image_url = $5,
        updated_at = NOW()
    WHERE id = $6
    RETURNING id, firstname, lastname, email, role, image_url, updated_at
    `,
    [firstname, lastname, email, role, image_url, id]
  );

  return result.rows[0] || null;
}


async function deleteUser(id) {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result.rowCount > 0;
}


async function saveResetToken(userId, token, expiry) {
  const result = await pool.query(
    `
    UPDATE users
    SET reset_token = $1,
        reset_token_expires_at = $2,
        updated_at = NOW()
    WHERE id = $3
    RETURNING id, email, reset_token, reset_token_expires_at
    `,
    [token, expiry, userId]
  );
  return result.rows[0] || null;
}


async function getUserByResetToken(token) {
  const result = await pool.query(
    `
    SELECT id, firstname, lastname, email, image_url
    FROM users
    WHERE reset_token = $1 AND reset_token_expires_at > NOW()
    `,
    [token]
  );
  return result.rows[0];
}


async function updateUserPassword(userId, newHashedPassword) {
  const result = await pool.query(
    `
    UPDATE users
    SET hashed_password = $1,
        reset_token = NULL,
        reset_token_expires_at = NULL,
        updated_at = NOW()
    WHERE id = $2
    RETURNING id, email, updated_at
    `,
    [newHashedPassword, userId]
  );
  return result.rows[0] || null;
}


export {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  saveResetToken,
  getUserByResetToken,
  updateUserPassword
};

