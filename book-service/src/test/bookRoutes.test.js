import request from 'supertest';
import app from '../server.js';

describe('Book Service API', () => {
  let createdBookId;

  it('should get all books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should add a new book', async () => {
    const newBook = {
      user_id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Test Book',
      author: 'Test Author',
      genre: 'Fiction',
      description: 'Test Description',
      cover_url: 'http://example.com/cover.jpg',
      published_year: 2023,
    };
    const res = await request(app)
      .post('/books')
      .send(newBook);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Book');

    createdBookId = res.body.id;
  });

  it('should delete a book', async () => {
    const res = await request(app)
      .delete(`/books/${createdBookId}`)
      .send({ user_id: '123e4567-e89b-12d3-a456-426614174000' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Book deleted successfully');
  });
});
