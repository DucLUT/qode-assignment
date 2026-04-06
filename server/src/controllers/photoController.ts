import type { Request, Response } from 'express';
import { getAllPhotos, createPhoto } from '../queries/Photo';
import { getCommentsByPhotoId } from '../queries/Comment';
import cloudinary from '../config/cloundinary';

export const getPhotos = async (req: Request, res: Response) => {
  try {
    const photos = await getAllPhotos();

    // attach comments to each photo
    const photosWithComments = await Promise.all(
      photos.map(async (photo) => {
        const comments = await getCommentsByPhotoId(photo.id);
        return { ...photo, comments };
      })
    );

    res.json(photosWithComments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get photos' });
  }
};

export const uploadPhoto = async (req: Request, res: Response) => {
  try {
    const { caption, image } = req.body;

    // Validate that the image exists and is a base64 string
    if (!image || typeof image !== 'string' || !image.startsWith('data:image')) {
      res.status(400).json({ error: 'No valid base64 image provided' });
      return;
    }

    // Upload the base64 string directly to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: 'qode-assignment',
      resource_type: 'image'
    });

    // Save to your database
    const photo = await createPhoto(
      uploadResult.public_id,
      uploadResult.secure_url,
      caption || ''
    );

    res.status(201).json(photo);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown upload error';
    console.error('Photo upload failed:', err);
    res.status(500).json({ error: 'Failed to upload photo', detail: message });
  }
};