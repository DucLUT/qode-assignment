import pool from '../libs/db';
import { Comment } from '../models/Comment';

export const getCommentsByPhotoId = async (photoId: number): Promise<Comment[]> => {
  const result = await pool.query(
    'SELECT * FROM comments WHERE photo_id = $1 ORDER BY created_at ASC',
    [photoId]
  );
  return result.rows;
};

export const createComment = async (
  photoId: number,
  content: string
): Promise<Comment> => {
  const result = await pool.query(
    'INSERT INTO comments (photo_id, content) VALUES ($1, $2) RETURNING *',
    [photoId, content]
  );
  return result.rows[0];
};