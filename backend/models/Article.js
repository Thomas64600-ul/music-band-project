import pool from "../config/db.js";


async function createArticle(title, description, content, image_url, author_id) {
  const result = await pool.query(
    `
    INSERT INTO articles (title, description, content, image_url, author_id, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING id
    `,
    [title, description, content, image_url, author_id]
  );

  const articleId = result.rows[0].id;

  const article = await pool.query(
    `
    SELECT a.id, a.title, a.description, a.content, a.image_url, a.created_at,
           u.firstname AS author_firstname, u.lastname AS author_lastname
    FROM articles AS a
    LEFT JOIN users AS u ON a.author_id = u.id
    WHERE a.id = $1
    `,
    [articleId]
  );

  return article.rows[0];
}


async function getAllArticles(limit = 10, offset = 0) {
  const result = await pool.query(
    `
    SELECT a.id, a.title, a.description, a.content, a.image_url, a.created_at, a.updated_at,
           u.firstname AS author_firstname, u.lastname AS author_lastname
    FROM articles AS a
    LEFT JOIN users AS u ON a.author_id = u.id
    ORDER BY a.created_at DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  return result.rows;
}


async function getArticleById(id) {
  const result = await pool.query(
    `
    SELECT a.id, a.title, a.description, a.content, a.image_url, a.created_at, a.updated_at,
           u.firstname AS author_firstname, u.lastname AS author_lastname
    FROM articles AS a
    LEFT JOIN users AS u ON a.author_id = u.id
    WHERE a.id = $1
    `,
    [id]
  );

  return result.rows[0];
}


async function updateArticle(id, title, description, content, image_url = null) {
  const query = image_url
    ? `
      UPDATE articles
      SET title = $1, description = $2, content = $3, image_url = $4, updated_at = NOW()
      WHERE id = $5
      RETURNING *
      `
    : `
      UPDATE articles
      SET title = $1, description = $2, content = $3, updated_at = NOW()
      WHERE id = $4
      RETURNING *
      `;

  const values = image_url
    ? [title, description, content, image_url, id]
    : [title, description, content, id];

  const result = await pool.query(query, values);
  return result.rows[0];
}


async function deleteArticle(id) {
  const result = await pool.query(`DELETE FROM articles WHERE id = $1`, [id]);
  return result.rowCount > 0;
}


export {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
};


