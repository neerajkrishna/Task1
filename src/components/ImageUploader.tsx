import { useState } from "react";
import { USER_ID } from "../constants";

interface ImageUploaderProps {
  onUpload?: () => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", USER_ID);
    await fetch("/api/images", {
      method: "POST",
      body: formData,
    });
    setLoading(false);
    if (onUpload) onUpload();
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
      />
    </div>
  );
}
