import pool from "../config/db.js";


export async function createArticle(title, content, author_id) {
  const [result] = await pool.query(
    "INSERT INTO articles (title, content, author_id, created_at) VALUES (?, ?, ?, NOW())",
    [title, content, author_id]
  );

  return {
    id: result.insertId,
    title,
    content,
    author_id,
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
  const [rows] = await pool.query("SELECT * FROM articles");
  return rows;
}


export async function updateArticle(id, title, content) {
  const [result] = await pool.query(
    "UPDATE articles SET title = ?, content = ? WHERE id = ?",
    [title, content, id]
  );
  return result.affectedRows > 0;
}


export async function deleteArticle(id) {
  const [result] = await pool.query(
    "DELETE FROM articles WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

