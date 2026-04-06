export interface Comment {
  id: number;
  photo_id: number;
  content: string;
  created_at: string;
}

export interface Photo {
  id: number;
  filename: string;
  url: string;
  caption: string;
  created_at: string;
  comments: Comment[];
}