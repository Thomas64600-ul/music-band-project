import pool from "../config/db.js";


async function addComment(user_id, target_type, target_id, content) {
  const result = await pool.query(
    `
    INSERT INTO comments (user_id, target_type, target_id, content, created_at)
    VALUES ($1, $2, $3, $4, NOW())
    RETURNING *
    `,
    [user_id, target_type, target_id, content]
  );
  return result.rows[0];
}


async function getComments(target_type, target_id) {
  const result = await pool.query(
    `
    SELECT 
      c.id, c.content, c.created_at, c.updated_at,
      u.id AS user_id, u.firstname, u.lastname, u.image_url
    FROM comments AS c
    LEFT JOIN users AS u ON c.user_id = u.id
    WHERE c.target_type = $1 AND c.target_id = $2
    ORDER BY c.created_at DESC
    `,
    [target_type, target_id]
  );
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
  const result = await pool.query(
    `
    UPDATE comments
    SET content = $1, updated_at = NOW()
    WHERE id = $2 AND user_id = $3
    RETURNING *
    `,
    [content, id, user_id]
  );
  return result.rows[0] || null;
}


export {
  addComment,
  getComments,
  deleteComment,
  updateComment
};

