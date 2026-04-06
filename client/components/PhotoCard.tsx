import { Card } from "antd";
import { Photo } from "@/types";
import CommentSection from "@/components/CommentSection";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Props {
  photo: Photo;
}

const getPhotoSrc = (url: string): string => {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  return `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
};

export default function PhotoCard({ photo }: Props) {
  return (
    <Card
      title={photo.caption || "No caption"}
      style={{ marginBottom: 24 }}
      cover={
        <img
          src={getPhotoSrc(photo.url)}
          alt={photo.caption}
          style={{ width: "100%", height: 250, objectFit: "cover" }}
        />
      }
    >
      <CommentSection photoId={photo.id} comments={photo.comments} />
    </Card>
  );
}
