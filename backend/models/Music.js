import pool from "../config/db.js";

async function createMusic(title, artist = null, url = null, cover_url = null, author_id = null) {
  const result = await pool.query(
    `
    INSERT INTO musics (title, artist, url, cover_url, author_id, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING id
    `,
    [title, artist, url, cover_url, author_id]
  );

  const musicId = result.rows[0].id;

  const music = await pool.query(
    `
    SELECT m.id, m.title, m.artist, m.url, m.cover_url, m.created_at, m.updated_at,
           u.firstname AS author_firstname, u.lastname AS author_lastname
    FROM musics AS m
    LEFT JOIN users AS u ON m.author_id = u.id
    WHERE m.id = $1
    `,
    [musicId]
  );

  return music.rows[0];
}

async function getAllMusics(limit = 20, offset = 0) {
  const result = await pool.query(
    `
    SELECT m.id, m.title, m.artist, m.url, m.cover_url, m.created_at, m.updated_at,
           u.firstname AS author_firstname, u.lastname AS author_lastname
    FROM musics AS m
    LEFT JOIN users AS u ON m.author_id = u.id
    ORDER BY m.created_at DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  return result.rows;
}

async function getMusicById(id) {
  const result = await pool.query(
    `
    SELECT m.id, m.title, m.artist, m.url, m.cover_url, m.created_at, m.updated_at,
           u.firstname AS author_firstname, u.lastname AS author_lastname
    FROM musics AS m
    LEFT JOIN users AS u ON m.author_id = u.id
    WHERE m.id = $1
    `,
    [id]
  );

  return result.rows[0];
}

async function updateMusic(id, title, artist, url, cover_url = null) {
  const query = cover_url
    ? `
      UPDATE musics
      SET title = COALESCE($1, title),
          artist = COALESCE($2, artist),
          url = COALESCE($3, url),
          cover_url = COALESCE($4, cover_url),
          updated_at = NOW()
      WHERE id = $5
      RETURNING *
      `
    : `
      UPDATE musics
      SET title = COALESCE($1, title),
          artist = COALESCE($2, artist),
          url = COALESCE($3, url),
          updated_at = NOW()
      WHERE id = $4
      RETURNING *
      `;

  const values = cover_url
    ? [title, artist, url, cover_url, id]
    : [title, artist, url, id];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async function deleteMusic(id) {
  const result = await pool.query(`DELETE FROM musics WHERE id = $1`, [id]);
  return result.rowCount > 0;
}

export {
  createMusic,
  getAllMusics,
  getMusicById,
  updateMusic,
  deleteMusic,
};
