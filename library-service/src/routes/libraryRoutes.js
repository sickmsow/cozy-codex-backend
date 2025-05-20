import express from 'express';
import { getBooks, getBookById } from '../controllers/libraryController.js';

const router = express.Router();

router.get('/books', getBooks);
router.get('/books/:id', getBookById);

export default router;
