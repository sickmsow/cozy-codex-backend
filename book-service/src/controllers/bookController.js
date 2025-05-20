// controllers/bookController.js
import {
    createBook,
    listBooks,
    deleteBook
  } from '../db/index.js';
  
  /**
   * GET /books
   */
  export const getBooks = async (req, res) => {
    try {
      const books = await listBooks();
      res.json(books);
    } catch (err) {
      console.error('Error listing books:', err);
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  };
  
  /**
   * POST /books
   */
  export const addBook = async (req, res) => {
    const {
      title,
      author,
      genre = null,
      description = null,
      cover_url = null,
      published_year = null
    } = req.body;
  
    // For now, accept user_id from req.body for simplicity
    const user_id = req.user?.id ?? req.body.user_id ?? null;
  
    if (!user_id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }
  
    try {
      const book = await createBook({
        user_id,
        title,
        author,
        genre,
        description,
        cover_url,
        published_year
      });
      res.status(201).json(book);
    } catch (err) {
      console.error('Error creating book:', err);
      res.status(500).json({ error: 'Failed to create book' });
    }
  };
  
  /**
   * DELETE /books/:id
   */
  export const removeBook = async (req, res) => {
    const bookId = req.params.id;
    const user_id = req.user?.id ?? req.body.user_id ?? null;
  
    if (!user_id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
  
    try {
      const deleted = await deleteBook(bookId, user_id);
      if (!deleted) {
        return res.status(404).json({ error: 'Book not found or not yours' });
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
      console.error('Error deleting book:', err);
      res.status(500).json({ error: 'Failed to delete book' });
    }
  };
  