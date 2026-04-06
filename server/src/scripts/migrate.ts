import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {

  await pool.query(`
    CREATE TABLE IF NOT EXISTS photos (
      id         SERIAL PRIMARY KEY,
      filename   VARCHAR(255) NOT NULL,
      url        TEXT NOT NULL,
      caption    TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log('photos table ready');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id         SERIAL PRIMARY KEY,
      photo_id   INTEGER REFERENCES photos(id) ON DELETE CASCADE,
      content    TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log('comments table ready');

  await pool.end();
  console.log('Migration complete!');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});