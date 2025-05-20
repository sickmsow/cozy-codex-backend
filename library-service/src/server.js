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
export async function startServer() {
  try {
    await pool.connect();
    console.log('✅ Connected to Neon Postgres DB');
    
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => {
      console.log(`🚀 Library service running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to DB:', err);
    process.exit(1);
  }
}

// If this file is run directly, start the server
if (import.meta.url === process.argv[1] || import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export default app;
