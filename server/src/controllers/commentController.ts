import { Request, Response } from 'express';
import { createComment } from '../queries/Comment';

export const addComment = async (req: Request, res: Response) => {
  try {
    const { photo_id, content } = req.body;

    if (!photo_id || !content) {
      res.status(400).json({ error: 'photo_id and content are required' });
      return;
    }

    const comment = await createComment(Number(photo_id), content);
    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};