import { pool } from '../db/index.js';

export async function getBooks(req, res) {
  try {
    const { genre, author, published_year } = req.query;

    let query = 'SELECT * FROM books';
    const conditions = [];
    const values = [];

    if (genre) {
      values.push(genre);
      conditions.push(`genre = $${values.length}`);
    }
    if (author) {
      values.push(author);
      conditions.push(`author = $${values.length}`);
    }
    if (published_year) {
      values.push(parseInt(published_year));
      conditions.push(`published_year = $${values.length}`);
    }

    if (conditions.length) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
}

export async function getBookById(req, res) {
  try {
    const { id } = req.params;

    const { rows } = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Book not found' });

    // Optionally fetch reviews for the book
    const { rows: reviews } = await pool.query('SELECT * FROM reviews WHERE book_id = $1 ORDER BY created_at DESC', [id]);

    res.json({ ...rows[0], reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
}
