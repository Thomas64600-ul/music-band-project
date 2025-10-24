import pool from "../config/db.js";


async function createUser(firstname, lastname, email, hashedPassword, role = "user", image_url = null) {
  const result = await pool.query(
    `
    INSERT INTO users (firstname, lastname, email, hashed_password, role, image_url, created_at, is_verified)
    VALUES ($1, $2, $3, $4, $5, $6, NOW(), FALSE)
    RETURNING id, firstname, lastname, email, role, image_url, created_at, is_verified
    `,
    [firstname, lastname, email, hashedPassword, role, image_url]
  );
  return result.rows[0];
}


async function getAllUsers() {
  const result = await pool.query(`
    SELECT id, firstname, lastname, email, role, image_url, is_verified, created_at, updated_at
    FROM users
    ORDER BY created_at DESC
  `);
  return result.rows;
}


async function getUserById(id) {
  const result = await pool.query(
    `
    SELECT id, firstname, lastname, email, role, image_url, is_verified, created_at, updated_at
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
    SELECT id, firstname, lastname, email, hashed_password, role, image_url,
           is_verified, email_token, email_token_expires_at,
           reset_token, reset_token_expires_at
    FROM users
    WHERE email = $1
    `,
    [email]
  );
  return result.rows[0];
}


async function updateUser(id, firstname, lastname, email, role, image_url = null, is_verified = null) {
  const result = await pool.query(
    `
    UPDATE users
    SET firstname = COALESCE($1, firstname),
        lastname = COALESCE($2, lastname),
        email = COALESCE($3, email),
        role = COALESCE($4, role),
        image_url = COALESCE($5, image_url),
        is_verified = COALESCE($6, is_verified),
        updated_at = NOW()
    WHERE id = $7
    RETURNING id, firstname, lastname, email, role, image_url, is_verified, updated_at
    `,
    [firstname, lastname, email, role, image_url, is_verified, id]
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


async function saveEmailToken(userId, token, expiry) {
  const result = await pool.query(
    `
    UPDATE users
    SET email_token = $1,
        email_token_expires_at = $2,
        updated_at = NOW()
    WHERE id = $3
    RETURNING id, email, email_token, email_token_expires_at
    `,
    [token, expiry, userId]
  );
  return result.rows[0] || null;
}

async function getUserByEmailToken(token) {
  const result = await pool.query(
    `
    SELECT id, firstname, lastname, email, role, image_url
    FROM users
    WHERE email_token = $1 AND email_token_expires_at > NOW()
    `,
    [token]
  );
  return result.rows[0];
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
  updateUserPassword,
  saveEmailToken,      
  getUserByEmailToken, 
};




