import pool from "../config/db.js";


async function createConcert(title, location, date, ticket_url, image_url = null) {
  const result = await pool.query(
    `
    INSERT INTO concerts (title, location, date, ticket_url, image_url, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING id, title, location, date, ticket_url, image_url, created_at
    `,
    [title, location, date, ticket_url, image_url]
  );

  return result.rows[0];
}


async function getAllConcerts(limit = 20, offset = 0) {
  const result = await pool.query(
    `
    SELECT id, title, location, date, ticket_url, image_url, created_at, updated_at
    FROM concerts
    ORDER BY date DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );
  return result.rows;
}


async function getConcertById(id) {
  const result = await pool.query(
    `
    SELECT id, title, location, date, ticket_url, image_url, created_at, updated_at
    FROM concerts
    WHERE id = $1
    `,
    [id]
  );
  return result.rows[0];
}


async function updateConcert(id, title, location, date, ticket_url, image_url = null) {
  const query = image_url
    ? `
      UPDATE concerts
      SET title = $1, location = $2, date = $3, ticket_url = $4, image_url = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *
      `
    : `
      UPDATE concerts
      SET title = $1, location = $2, date = $3, ticket_url = $4, updated_at = NOW()
      WHERE id = $5
      RETURNING *
      `;

  const values = image_url
    ? [title, location, date, ticket_url, image_url, id]
    : [title, location, date, ticket_url, id];

  const result = await pool.query(query, values);
  return result.rows[0] || null;
}


async function deleteConcert(id) {
  const result = await pool.query(`DELETE FROM concerts WHERE id = $1`, [id]);
  return result.rowCount > 0;
}


async function getUpcomingConcerts() {
  const result = await pool.query(
    `
    SELECT id, title, location, date, ticket_url, image_url, created_at
    FROM concerts
    WHERE date >= CURRENT_DATE
    ORDER BY date ASC
    `
  );
  return result.rows;
}


async function getPastConcerts() {
  const result = await pool.query(
    `
    SELECT id, title, location, date, ticket_url, image_url, created_at
    FROM concerts
    WHERE date < CURRENT_DATE
    ORDER BY date DESC
    `
  );
  return result.rows;
}


async function getConcertsByLocation(location) {
  const result = await pool.query(
    `
    SELECT id, title, location, date, ticket_url, image_url, created_at
    FROM concerts
    WHERE location ILIKE $1
    ORDER BY date ASC
    `,
    [`%${location}%`]
  );
  return result.rows;
}


export {
  createConcert,
  getAllConcerts,
  getConcertById,
  updateConcert,
  deleteConcert,
  getUpcomingConcerts,
  getPastConcerts,
  getConcertsByLocation
};


