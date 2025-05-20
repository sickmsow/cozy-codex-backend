import { pool } from '../db/index.js';

export const getBooks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};
