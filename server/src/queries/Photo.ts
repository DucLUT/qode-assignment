import { Photo } from '../models/Photo';
import pool from '../libs/db';

export const getAllPhotos = async (): Promise<Photo[]> => {
  const result = await pool.query(
    'SELECT * FROM photos ORDER BY created_at DESC'
  );
  return result.rows;
};

export const createPhoto = async (
  filename: string,
  url: string,
  caption: string
): Promise<Photo> => {
  const result = await pool.query(
    'INSERT INTO photos (filename, url, caption) VALUES ($1, $2, $3) RETURNING *',
    [filename, url, caption]
  );
  return result.rows[0];
};