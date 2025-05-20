import { readFileSync } from 'fs';
import path from 'path';
import { pool } from '../src/db/index.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, '../db/schema.sql');
const schema = readFileSync(schemaPath, 'utf8');

export async function initDB() {
  try {
    await pool.query(schema);
    console.log('✅ Database initialized.');
  } catch (err) {
    console.error('❌ Error initializing DB:', err);
    process.exit(1);
  }
}
