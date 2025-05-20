// db/index.js
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Create book
export async function createBook({ user_id, title, author, genre, description, cover_url, published_year }) {
  const result = await pool.query(
    `INSERT INTO books (user_id, title, author, genre, description, cover_url, published_year)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [user_id, title, author, genre, description, cover_url, published_year]
  );
  return result.rows[0];
}

// List books
export async function listBooks() {
  const result = await pool.query(
    `SELECT books.*, users.username FROM books
     JOIN users ON books.user_id = users.id
     ORDER BY books.created_at DESC`
  );
  return result.rows;
}

// Delete book by ID and user_id for authorization
export async function deleteBook(id, user_id) {
  const result = await pool.query(
    `DELETE FROM books WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, user_id]
  );
  return result.rows[0];
}
