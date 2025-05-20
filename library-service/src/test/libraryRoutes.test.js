import express from 'express';
import request from 'supertest';
import { getBooks, getBookById } from '../controllers/libraryController.js';

const app = express();
app.use(express.json());

app.get('/library/books', getBooks);
app.get('/library/books/:id', getBookById);

describe('Library Controller', () => {
  test('GET /library/books should return array (possibly empty)', async () => {
    const res = await request(app).get('/library/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /library/books/:id with known id should return the book', async () => {
    // This matches the fixed book id inserted in your DB for testing
    const knownBookId = '11111111-1111-1111-1111-111111111111';

    const res = await request(app).get(`/library/books/${knownBookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', knownBookId);
    expect(res.body).toHaveProperty('title', 'My First Book');
  });

  test('GET /library/books/:id with unknown id should return 404', async () => {
    const unknownId = '11111111-1111-1111-1111-111111111111'; // valid UUID but non-existent
    const res = await request(app).get(`/library/books/${unknownId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Book not found' });
  });
});
