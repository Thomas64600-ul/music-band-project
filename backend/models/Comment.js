import pool from "../config/db.js";

async function addComment(user_id, target_type, target_id, content) {
  const result = await pool.query(
    `
    INSERT INTO comments (user_id, target_type, target_id, content, created_at)
    VALUES ($1, $2, $3, $4, NOW())
    RETURNING id, user_id, target_type, target_id, content, created_at, updated_at
    `,
    [user_id, target_type, target_id, content]
  );

  const newComment = result.rows[0];

  const userResult = await pool.query(
    `
    SELECT firstname, lastname, image_url
    FROM users
    WHERE id = $1
    `,
    [user_id]
  );

  const userData = userResult.rows[0] || {};

  return {
    ...newComment,
    firstname: userData.firstname || null,
    lastname: userData.lastname || null,
    image_url: userData.image_url || null,
  };
}

async function getComments(target_type = null, target_id = null) {
  let query;
  let values = [];

  if (target_type && target_id) {
   
    query = `
      SELECT 
        c.id, c.content, c.created_at, c.updated_at,
        c.target_type, c.target_id,
        u.id AS user_id, u.firstname, u.lastname, u.image_url
      FROM comments AS c
      LEFT JOIN users AS u ON c.user_id = u.id
      WHERE c.target_type = $1 AND c.target_id = $2
      ORDER BY c.created_at DESC
    `;
    values = [target_type, target_id];
  } else {
   
    query = `
      SELECT 
        c.id, c.content, c.created_at, c.updated_at,
        c.target_type, c.target_id,
        u.id AS user_id, u.firstname, u.lastname, u.image_url,
        COALESCE(a.title, con.title, m.title) AS related_title
      FROM comments AS c
      LEFT JOIN users AS u ON c.user_id = u.id
      LEFT JOIN articles AS a ON (c.target_type = 'article' AND c.target_id = a.id)
      LEFT JOIN concerts AS con ON (c.target_type = 'concert' AND c.target_id = con.id)
      LEFT JOIN musics AS m ON (c.target_type = 'music' AND c.target_id = m.id)
      ORDER BY c.created_at DESC
    `;
  }

  const result = await pool.query(query, values);
  return result.rows;
}

async function deleteComment(id, user_id, role) {
  const query =
    role === "admin"
      ? `DELETE FROM comments WHERE id = $1`
      : `DELETE FROM comments WHERE id = $1 AND user_id = $2`;

  const values = role === "admin" ? [id] : [id, user_id];
  const result = await pool.query(query, values);
  return result.rowCount > 0;
}


async function updateComment(id, user_id, content) {
  const updateResult = await pool.query(
    `
    UPDATE comments
    SET content = $1, updated_at = NOW()
    WHERE id = $2 AND user_id = $3
    RETURNING id, user_id, target_type, target_id, content, created_at, updated_at
    `,
    [content, id, user_id]
  );

  const updatedComment = updateResult.rows[0];
  if (!updatedComment) return null;

  const userResult = await pool.query(
    `
    SELECT firstname, lastname, image_url
    FROM users
    WHERE id = $1
    `,
    [user_id]
  );

  const userData = userResult.rows[0] || {};

  return {
    ...updatedComment,
    firstname: userData.firstname || null,
    lastname: userData.lastname || null,
    image_url: userData.image_url || null,
  };
}

export { addComment, getComments, deleteComment, updateComment };

