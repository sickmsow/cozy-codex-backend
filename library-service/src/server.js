import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db/index.js';
import libraryRoutes from './routes/libraryRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/library', libraryRoutes);

// Function to start the server after DB connects


// Only connect to the database and start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  pool.connect()
    .then(() => console.log('✅ Connected to Neon Postgres DB'))
    .catch((err) => {
      console.error('❌ Failed to connect to DB:', err);
      process.exit(1);
    });

  const PORT = process.env.PORT || 7000;
  const server = app.listen(PORT, () => {
    console.log(`🚀 Books library running on http://localhost:${PORT}`);
  });
}

// Export the Express app
export default app;

