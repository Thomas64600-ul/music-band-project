import pool from "../config/db.js";


export async function createArticle(title, content, author_id, image_url = null) {
  const [result] = await pool.query(
    `
    INSERT INTO articles (title, content, author_id, image_url)
    VALUES (?, ?, ?, ?)
    `,
    [title, content, author_id, image_url]
  );

  
  const [rows] = await pool.query(
    `
    SELECT a.id, a.title, a.content, a.image_url, a.created_at,
           u.firstname AS author_firstname, u.lastname AS author_lastname
    FROM articles AS a
    LEFT JOIN users AS u ON a.author_id = u.id
    WHERE a.id = ?
    `,
    [result.insertId]
  );

  return rows[0];
}


export async function getAllArticles(limit = 10, offset = 0) {
  const [rows] = await pool.query(
    `
    SELECT a.id, a.title, a.content, a.image_url, a.created_at,
           u.firstname AS author_firstname, u.lastname AS author_lastname
    FROM articles AS a
    LEFT JOIN users AS u ON a.author_id = u.id
    ORDER BY a.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [limit, offset]
  );

  return rows;
}


export async function getArticleById(id) {
  const [rows] = await pool.query(
    `
    SELECT a.id, a.title, a.content, a.image_url, a.created_at,
           u.firstname AS author_firstname, u.lastname AS author_lastname
    FROM articles AS a
    LEFT JOIN users AS u ON a.author_id = u.id
    WHERE a.id = ?
    `,
    [id]
  );

  return rows[0];
}


export async function updateArticle(id, title, content, image_url = null) {
  const query = image_url
    ? `UPDATE articles SET title = ?, content = ?, image_url = ? WHERE id = ?`
    : `UPDATE articles SET title = ?, content = ? WHERE id = ?`;

  const values = image_url
    ? [title, content, image_url, id]
    : [title, content, id];

  const [result] = await pool.query(query, values);
  return result.affectedRows > 0;
}


export async function deleteArticle(id) {
  const [result] = await pool.query(
    `DELETE FROM articles WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}

