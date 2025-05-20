import express from 'express';
import { getBooks, addBook, removeBook } from '../controllers/bookController.js';

const router = express.Router();

router.get('/books', getBooks);
router.post('/books', addBook);
router.delete('/books/:id', removeBook);

export default router;
