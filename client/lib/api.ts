import { Photo } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type UploadPhotoPayload = {
  caption?: string;
  image: string;
};


export const fetchPhotos = async (): Promise<Photo[]> => {
  const res = await fetch(`${BASE_URL}/api/photos`);
  if (!res.ok) {
    throw new Error(`Failed to fetch photos (${res.status} ${res.statusText})`);
  }
  return res.json();
};


export const uploadPhoto = async (data: UploadPhotoPayload): Promise<Photo> => {
  const res = await fetch(`${BASE_URL}/api/photos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Failed to upload photo (${res.status} ${res.statusText})`);
  }
  return res.json();
};


export const addComment = async (photoId: number, content: string) => {
  const res = await fetch(`${BASE_URL}/api/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ photo_id: photoId, content }),
  });
  if (!res.ok) {
    throw new Error(`Failed to add comment (${res.status} ${res.statusText})`);
  }
  return res.json();
};