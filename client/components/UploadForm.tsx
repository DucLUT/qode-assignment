"use client";
import { useState } from "react";
import { Upload, Button, Input, message, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadPhoto } from "@/lib/api";
import { Photo } from "@/types";

interface Props {
  onUpload: (photo: Photo) => void;
}

export default function UploadForm({ onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const toBase64DataUrl = (inputFile: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
          return;
        }
        reject(new Error("Failed to read file"));
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(inputFile);
    });

  const handleUpload = async () => {
    if (!file) {
      message.error("Please select a photo first");
      return;
    }

    try {
      setLoading(true);
      const image = await toBase64DataUrl(file);
      const newPhoto = await uploadPhoto({ image, caption });
      onUpload(newPhoto);
      setFile(null);
      setCaption("");
      message.success("Photo uploaded!");
    } catch {
      message.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" className="mb-6">
      <Form.Item label="Caption">
        <Input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Add a caption..."
        />
      </Form.Item>

      <Form.Item label="Photo">
        <Upload
          beforeUpload={(selectedFile) => {
            setFile(selectedFile);
            return false;
          }}
          maxCount={1}
          accept="image/*"
          onRemove={() => {
            setFile(null);
          }}
        >
          <Button icon={<UploadOutlined />}>Select Photo</Button>
        </Upload>
      </Form.Item>

      <Button
        type="primary"
        onClick={() => void handleUpload()}
        loading={loading}
      >
        Upload
      </Button>
    </Form>
  );
}
