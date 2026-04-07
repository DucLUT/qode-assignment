import { Pool } from 'pg';
import dotenv from 'dotenv';

const envFilePath = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: envFilePath });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('Missing required environment variable: DATABASE_URL');
}

const pool = new Pool({
  connectionString: databaseUrl,
});

export default pool;