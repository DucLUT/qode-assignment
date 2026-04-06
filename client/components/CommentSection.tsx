"use client";
import { useState } from "react";
import { Input, Button, Typography, message, Space, Empty } from "antd";
import { addComment } from "@/lib/api";
import { Comment } from "@/types";

interface Props {
  photoId: number;
  comments: Comment[];
}

export default function CommentSection({ photoId, comments }: Props) {
  const [list, setList] = useState<Comment[]>(comments);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddComment = async () => {
    if (!content.trim()) {
      message.error("Comment cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const newComment = await addComment(photoId, content);
      setList((prev) => [...prev, newComment]);
      setContent("");
    } catch {
      message.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {list.length === 0 ? (
        <Empty
          description="No comments yet"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <div className="space-y-2">
          {list.map((comment) => (
            <div
              key={comment.id}
              className="rounded-md border border-zinc-200 px-3 py-2"
            >
              <Typography.Text>{comment.content}</Typography.Text>
            </div>
          ))}
        </div>
      )}

      <Space.Compact className="mt-2 flex">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          onPressEnter={handleAddComment}
        />
        <Button type="primary" onClick={handleAddComment} loading={loading}>
          Post
        </Button>
      </Space.Compact>
    </div>
  );
}
