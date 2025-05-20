import { pool } from '../db/index.js';

export async function createBook(data) {
  const { user_id, title, author, genre, description, cover_url, published_year } = data;

  const query = `
    INSERT INTO books (user_id, title, author, genre, description, cover_url, published_year)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [user_id, title, author, genre, description, cover_url, published_year];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getAllBooks() {
  const { rows } = await pool.query('SELECT * FROM books ORDER BY created_at DESC;');
  return rows;
}

export async function deleteBook(bookId, userId) {
  const query = `
    DELETE FROM books
    WHERE id = $1 AND user_id = $2
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [bookId, userId]);
  return rows.length > 0;
}
