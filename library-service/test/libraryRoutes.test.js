import request from 'supertest';
import app from '../server.js';

describe('Library Service API', () => {
  const knownBookId = '11111111-1111-1111-1111-111111111111';

  it('should get all books', async () => {
    const res = await request(app).get('/library/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a book by its ID', async () => {
    const res = await request(app).get(`/library/books/${knownBookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', knownBookId);
    expect(res.body).toHaveProperty('title', 'My First Book');
  });
});
