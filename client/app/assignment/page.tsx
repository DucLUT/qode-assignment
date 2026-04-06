"use client";
import { useEffect, useState } from "react";
import { Typography, Spin, Divider } from "antd";
import { fetchPhotos } from "@/lib/api";
import { Photo } from "@/types";
import UploadForm from "@/components/UploadForm";
import PhotoGrid from "@/components/PhotoGrid";

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos()
      .then(setPhotos)
      .finally(() => setLoading(false));
  }, []);

  const handleNewPhoto = (photo: Photo) => {
    // prepend new photo to the top
    setPhotos((prev) => [{ ...photo, comments: [] }, ...prev]);
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <UploadForm onUpload={handleNewPhoto} />
      </section>

      <Divider className="!my-8" />

      <section>
        {loading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <PhotoGrid photos={photos} />
        )}
      </section>
    </main>
  );
}
