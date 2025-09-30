import pool from "../config/db.js";


export async function createConcert(title, location, date, ticket_url) {
  const [result] = await pool.query(
    `INSERT INTO concerts (title, location, date, ticket_url)
     VALUES (?, ?, ?, ?)`,
    [title, location, date, ticket_url]
  );

  return { id: result.insertId, title, location, date, ticket_url };
}


export async function getAllConcerts() {
  const [rows] = await pool.query(
    `SELECT id, title, location, date, ticket_url, created_at 
     FROM concerts 
     ORDER BY date DESC`
  );
  return rows;
}


export async function getConcertById(id) {
  const [rows] = await pool.query(
    `SELECT id, title, location, date, ticket_url, created_at 
     FROM concerts 
     WHERE id = ?`,
    [id]
  );
  return rows[0];
}


export async function updateConcert(id, title, location, date, ticket_url) {
  const [result] = await pool.query(
    `UPDATE concerts 
     SET title = ?, location = ?, date = ?, ticket_url = ? 
     WHERE id = ?`,
    [title, location, date, ticket_url, id]
  );
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
    `SELECT id, title, location, date, ticket_url, created_at 
     FROM concerts 
     WHERE date >= CURDATE()
     ORDER BY date ASC`
  );
  return rows;
}


export async function getConcertsByLocation(location) {
  const [rows] = await pool.query(
    `SELECT id, title, location, date, ticket_url, created_at 
     FROM concerts 
     WHERE location LIKE ? 
     ORDER BY date ASC`,
    [`%${location}%`]
  );
  return rows;
}

