import pool from "../config/db.js";


export async function createArticle(title, content, author_id, imageUrl = null) {
  const [result] = await pool.query(
    `INSERT INTO articles (title, content, author_id, image_url, created_at) 
     VALUES (?, ?, ?, ?, NOW())`,
    [title, content, author_id, imageUrl]
  );

  return {
    id: result.insertId,
    title,
    content,
    author_id,
    image_url: imageUrl,
    created_at: new Date()
  };
}


export async function getArticleById(id) {
  const [rows] = await pool.query(
    "SELECT * FROM articles WHERE id = ?",
    [id]
  );
  return rows[0];
}


export async function getAllArticles() {
  const [rows] = await pool.query("SELECT * FROM articles ORDER BY created_at DESC");
  return rows;
}


export async function updateArticle(id, title, content, imageUrl = null) {
  let query;
  let values;

  if (imageUrl) {
    query = `
      UPDATE articles
      SET title = ?, content = ?, image_url = ?
      WHERE id = ?
    `;
    values = [title, content, imageUrl, id];
  } else {
    query = `
      UPDATE articles
      SET title = ?, content = ?
      WHERE id = ?
    `;
    values = [title, content, id];
  }

  const [result] = await pool.query(query, values);
  return result.affectedRows > 0;
}


export async function deleteArticle(id) {
  const [result] = await pool.query(
    "DELETE FROM articles WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}
