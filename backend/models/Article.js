import pool from "../config/db.js";


export async function createArticle(title, content, author_id, image_url = null) {
  const result = await pool.query(
    `
    INSERT INTO articles (title, content, author_id, image_url)
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `,
    [title, content, author_id, image_url]
  );

  const articleId = result.rows[0].id;

  const article = await pool.query(
    `
    SELECT a.id, a.title, a.content, a.image_url, a.created_at,
           u.firstname AS author_firstname, u.lastname AS author_lastname
    FROM articles AS a
    LEFT JOIN users AS u ON a.author_id = u.id
    WHERE a.id = $1
    `,
    [articleId]
  );

  return article.rows[0];
}


export async function getAllArticles(limit = 10, offset = 0) {
  const result = await pool.query(
    `
    SELECT a.id, a.title, a.content, a.image_url, a.created_at,
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


export async function getArticleById(id) {
  const result = await pool.query(
    `
    SELECT a.id, a.title, a.content, a.image_url, a.created_at,
           u.firstname AS author_firstname, u.lastname AS author_lastname
    FROM articles AS a
    LEFT JOIN users AS u ON a.author_id = u.id
    WHERE a.id = $1
    `,
    [id]
  );

  return result.rows[0];
}


export async function updateArticle(id, title, content, image_url = null) {
  const query = image_url
    ? `
      UPDATE articles
      SET title = $1, content = $2, image_url = $3
      WHERE id = $4
      `
    : `
      UPDATE articles
      SET title = $1, content = $2
      WHERE id = $3
      `;

  const values = image_url
    ? [title, content, image_url, id]
    : [title, content, id];

  const result = await pool.query(query, values);
  return result.rowCount > 0;
}


export async function deleteArticle(id) {
  const result = await pool.query(
    `
    DELETE FROM articles
    WHERE id = $1
    `,
    [id]
  );
  return result.rowCount > 0;
}

