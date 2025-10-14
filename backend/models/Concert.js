import pool from "../config/db.js";


export async function createConcert(title, location, date, ticket_url, image_url = null) {
  const [result] = await pool.query(
    `
    INSERT INTO concerts (title, location, date, ticket_url, image_url)
    VALUES (?, ?, ?, ?, ?)
    `,
    [title, location, date, ticket_url, image_url]
  );

  const [rows] = await pool.query(
    `
    SELECT id, title, location, date, ticket_url, image_url, created_at
    FROM concerts
    WHERE id = ?
    `,
    [result.insertId]
  );

  return rows[0];
}


export async function getAllConcerts(limit = 20, offset = 0) {
  const [rows] = await pool.query(
    `
    SELECT id, title, location, date, ticket_url, image_url, created_at
    FROM concerts
    ORDER BY date DESC
    LIMIT ? OFFSET ?
    `,
    [limit, offset]
  );
  return rows;
}


export async function getConcertById(id) {
  const [rows] = await pool.query(
    `
    SELECT id, title, location, date, ticket_url, image_url, created_at
    FROM concerts
    WHERE id = ?
    `,
    [id]
  );
  return rows[0];
}


export async function updateConcert(id, title, location, date, ticket_url, image_url = null) {
  const query = image_url
    ? `
        UPDATE concerts
        SET title = ?, location = ?, date = ?, ticket_url = ?, image_url = ?
        WHERE id = ?
      `
    : `
        UPDATE concerts
        SET title = ?, location = ?, date = ?, ticket_url = ?
        WHERE id = ?
      `;

  const values = image_url
    ? [title, location, date, ticket_url, image_url, id]
    : [title, location, date, ticket_url, id];

  const [result] = await pool.query(query, values);
  return result.affectedRows > 0;
}


export async function deleteConcert(id) {
  const [result] = await pool.query(
    `DELETE FROM concerts WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}


export async function getUpcomingConcerts() {
  const [rows] = await pool.query(
    `
    SELECT id, title, location, date, ticket_url, image_url, created_at
    FROM concerts
    WHERE date >= CURDATE()
    ORDER BY date ASC
    `
  );
  return rows;
}


export async function getPastConcerts() {
  const [rows] = await pool.query(
    `
    SELECT id, title, location, date, ticket_url, image_url, created_at
    FROM concerts
    WHERE date < CURDATE()
    ORDER BY date DESC
    `
  );
  return rows;
}


export async function getConcertsByLocation(location) {
  const [rows] = await pool.query(
    `
    SELECT id, title, location, date, ticket_url, image_url, created_at
    FROM concerts
    WHERE location LIKE ?
    ORDER BY date ASC
    `,
    [`%${location}%`]
  );
  return rows;
}


